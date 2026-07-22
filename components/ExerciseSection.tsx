import { bodySection, lowerBodyExercises, upperBodyExercises } from "@/src/constants/exercises";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import uuid from "react-native-uuid";
import DropdownModal from "./DropdownModal";
import SetSection from "./SetSection";

type Props = {
    id: string;
    updateSets: (id: string, sets: { id: string; Reps: string; Weight: string }[]) => void;
    updateExercise: (id: string, exerciseName: string, section: string) => void;
    deleteExercise: (id: string) => void;
    pSets?: { id: string; Reps: string; Weight: string }[]
    name?: string;
    section?: string;
}

export default function ExerciseSection({ id, updateSets, updateExercise, deleteExercise, pSets, name, section}: Props) {
    // Selected section and exercise that shows once Exercise modal shows up.
    const [selectedSection, setSelectedSection] = useState<string>(bodySection[0] as string);
    const [exerciseList, setExerciseList] = useState<Record<string, readonly string[]>>(upperBodyExercises);
    const [selectedExercise, setSelectedExercise] = useState<string>(upperBodyExercises.chest[0]);

    // Sets in this exercise, we have to keep a copy here to be able to show and hide them from this exercise section.
    const [sets, setSets] = useState<{ id: string, Reps: string; Weight: string,}[]>([]);

    const handleAddSet = () => {
        const id = uuid.v4(); // Create a unique id

        setSets(prev => [
            ...prev,
            { id: id, Reps: "0", Weight: "0" }
        ]);
    }

    useEffect(() => {
        setSets(pSets || []); // Update the sets state with the new pSets value, if pSets is undefined use an empty array instead.
        console.log(name);
    }, [id]);                   

    

    // Whenever the sets state changes I need to update the sets for 
    // the working exercise with the new copy of sets.
    useEffect(() => {
        updateSets(id, sets);
    }, [sets]);


    const handleInputChange = (id: string, field: string, value: string) => {
        console.log(id, field, value)

        setSets(prev =>
            prev.map(set =>
                set.id === id
                    ? { ...set, [field]: value }
                    : set
            )
        )
    }

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

    // Whenever the selected exercise changes update in workout section dict.
    useEffect(() => {
        updateExercise(id, selectedExercise, selectedSection);
    }, [selectedExercise]);

    // Function to send signal to edit workout page to delete given exercise id.
    const handleDeleteExercise = () => {
        deleteExercise(id);
    }

    // UI
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionDropdowns}>
                    <DropdownModal callBack={setSelectedSection} data={selectedSection} type="section" />
                    <DropdownModal callBack={setSelectedExercise} data={selectedExercise} type="exercise" list={exerciseList}/>
                </View>
                <View style={styles.sectionButtons}>
                    <Pressable style={styles.button} onPress={handleDeleteExercise}>
                        <Text style={styles.buttonText}>Delete Exercise</Text>
                    </Pressable>
                    <Pressable  style={styles.button} onPress={handleAddSet}>
                        <Text style={styles.buttonText}>New Set</Text>
                    </Pressable>
                </View>

            </View>
            <View style={styles.setsContainer}>
                {   // Here we map the set entries to the actual setSections, id is the index of the dictionary but we actually care about the data.id, reps, and weight.
                    Object.entries(sets).map(([id, data]) => (
                        <SetSection key={data.id} id={data.id} reps={data.Reps} weight={data.Weight} handleInputChange={handleInputChange} handleDeleteSet={handleDeleteSet} />
                    ))
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    sectionHeader: {
        flexDirection: "column",
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
    sectionDropdowns: {
        flexDirection: "row",
        gap: 10
    },
    sectionButtons: {
        paddingTop: 10,
        flexDirection: "row",
        gap: 10
    },
    setsContainer: {
        flex: 1
    },
    button: {
        backgroundColor: "#726b6b",
        borderRadius: 4,
        flex: 1,
        alignItems: "center"
    },
    buttonText: {
        padding: 4,
        color: "#FFF"
    }
});