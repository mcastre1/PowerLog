import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
import { getDB } from '@/database/db';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
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

type Props= {
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

    // Whenever exercises change do something, in this case just print it out.
    useEffect(() => {
        console.log(JSON.stringify(exercises, null, 2));

    }, [exercises])

    // Once this page is visible to the user, retrieve all workouts for selected date.
    useEffect(() =>{
        retrieveWorkouts();
    });

    // Retrieve all workouts for this 'date'
    async function retrieveWorkouts(){
        const db = await getDB();
        const results = await db.getFirstAsync('SELECT * FROM workouts WHERE date = ?', [date]);
        console.log(results);
        console.log(date);
    }

    // Handle saving the workout to the sql data base.
    const handleSave = () => {
        if(exercises.length > 0){
            console.log("There are exercises");

        }else{
            console.log("There are no exercises");
        }
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
        console.log("seting sets for exercise id: ", id)
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
                ? {...exercise, ["name"]: exerciseName}
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
                    title: "Edit Workout",
                    headerRight: () => (
                        <Pressable onPress={handleSave} style={{ marginRight: 16 }}>
                            <Text style={{ fontSize: 16, color: "#4CAF50", fontWeight: "600" }}>
                                Save
                            </Text>
                        </Pressable>
                    ),
                }}
            />
            <ScrollView style={styles.container}>
                {
                    Object.entries(exercises).map(([id, data]) => (
                        <ExerciseSection key={data.id} id={data.id} updateSets={updateSets} updateExercise={updateExercise} deleteExercise={deleteExercise}/>
                    ))
                }
                <AddExerciseSectionButton callBack={handleButtonPress} />
            </ScrollView>
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