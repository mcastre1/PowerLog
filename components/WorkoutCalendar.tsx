import { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function WorkoutCalendar() {
    const [selectedDate, setSelectedDate] = useState("");
    
    return (
        <View style={{ flex:1, paddingTop: 50}}>
            <Calendar
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                }}
                markedDates={{
                    [selectedDate]: {selected: true, selectedColor: "#4CAF50"}
                }}
                theme={{
                    todayTextColor: "#FF5722",
                    selectedDayBackgroundColor: "4CAF50",
                }}
            />
        </View>
    );
}