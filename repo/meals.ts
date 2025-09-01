import fs from "node:fs";

import sql from "better-sqlite3";

import { Meal, MealInput } from "@/types/Meal";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

//kalau fetch data SELECT pakai .all()
//kalau fetch single data SELECT pakai .get()
//kalau INSERT, UPDATE, DELETE pakai .run()

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //throw new Error('Database connection failed'); //simulasi error
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export function getMeal(slug: string): Meal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export async function saveMeal(meal: MealInput) {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  // store image yang diupload ke folder public/images
  const extention = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extention}`;
  const filePath = `public/images/${fileName}`

  const buffer = Buffer.from(await meal.image.arrayBuffer())
  await fs.promises.writeFile(filePath, buffer)

  const storedMeal: Omit<Meal, "id"> = {
    title: meal.title,
    summary: meal.summary,
    instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image: `/images/${fileName}`,
    slug,
  }

  db.prepare(
    `
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `
  ).run(storedMeal);
}
