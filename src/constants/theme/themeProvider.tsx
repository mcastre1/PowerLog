import * as secureStore from "expo-secure-store";
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
        secureStore.getItemAsync('themeMode').then((value) => {
            if (value) {
                setMode(value as ThemeMode);
            }
        });
    }, []);

    const theme = mode === 'system' ? systemScheme === 'dark' ? darkTheme : lightTheme : mode === 'dark' ? darkTheme : lightTheme;

    const updateMode = async (newMode: ThemeMode) => {
        setMode(newMode);
        await secureStore.setItemAsync('themeMode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setMode: updateMode }}>
            {children}
        </ThemeContext.Provider>
    );
}