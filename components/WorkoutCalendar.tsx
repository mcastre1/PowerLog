import { useTheme } from "@/src/constants/theme/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function WorkoutCalendar() {
    const [loading, setLoading] = useState(true); // State to track if the workout dates are still loading.

    const [markedDates, setMarkedDates] = useState<Record<string, any>>()

    const { theme } = useTheme(); // Custom hook to get the current theme (light or dark) from the ThemeContext.
    const [calendar_id, setCalendarID] = useState(new Date().toLocaleTimeString()); // Get the current time as a string.

    useFocusEffect(
        useCallback(() => {
            loadWorkoutDates();
            setCalendarID(new Date().toLocaleTimeString()); // Update the calendar_id to the current time whenever the screen is focused.
        }, [])
    );

    // Retrieving all dates from workouts, and saving them in workoutDates.
    // for later use
    async function loadWorkoutDates() {
        setLoading(true);
        const keys = await AsyncStorage.getAllKeys();
        const workoutKeys = keys.filter(key => key.startsWith('workout:')).map(key => key.replace('workout:', ''));
        console.log('Workout keys:', workoutKeys);
        const marked = workoutKeys.reduce<Record<string, any>>((acc, date) => {
            acc[date] = { selected: true, selectedColor: "#4CAF50" }
            return acc;
        }, {});

        setMarkedDates(marked);
        setLoading(false);
    }
    //////////////////////////////////////////////////////

    if (loading) {
        return <><View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text }}>Loading...</Text>
        </View></>
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CalendarList key={calendar_id}
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