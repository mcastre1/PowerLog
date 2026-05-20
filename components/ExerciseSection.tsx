import { bodySection } from "@/src/constants/exercises";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import DropdownModal from "./DropdownModal";


export default function ExerciseSection() {
    const [selectedSection, setSelectedSection] = useState(bodySection[0]);

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <DropdownModal/>
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