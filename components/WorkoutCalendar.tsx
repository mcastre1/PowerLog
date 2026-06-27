import { getDB } from "@/database/db";
import { useTheme } from "@/src/constants/theme/useTheme";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";

type Workout = {
    id: string;
    date: string;
    data: Exercise[];
    created_at: string;
    updated_at: string;
};

type Exercise = {
    id: string;
    date: string;
    name: string;
    sets: { id: string; Reps: string; Weight: string }[];
};

type WorkoutRow = {
    id: string;
    date: string;
    data: string; // JSON string from DB
    created_at: string;
    updated_at: string;
};

export default function WorkoutCalendar() {
    const isFocused = useIsFocused();                      // Used to check if screen is focused.
    const [workoutDates, setWorkoutDates] = useState<string[]>([]);
    const [markedDates, setMarkedDates] = useState<Record<string, any>>()

    const { theme } = useTheme(); // Custom hook to get the current theme (light or dark) from the ThemeContext.

    useEffect(() => {
        const marked = workoutDates.reduce<Record<string, any>>((acc, date) => {
            acc[date] = { selected: true, selectedColor: "#4CAF50" }
            return acc;
        }, {});

        setMarkedDates(marked);
        console.log(workoutDates);
    }, [workoutDates])

    // For sqlite expo api, we need to call our query from an async function
    // but it will break expo's tab navigation so it we use a hook for it
    useEffect(() => {
        if (isFocused) {
            loadWorkoutDates();
        }
    }, [isFocused]);

    // Retrieving all dates from workouts, and saving them in workoutDates.
    // for later use
    async function loadWorkoutDates() {
        const db = await getDB();
        const workouts = await db.getAllAsync<WorkoutRow>("SELECT * FROM workouts")

        const allDates: string[] = [];

        workouts.forEach(row => {
            const parsedData: Exercise[] = JSON.parse(row.data);
            parsedData.forEach(ex => allDates.push(ex.date));
        });

        setWorkoutDates(allDates);
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
                }}
                onDayPress={(day) => {
                    router.push({
                        pathname: "/(modals)/editWorkout",
                        params: { date: day.dateString },
                    });
                }}
                markedDates={markedDates ?? {}}
                theme={{
                    todayTextColor: "#FF5722",
                    selectedDayBackgroundColor: "4CAF50",
                }}
                pastScrollRange={12}
                futureScrollRange={12}
            />
        </View>
    );
}