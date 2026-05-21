import { BodySection, bodySection } from "@/src/constants/exercises";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import DropdownModal from "./DropdownModal";


export default function ExerciseSection() {
    const [selectedSection, setSelectedSection] = useState<BodySection>(bodySection[0]);
    
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
                <DropdownModal callBack={handleSectionSelection}/>
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