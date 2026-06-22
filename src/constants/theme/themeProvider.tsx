import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeMode } from "../types";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import { ThemeContext } from "./ThemeContext";

type ThemeProviderProps = {
    children: React.ReactNode;
};

export function ThemeProvider({children}: ThemeProviderProps) {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>('system');


    useEffect(() => {
        AsyncStorage.getItem('themeMode').then((value) => {
            if (value) {
                setMode(value as ThemeMode);
            }
        });
    }, []);

    const theme = mode === 'system' ? systemScheme === 'dark' ? darkTheme : lightTheme : mode === 'dark' ? darkTheme : lightTheme;

    const updateMode = async (newMode: ThemeMode) => {
        setMode(newMode);
        await AsyncStorage.setItem('themeMode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setMode: updateMode }}>
            {children}
        </ThemeContext.Provider>
    );
}