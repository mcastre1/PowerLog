
import * as SQLite from "expo-sqlite";

// Global singleton
let dbInstance: SQLite.SQLiteDatabase | null = null;

function isValidDB(db: any) {
  return db && db.nativeDatabase && Object.keys(db.nativeDatabase).length > 0;
}

export async function getDB() {
  // If we already have a DB but it's invalid → reopen it
  if (dbInstance && !isValidDB(dbInstance)) {
    console.log("DB handle invalid — reopening database");
    dbInstance = null;
  }

  // If no DB → open it
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("workouts.db");
    console.log("DB opened");
  }

  return dbInstance;
}

export async function initDB() {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS workouts (
      id TEXT PRIMARY KEY,
      date TEXT UNIQUE,
      data TEXT,
      created_at TEXT,
      updated_at TEXT
    );
  `);
}
