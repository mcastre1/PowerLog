import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function WorkoutCalendar() {
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        console.log(selectedDate);
    });
    
    return (
        <View style={{ flex:1 }}>
            <CalendarList
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    router.push({
                        pathname: "/(modals)/editWorkout",
                        params: {date : day.dateString},
                    });
                }}
                markedDates={{
                    [selectedDate]: {selected: true, selectedColor: "#4CAF50"}
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