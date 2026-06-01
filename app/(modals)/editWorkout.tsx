import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import uuid from "react-native-uuid";

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
        addExercise();
    }

    useEffect(() => {
        console.log(exercises);
    }, [exercises])

    const handleSave = () => {
        console.log("pressed save.")
    }

    const addExercise = () => {
        const id = uuid.v4();

        setExercises(prev => ({
            ...prev,
            [id]: {}
        }));
    };

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
                        <ExerciseSection key={id} id={id}/>
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