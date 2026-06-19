import { Pressable, StyleSheet, Text, View } from 'react-native';
import CounterInput from './CounterInput';

type Props = {
    reps: string,
    weight: string,
    handleInputChange: (id: string, field: string, value: string) => void,
    handleDeleteSet: (id: string) => void,
    id: string
}

export default function SetSection({id, reps, weight, handleInputChange, handleDeleteSet} : Props) {
    const handleDelete = () => (
        handleDeleteSet(id)
    )

    return <>
        <View style={styles.setContainer}>
            <CounterInput id={id} label="Reps" val={reps} handleInputChange={handleInputChange}/>
            <CounterInput id={id} label='Weight' val={weight} handleInputChange={handleInputChange}/>
            <Pressable style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>X</Text>
            </Pressable>
        </View></>
}

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 20,
        justifyContent:"center",
        alignItems: 'center',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: "#c71a1a",
        height: 32,
        width: 32,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
    }

});
