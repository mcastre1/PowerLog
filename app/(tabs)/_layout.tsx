import { useTheme } from "@/src/constants/theme/useTheme";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text } from 'react-native';

export default function TabsLayout() {
  const { theme } = useTheme(); // Custom hook to get the current theme (light or dark) from the ThemeContext.
  return (
    <Tabs>
      <Tabs.Screen
        name="calendar"
        options={({ route }) => ({
          title: "Calendar",
          tabBarStyle: { backgroundColor: theme.colors.background}, // Set the background color of the tab bar to white
          headerStyle: { backgroundColor: theme.colors.background}, // Set the background color of the header to white
          headerTitleStyle: { color: theme.colors.text}, // Set the text color of the header title to black
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
          tabBarStyle: { backgroundColor: theme.colors.background}, // Set the background color of the tab bar to white
          headerStyle: { backgroundColor: theme.colors.background}, // Set the background color of the header to white
          headerTitleStyle: { color: theme.colors.text}, // Set the text color of the header title to black
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="bar-chart" size={24} color={focused ? 'black' : 'gray'} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color: focused ? 'black' : 'gray' }]}>History</Text>
          ),
        })}
      />
      <Tabs.Screen
        name="settings"
        options={({ route }) => ({
          title: "Settings",
          tabBarStyle: { backgroundColor: theme.colors.background}, // Set the background color of the tab bar to white
          headerStyle: { backgroundColor: theme.colors.background}, // Set the background color of the header to white
          headerTitleStyle: { color: theme.colors.text}, // Set the text color of the header title to black
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="setting" size={24} color={focused ? 'black' : 'gray'} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color: focused ? 'black' : 'gray' }]}>Settings</Text>
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