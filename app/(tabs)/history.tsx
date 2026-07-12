import { getDB } from '@/database/db';
import { useTheme } from '@/src/constants/theme/useTheme';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Text, View } from 'react-native';

export default function History() {
  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  async function loadWorkouts() {
    const db = await getDB();
    const rows = await db.getAllAsync("SELECT * FROM workouts");

    console.log("Workouts loaded:", rows);
  }

  const { theme } = useTheme(); // Get the current theme (light or dark) from the ThemeContext.

  return <>
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.text }}>History Page</Text>
    </View>
  </>
}
