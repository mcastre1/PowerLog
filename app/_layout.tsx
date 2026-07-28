import { useTheme } from "@/src/constants/theme/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "../src/constants/theme/themeProvider";


export default function RootLayout() {
    async function clearWorkoutData() {
        const keys = await AsyncStorage.getAllKeys();
        const workoutKeys = keys.filter(key => key.startsWith("workout:"));
        await AsyncStorage.multiRemove(workoutKeys);
    }

    clearWorkoutData()

    return (
        <ThemeProvider>
            <RootLayoutNav />
        </ThemeProvider>
    );
}

function RootLayoutNav() {
    const { theme } = useTheme(); // Get the current theme (light or dark) from the ThemeContext.
    return (<>
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <StatusBar
                //backgroundColor="transparent" 
                />
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