import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text } from 'react-native';

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
            <Text style={[styles.tabBarLabel, { color: focused ? 'black' : 'gray' }]}>Calendar</Text>
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
            <Text style={[styles.tabBarLabel, { color: focused ? 'black' : 'gray' }]}>History</Text>
          ),
        })}
      />
    </Tabs>
  );;
}


const styles = StyleSheet.create({
  tabBarLabel: {         // Style to use default react native font styling.
    fontSize: 12,        // default
    fontWeight: "500",   // default
    fontFamily: undefined // lets iOS/Android pick system font
  }
});