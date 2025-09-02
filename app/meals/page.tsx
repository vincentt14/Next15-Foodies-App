import Link from "next/link";
import { Suspense } from "react"; // Suspense is used to handle async data fetching in React until the data is loaded

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/repo/meals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals from our community.",
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipoe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
