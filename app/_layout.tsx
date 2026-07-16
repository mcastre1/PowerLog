import { useTheme } from "@/src/constants/theme/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "../src/constants/theme/ThemeProvider";

export default function RootLayout() {
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