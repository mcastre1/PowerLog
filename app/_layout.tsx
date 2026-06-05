import { initDB } from "@/database/db";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const theme = useColorScheme();

    // Initialize database once every time the app is opened.
    useEffect(() => {
        initDB();
    }, []);

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}>
                    <StatusBar
                        style={theme === "dark" ? "light" : "dark"}
                        backgroundColor="transparent" />
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }} />

                        <Stack.Screen
                            name="(modals)"
                            options={{
                                headerShown: false,
                            }} />
                    </Stack>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}