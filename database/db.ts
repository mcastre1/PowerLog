import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDB(){
    if (!db) {
        db = await SQLite.openDatabaseSync('workouts.db');
    }

    return db;
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