import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
    label: string,
    val: string,
    handleInputChange: (id: string, field: string, value: string) => void,
    id: string,
}

export default function CounterInput({ id, label, val, handleInputChange }: Props) {
    const [value, setValue] = useState(parseInt(val, 10));

    useEffect(() => {
        handleInputChange(id, label, value + "")
    }, [value])

    const handleChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setValue(parseInt(numericValue, 10));

        if (numericValue == "") {
            setValue(0);
        }
    }

    return <>
        <View style={styles.container}>
            <Text>{label}: </Text>
            <TextInput style={styles.input} placeholder="0" value={"" + value} onChangeText={handleChange} keyboardType='numeric' />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        textAlign: 'center',
    }
});