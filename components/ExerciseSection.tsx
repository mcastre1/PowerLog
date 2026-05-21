import { bodySection, upperBodyExercises } from "@/src/constants/exercises";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import DropdownModal from "./DropdownModal";


export default function ExerciseSection() {
    // Selected section and exercise that shows once Exercise modal shows up.
    const [selectedSection, setSelectedSection] = useState<string>(bodySection[0]);
    const [selectedExercise, setSelectedExercise] = useState<string>(upperBodyExercises.chest[0]);

    const handleSectionSelection = ((value: string) => {
        if (value === "Lower Body"){
            setSelectedSection(bodySection[1]);

        } else if (value === "Upper Body"){
            setSelectedSection(bodySection[0]);
        }
    });

    useEffect(()=> {
        console.log("Uptaded section: ", selectedSection);
    }, [selectedSection]);



    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <DropdownModal callBack={handleSectionSelection} data={selectedSection}/>
                <DropdownModal callBack={handleSectionSelection} data={selectedExercise}/>
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