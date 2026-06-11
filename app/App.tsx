import { initDB } from "@/database/db";
import { useEffect } from "react";
import RootLayout from "./_layout";

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return <RootLayout />;
}
