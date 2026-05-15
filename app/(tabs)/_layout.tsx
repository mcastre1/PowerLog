import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="calendar"
        options={({ route }) => ({
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="calendar" size={24} color={focused ? 'black' : 'gray'} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? 'black' : 'gray' }}>Calendar</Text>
          ),
        })}
      />
      <Tabs.Screen
        name="history"
        options={({ route }) => ({
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="bar-chart" size={24} color={focused ? 'black' : 'gray'} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? 'black' : 'gray' }}>History</Text>
          ),
        })}
      />
    </Tabs>
  );;
}
