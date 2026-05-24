import { bodySection } from "@/src/constants/exercises";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    callBack: (value: string) => void;
    data: string;
    type: string;
    list?: Record<string, readonly string[]>
}

export default function DropdownModal({ callBack, data, type, list }: Props) {
    const [open, setOpen] = useState(false);
    const sectionList = bodySection;

    return (
        <>
            <Pressable style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.6 } // iOS feedback
            ]}
                android_ripple={{ color: "#ddd" }} // Android ripple 

                onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}> {data} </Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
                    <View style={styles.menu}>
                        {list ?
                            (
                                Object.keys(list).map((section) => (
                                    <>
                                        <Text key={section}>{section}</Text>
                                        {list[section].map((exercise) => (
                                            <Pressable
                                                key={exercise}
                                                style={({ pressed }) => [
                                                    styles.item,
                                                    pressed && { backgroundColor: "#f0f0f0" } // feedback
                                                ]}
                                                android_ripple={{ color: "#e0e0e0" }}
                                                onPress={() => {
                                                    callBack(exercise);
                                                    setOpen(false);

                                                }}>
                                                <Text key={section+exercise}style={styles.itemText}>{exercise}</Text>
                                            </Pressable>
                                        ))}
                                    </>
                                ))
                            )
                            :
                            (sectionList.map((s) => (
                                <Pressable
                                    key={s}
                                    style={({ pressed }) => [
                                        styles.item,
                                        pressed && { backgroundColor: "#f0f0f0" } // feedback
                                    ]}
                                    android_ripple={{ color: "#e0e0e0" }}
                                    onPress={() => {
                                        callBack(s);
                                        setOpen(false);

                                    }}>
                                    <Text style={styles.itemText}>{s}</Text>
                                </Pressable>
                            )))}
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