import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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

    useEffect(()=>{
        console.log(exercises);
    },[exercises])

    return (
        <ScrollView style={styles.container}>
            <>
                {
                    exercises.map((item, index) => (
                        <ExerciseSection key={index} />
                    ))
                }
                <AddExerciseSectionButton callBack={handleButtonPress} />
            </>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: "10px",
    }
});