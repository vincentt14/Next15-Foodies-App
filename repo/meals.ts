import sql from 'better-sqlite3';

import { Meal } from '@/types/Meal';

const db = sql('meals.db');

//kalau fetch data SELECT pakai .all()
//kalau fetch single data SELECT pakai .get()
//kalau INSERT, UPDATE, DELETE pakai .run()

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //throw new Error('Database connection failed'); //simulasi error
  return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug: string): Meal {
  return db.prepare('SELECT* FROM meals WHERE slug = ?').get(slug) as Meal;
}