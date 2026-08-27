import { useTheme } from '@/src/constants/theme/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function History() {
  const [workoutPRs, setWorkoutPRs] = useState<Record<string, any>>({});

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  // Loads all workouts from async storage, and only keeps track of unique max exercises.
  async function loadWorkouts() {
    const keys = await AsyncStorage.getAllKeys();
    const workoutKeys = keys.filter(key => key.startsWith('workout:'));
    const workouts = await AsyncStorage.multiGet(workoutKeys);

    // New pr Map to store the max weight for each exercise across all workouts.
    const prMap: Record<string, number> = {};
    // Key is date of workout, value is the workout json data. This will be used to display the history of workouts.
    // Key is 'workout:2023-06-01'
    for (const [key, exercises] of workouts) {
      if (!exercises) continue;

      const parsed = JSON.parse(exercises);

      for (const exercise of parsed) {
        const exerciseName = exercise.name;
        const maxWeight = Math.max(...exercise.sets.map((set: any) => parseFloat(set.Weight)));

        if (!prMap[exerciseName] || maxWeight > prMap[exerciseName]) {
          prMap[exerciseName] = maxWeight;
        }
      }
    }
    // Sets state workoutPrs to the new prMap
    setWorkoutPRs(prMap);
  }

  const { theme } = useTheme(); // Get the current theme (light or dark) from the ThemeContext.

  // Returns a list of text items with name and max weigth used on for a given exercise.
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={Object.entries(workoutPRs)} // [["Bench", {...}], ["Squat", {...}]]
        keyExtractor={([name]) => name}
        renderItem={({ item }) => {
          const [name, pr] = item;
          return (
            <Pressable onPress={() => console.log(name)}>
              <Text>{name}: {pr.weight} lbs</Text>
            </Pressable>
          );
        }}
      />


      {/* Object.entries(workoutPRs).map(([exerciseName, maxWeight]) => (
          <Text key={exerciseName} style={{ color: theme.colors.text }}>{exerciseName}: {maxWeight} lbs</Text>
        )) */}
    </View>
  )
}
