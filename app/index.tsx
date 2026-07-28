import { Redirect } from "expo-router";


// Entry point for app.
export default function Index() {
  return <Redirect href="/(tabs)/calendar" />;
}
