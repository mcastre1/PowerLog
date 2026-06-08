import { getDB } from "@/database/db";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function WorkoutCalendar() {
    const [selectedDate, setSelectedDate] = useState("");


    useEffect(() => {
        console.log(selectedDate);
    });

    // For sqlite expo api, we need to call our query from an async function
    // but it will break expo's tab navigation so it we use a hook for it
    useEffect(()=> {
        loadWorkoutDates();
    });

    async function loadWorkoutDates() {
        const db = await getDB();
        const workouts = await db.getAllAsync("SELECT * FROM workouts")
        console.log(workouts);
    }
    //////////////////////////////////////////////////////

    return (
        <View style={{ flex: 1 }}>
            <CalendarList
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    router.push({
                        pathname: "/(modals)/editWorkout",
                        params: { date: day.dateString },
                    });
                }}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: "#4CAF50" }
                }}
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