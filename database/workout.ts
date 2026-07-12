import { getDB } from "./db";
import { enqueue } from "./queue";

type WorkoutRow = {
    id: string;
    date: string;
    data: string; // JSON string from DB
    created_at: string;
    updated_at: string;
};

export async function getWorkoutByDate(date: string) {
  return enqueue(async () => {
    const db = await getDB();
    return db.getAllAsync<WorkoutRow>("SELECT * FROM workouts WHERE date = ?", [date]);
  });
}

export async function getAllWorkoutDates() {
  return enqueue(async () => {
    const db = await getDB();
    return db.getAllAsync<WorkoutRow>("SELECT * FROM workouts");
  });
}

export async function saveWorkout(date: string, exercises: any[]) {
  return enqueue(async () => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const now = new Date().toLocaleString();

    return db.runAsync(
      `INSERT INTO workouts(id, date, data, created_at, updated_at)
       VALUES(?, ?, ?, ?, ?)
       ON CONFLICT(date) DO UPDATE SET
         data = excluded.data,
         updated_at = excluded.updated_at;`,
      [id, date, JSON.stringify(exercises), now, now]
    );
  });
}
