import { bodySection, lowerBodyExercises, upperBodyExercises } from "@/src/constants/exercises";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import DropdownModal from "./DropdownModal";


export default function ExerciseSection() {
    // Selected section and exercise that shows once Exercise modal shows up.
    const [selectedSection, setSelectedSection] = useState<string>(bodySection[0]);
    const [exerciseList, setExerciseList] = useState<Record<string, readonly string[]>>(upperBodyExercises);
    const [selectedExercise, setSelectedExercise] = useState<string>(upperBodyExercises.chest[0]);

    // Every time selectedSection changes, run this code
    // Check which section the user selected, and retrieve the right list of exercises.
    useEffect(()=>{
        switch(selectedSection){
            case 'Upper Body':
                setExerciseList(upperBodyExercises);
                setSelectedExercise(upperBodyExercises.chest[0]);
                break;
                
            case 'Lower Body':
                setExerciseList(lowerBodyExercises);
                setSelectedExercise(lowerBodyExercises.quads[0]);
                break;
        }
    }, [selectedSection]);

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <DropdownModal callBack={setSelectedSection} data={selectedSection} type="section"/>
                <DropdownModal callBack={setSelectedExercise} data={selectedExercise} type="exercise" list={exerciseList}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    sectionHeader: {
        flex: 1,
        flexDirection: "row",
        gap: 20,
        padding:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});