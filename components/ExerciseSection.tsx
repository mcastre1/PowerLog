import { bodySection } from "@/src/constants/exercises";
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import DropdownModal from "./DropdownModal";


export default function ExerciseSection() {
    const [selectedSection, setSelectedSection] = useState(bodySection[0]);

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <DropdownModal/>
            </View>
            <View style={styles.rightColumn}>
                <Text>test2</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 2,
    }
});