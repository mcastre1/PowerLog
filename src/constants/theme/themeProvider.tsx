import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({children}) {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState('system');

    useEffect(() => {
        AsyncStorage.getItem('themeMode').then((value) => {
            if (value) {
                setMode(value);
            }
        });
    }, []);

    const theme = mode === 'system' ? systemScheme === 'dark' ? darkTheme : lightTheme : mode === 'dark' ? darkTheme : lightTheme;

    const updateMode = async (newMode) => {
        setMode(newMode);
        await AsyncStorage.setItem('themeMode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setMode: updateMode }}>
            {children}
        </ThemeContext.Provider>
    );
}