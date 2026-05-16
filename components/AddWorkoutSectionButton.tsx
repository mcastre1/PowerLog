import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function AddWorkoutSectionButton() {
    return (
        <>
            <View style={styles.container}>
                <Pressable style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.5 : 1 }
                ]} onPress={handlePress}>
                    <AntDesign name="plus" size={28} color="white" />
                </Pressable>
            </View>
        </>
    )
}

function handlePress() {
    console.log("button");
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#DAD8D8",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderStyle: "dashed",
        borderColor: "#B8B7B7",
        borderWidth: 2,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 999,
        backgroundColor: "#00695C",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
})