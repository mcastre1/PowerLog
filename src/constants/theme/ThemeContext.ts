import { createContext } from "react";

type ThemeContextType = {
    theme: Theme;
    setMode: (mode: ThemeMode) => Promise<void>;
};

type ThemeMode = 'light' | 'dark' | 'system';

export type Theme = {
    mode: "light" | "dark";
    colors: {
        background: string;
        text: string;
        card: string;
        primary: string;
    };
};


export const ThemeContext = createContext<ThemeContextType>({
    theme: {
        mode: "light",
        colors: {
            background: "#fff",
            text: "#000",
            card: "#f2f2f2",
            primary: "#3B82F6",
        },
    },
    setMode: async () => {},
});
