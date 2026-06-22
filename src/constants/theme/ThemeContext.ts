import { createContext } from "react";
import { Theme, ThemeMode } from "../types";

type ThemeContextType = {
    theme: Theme;
    setMode: (mode: ThemeMode) => Promise<void>;
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
