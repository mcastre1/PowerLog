import AddExerciseSectionButton from '@/components/AddExerciseSectionButton';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';


export default function EditWorkout() {
    const [exercises, setExercises] = useState<any[]>([]);

    return (
        <ScrollView style={styles.container}>
            <AddExerciseSectionButton/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        gap: "10px",
    }
});