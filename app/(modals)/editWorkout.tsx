import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import ExerciseSection from '@/components/ExerciseSection';
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
    const [exercises, setExercises] = useState<Exercise[]>([]);



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