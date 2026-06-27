import { useTheme } from "@/src/constants/theme/useTheme";
import { Pressable, Text } from "react-native";

export function ThemeToggle() {
  const { theme, setMode } = useTheme();

  const toggle = () => {
    const next = theme.mode === "light" ? "dark" : "light";
    setMode(next);
  };

  return (
    <Pressable
      onPress={toggle}
      style={{
        padding: 12,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: theme.colors.text }}>
        Switch to {theme.mode === "light" ? "Dark" : "Light"} Mode
      </Text>
    </Pressable>
  );
}
