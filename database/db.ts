import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDB() {
  if (!db) {
    try {
      db = await SQLite.openDatabaseAsync('workouts.db');
      console.log("DB opened");
    } catch (err) {
      console.log("DB failed to open:", err);
    }
  }

  return db;
}

export async function initDB() {
  const db = await getDB();
  if (!db) {
    console.error("DB is null — cannot initialize");
    return;
  }

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
