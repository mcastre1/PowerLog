import type { SQLiteDatabase } from "expo-sqlite";

declare global {
  var __workoutsDB__: {
    instance: SQLiteDatabase | null;
    initializing: boolean;
  } | undefined;
}

export { };

