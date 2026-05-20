import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const sectionList = ["Upper Body", "Lower Body"]


export default function DropdownModal() {
    const [selected, setSelected] = useState("Upper Body");
    const [open, setOpen] = useState(false);

    return (
        <>
            <Pressable style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.6 } // iOS feedback
            ]}
            android_ripple={{color: "#ddd"}} // Android ripple 
            
            onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}> {selected} </Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
                    <View style={styles.menu}>
                        {sectionList.map((s) => (
                            <Pressable
                                key={s}
                                style={({pressed})=>[
                                    styles.item,
                                    pressed && { backgroundColor : "#f0f0f0"} // feedback
                                ]}
                                android_ripple={{ color: "#e0e0e0"}}
                                onPress={() => {
                                    setSelected(s);
                                    setOpen(false);
                                }}>
                                <Text style={styles.itemText}>{s}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 3,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#B8B7B7"
    },
    buttonText: {
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    menu: {
        marginHorizontal: 40,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
    },
    item: {
        padding: 14,
    },
    itemText: {
        fontSize: 16,
    },
});