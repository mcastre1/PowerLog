import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import DropdownModal from "./DropdownModal";

const bodySection = [
    { name: "Upper Body" },
    { name: "Lower Body" },
]


export default function ExerciseSection() {
    const [selectedSection, setSelectedSection] = useState(bodySection[0]);

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Picker
                    selectedValue={selectedSection}
                    onValueChange={(value) => setSelectedSection(value)}
                >
                    <Picker.Item label="Upper Body" value="upper" />
                    <Picker.Item label="Lower Body" value="lower" />
                    <Picker.Item label="Abs" value="abs" />
                </Picker>
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