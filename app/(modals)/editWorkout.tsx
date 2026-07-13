import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
import { getDB } from '@/database/db';
import { enqueue } from '@/database/queue';
import { getWorkoutByDate } from '@/database/workout';
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import uuid from "react-native-uuid";

type Exercise = {
    id: string;
    date: string;
    name: string;
    sets: {
        id: string;
        Reps: string;
        Weight: string;
    }[];
};

type Props = {
    date: string
}

export default function EditWorkout() {
    // This will have a list of all exercises that were created this date.
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // This will get us the selected date string.
    const { date } = useLocalSearchParams<{ date: string }>();


    const handleButtonPress = () => {
        addExercise();
    }


    // Once this page is visible to the user, retrieve all workouts for selected date.
    useFocusEffect(() => {
        ///retrieveWorkouts();
        getWorkoutByDate(date).then((results) => {
            if (results.length > 0) {
                const workoutData = JSON.parse(results[0].data);
                setExercises(workoutData);
            }
        });
    });


    // Handle saving the workout to the sql data base.
    const handleSave = () => {
        if (exercises.length > 0) {
            console.log("There are exercises");
            saveWorkout();

        } else {
            console.log("There are no exercises");
        }
    }

    async function saveWorkout() {
        return await enqueue(async () => {
        // Workout id.
        const id = uuid.v4();
        const dateNow = new Date();
        const dateString = dateNow.toLocaleString();
        console.log("Saving: ", [id, date, JSON.stringify(exercises), dateString, dateString]);
        const db = await getDB();
        console.log("db: ", db);
        const results = await db.runAsync(`INSERT INTO workouts(id, date, data, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
        data = excluded.data,
            updated_at = excluded.updated_at;`,
            [id, date, JSON.stringify(exercises), dateString, dateString]);
        });
    }

    // Adds an empty exercise with a unique id to the exercises state.
    const addExercise = () => {
        const id = uuid.v4();

        const emtpyExercise: Exercise = {
            id: id,
            date: date,
            name: "",
            sets: [],
        }

        setExercises(prev => [...prev, emtpyExercise]);
    };

    // Updates all the sets inside the given id for the exercise.
    const updateSets = (id: string, sets: { id: string; Reps: string; Weight: string }[]) => {
        setExercises(prev =>
            prev.map(exercise =>
                exercise.id === id
                    ? { ...exercise, sets } // update sets
                    : exercise
            )
        );
    };

    // Update the given exercise id name
    const updateExercise = (id: string, exerciseName: string) => {
        setExercises(prev =>
            prev.map(exercise =>
                exercise.id === id
                    ? { ...exercise, ["name"]: exerciseName }
                    : exercise
            )
        )
    }

    // Delete the given exercise id object
    const deleteExercise = (id: string) => {
        setExercises(prev => prev.filter(exercise => exercise.id !== id));
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Workout for " + date,
                    headerRight: () => (
                        <Pressable onPress={handleSave} style={{ marginRight: 16 }}>
                            <Text style={{ fontSize: 16, color: "#4CAF50", fontWeight: "600" }}>
                                Save
                            </Text>
                        </Pressable>
                    ),
                }}
            />
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={150}
            >
                <ScrollView style={styles.container}>
                    {
                        Object.entries(exercises).map(([id, data]) => (
                            <ExerciseSection key={data.id} id={data.id} updateSets={updateSets} updateExercise={updateExercise} deleteExercise={deleteExercise} pSets={data.sets} />
                        ))
                    }
                    <AddExerciseSectionButton callBack={handleButtonPress} />
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: "10px",
    }
});