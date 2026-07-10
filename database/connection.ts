import * as SQLite from "expo-sqlite";

class DatabaseConnection {
  private static instance: SQLite.SQLiteDatabase | null = null;

  static async getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = await SQLite.openDatabaseAsync("workouts.db");
      console.log("DB opened (singleton)");
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection;
