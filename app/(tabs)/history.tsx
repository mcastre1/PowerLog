import { useTheme } from '@/src/constants/theme/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const keys = await AsyncStorage.getAllKeys();
    const workoutKeys = keys.filter(key => key.startsWith('workout:'));
    const workouts = await AsyncStorage.multiGet(workoutKeys);

    console.log('Workouts:', workouts);
  }

  const { theme } = useTheme(); // Get the current theme (light or dark) from the ThemeContext.

  return <>
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.text }}>History Page</Text>
    </View>
  </>
}
