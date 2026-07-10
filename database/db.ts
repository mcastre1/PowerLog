import DtabaseConnection from './connection';

export async function getDB() {
  const db = await DtabaseConnection.getInstance();
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
