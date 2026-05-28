import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
    label : string,
}

export default function CounterInput({label} : Props) {
    const [value, setValue] = useState(0);
    const handleChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setValue(parseInt(numericValue, 10));

        if(numericValue == ""){
            setValue(0);
        }
    }

    const addOne = () => {
        setValue(value + 1);
    }

    const minusOne = () => {
        setValue(value - 1);
    }

    return <>
        <View style={styles.container}>
                <Text>{label}: </Text>
            <TextInput style={styles.input} placeholder="0" value={"" + value} onChangeText={handleChange} keyboardType='numeric'/>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 100,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
    }
});