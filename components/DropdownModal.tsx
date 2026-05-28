import { bodySection } from "@/src/constants/exercises";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
                <Text style={styles.icon}>▼</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}/>
                    <View style={styles.menu}>
                        {list ? (
                            <FlatList
                                data={Object.entries(list)}
                                renderItem={({ item }) => {
                                    const [section, exercises] = item;
                                    return (
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={styles.itemText}>--- {section} ---</Text>
                                            {exercises.map(ex => <Pressable
                                                key={ex}
                                                style={({ pressed }) => [
                                                    styles.item,
                                                    pressed && { backgroundColor: "#f0f0f0" }
                                                ]}
                                                android_ripple={{ color: "#e0e0e0" }}
                                                onPress={() => {
                                                    callBack(ex);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Text style={styles.itemText}>{ex}</Text>
                                            </Pressable>)}
                                        </View>
                                    );
                                }}
                            />
                        ) : (
                            sectionList.map((s) => (
                                <Pressable
                                    key={s}
                                    style={({ pressed }) => [
                                        styles.item,
                                        pressed && { backgroundColor: "#f0f0f0" }
                                    ]}
                                    android_ripple={{ color: "#e0e0e0" }}
                                    onPress={() => {
                                        callBack(s);
                                        setOpen(false);
                                    }}
                                >
                                    <Text style={styles.itemText}>{s}</Text>
                                </Pressable>
                            ))
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
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
        marginHorizontal: 50,
        marginVertical: 100,
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
    icon: {
        fontSize: 12,
        marginLeft: 8,
    },
});