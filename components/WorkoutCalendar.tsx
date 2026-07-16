import { useTheme } from "@/src/constants/theme/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function WorkoutCalendar() {
    const [markedDates, setMarkedDates] = useState<Record<string, any>>()

    const { theme } = useTheme(); // Custom hook to get the current theme (light or dark) from the ThemeContext.

    useFocusEffect(
        useCallback(() => {
            loadWorkoutDates();
        }, [])
    );

    // Retrieving all dates from workouts, and saving them in workoutDates.
    // for later use
    async function loadWorkoutDates() {
        const keys = await AsyncStorage.getAllKeys();
        const workoutKeys = keys.filter(key => key.startsWith('workout:')).map(key => key.replace('workout:', ''));
        console.log('Workout keys:', workoutKeys);
        const marked = workoutKeys.reduce<Record<string, any>>((acc, date) => {
            acc[date] = { selected: true, selectedColor: "#4CAF50" }
            return acc;
        }, {});

        setMarkedDates(marked);
    }
    //////////////////////////////////////////////////////


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CalendarList
                calendarStyle={{
                    backgroundColor: theme.colors.background,
                }}
                theme={{
                    backgroundColor: theme.colors.background,
                    calendarBackground: theme.colors.background,
                    dayTextColor: theme.colors.text,
                    monthTextColor: theme.colors.text,
                    textSectionTitleColor: theme.colors.text,
                    todayTextColor: "#FF5722",
                    selectedDayBackgroundColor: "4CAF50",
                }}
                onDayPress={(day) => {
                    router.push({
                        pathname: "/(modals)/editWorkout",
                        params: { date: day.dateString },
                    });
                }}
                markedDates={markedDates ?? {}}
                pastScrollRange={12}
                futureScrollRange={12}
            />
        </View>
    );
}