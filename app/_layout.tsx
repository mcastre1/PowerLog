import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../src/constants/theme/ThemeContext";
import { ThemeProvider } from "../src/constants/theme/ThemeProvider";

export default function RootLayout() {
    const {theme} = useContext(ThemeContext);

    // Initialize database once every time the app is opened.
    // useEffect(() => {
    //     initDB();
    // }, []);

    return (<>
        <ThemeProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    <StatusBar
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
        </ThemeProvider>
    </>
    );
}