import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

// Empty exercise dictionary
let emptyExercise = {
    date: "",
    name: "",
    sets: [
        {
            reps: "",
            weight: "",
        },
    ]
};

type Exercise = {
    date: string;
    name: string;
    sets: {
        reps: string;
        weight: string;
    }[];
};

export default function EditWorkout() {
    // This will have a list of all exercises that were created this date.
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // This will get us the selected date string.
    const { date } = useLocalSearchParams();


    const handleButtonPress = () => {
        setExercises([...exercises, emptyExercise]);
    }

    useEffect(() => {
        console.log(exercises);
    }, [exercises])

    const handleSave = () => {
        console.log("pressed save.")
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
                    exercises.map((item, index) => (
                        <ExerciseSection key={index} />
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