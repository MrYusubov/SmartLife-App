import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('smartlife.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        deadline TEXT,
        done INTEGER DEFAULT 0
      );
    `);
  }
};

export const getTasks = async (): Promise<any[]> => {
  if (!db) await initDatabase();
  return db!.getAllAsync('SELECT * FROM tasks ORDER BY id DESC');
};

export const insertTask = async (title: string, deadline?: string): Promise<void> => {
  if (!db) await initDatabase();
  await db!.runAsync(
    'INSERT INTO tasks (title, deadline, done) VALUES (?,?,?)',
    [title, deadline ?? null, 0]
  );
};

export const deleteTask = async (id: number): Promise<void> => {
  if (!db) await initDatabase();
  await db!.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
};

export const toggleTask = async (id: number, value: boolean): Promise<void> => {
  if (!db) await initDatabase();
  await db!.runAsync('UPDATE tasks SET done = ? WHERE id = ?', [value ? 1 : 0, id]);
};

export const TasksRepo = {
  all: getTasks,
  add: insertTask,
  remove: deleteTask,
  toggle: toggleTask,
};
