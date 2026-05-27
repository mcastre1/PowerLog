import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CounterInput() {
    return <>
        <View style={styles.container}>
            <Pressable>
                <Text>-</Text>
            </Pressable>
            <TextInput placeholder="0" value="0"/>
            <Pressable>
                <Text>+</Text>
            </Pressable>
        </View>
        </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});