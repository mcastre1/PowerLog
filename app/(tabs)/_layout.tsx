import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendar" }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: "History" }}
      />
    </Tabs>
  );;
}
