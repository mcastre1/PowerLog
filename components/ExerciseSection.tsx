import { bodySection, lowerBodyExercises, upperBodyExercises } from "@/src/constants/exercises";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import uuid from "react-native-uuid";
import DropdownModal from "./DropdownModal";
import SetSection from "./SetSection";

type Props = {
    id: string;
    adddSet: (id: string) => void;
}

export default function ExerciseSection({ id, adddSet }: Props) {
    // Selected section and exercise that shows once Exercise modal shows up.
    const [selectedSection, setSelectedSection] = useState<string>(bodySection[0]);
    const [exerciseList, setExerciseList] = useState<Record<string, readonly string[]>>(upperBodyExercises);
    const [selectedExercise, setSelectedExercise] = useState<string>(upperBodyExercises.chest[0]);

    // Sets in this exercise
    const [sets, setSets] = useState<{ id: string, reps: string; weight: string }[]>([]);

    const handleAddSet = () => {
        const id = uuid.v4(); // Create a unique id

        setSets(prev => [
            ...prev,
            { id: id, reps: "0", weight: "0" }
        ]);
    }

    useEffect(() => {
        console.log(sets);
    }, [sets]);


    const handleInputChange = (id: string, field: string, value: string) => (
        console.log(id, field, value)
    )

    // Handles delete set actions
    const handleDeleteSet = (id: string) => {
        setSets(prev => prev.filter(set => set.id !== id)); // Filter out the set that has the same id.
    }

    // Every time selectedSection changes, run this code
    // Check which section the user selected, and retrieve the right list of exercises.
    useEffect(() => {
        switch (selectedSection) {
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

    // UI
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <DropdownModal callBack={setSelectedSection} data={selectedSection} type="section" />
                <DropdownModal callBack={setSelectedExercise} data={selectedExercise} type="exercise" list={exerciseList} />
                <Pressable style={styles.button} onPress={handleAddSet}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
            <View style={styles.setsContainer}>
                {   // Here we map the set entries to the actual setSections, id is the index of the dictionary but we actually care about the data.id, reps, and weight.
                    Object.entries(sets).map(([id, data]) => (
                        <SetSection key={data.id} id={data.id} reps={data.reps} weight={data.weight} handleInputChange={handleInputChange} handleDeleteSet={handleDeleteSet} />
                    ))
                }
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
        flexDirection: "row",
        gap: 4,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#B8B7B7",
        borderRadius: 8,

        backgroundColor: "#fff", // important so shadow looks correct

        // iOS bottom-only shadow
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },

        // Android bottom-only shadow
        elevation: 3,
        flex: 1,
    },
    setsContainer: {
        flex: 1
    },
    button: {
        backgroundColor: "#4CAF50",
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    buttonText: {
        color: "#FFF"
    }
});