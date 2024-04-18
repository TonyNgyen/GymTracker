import Link from "next/link";
import React from "react";
import ExerciseListContainer from "@/components/exerciseList/exerciseListContainer";
import { getWorkouts, getExercises } from "@/lib/data";
import { Button } from "@/components/ui/button";

async function WorkoutsPage() {
  const workouts = await getWorkouts();
  const day = new Date().getDay();
  const exercises = await getExercises();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      {workouts === undefined || !Object.keys(workouts).length ? (
        <div className="flex flex-col items-center">
          <section className="p-10 flex justify-center w-1/2 mx-auto rounded-md">
            <h1 className="text-5xl text-center leading-snug">
              There are no workouts to display
            </h1>
          </section>
          <Button className="bg-main text-background text-lg px-6 py-6 hover:bg-main-foreground hover:text-foreground">
            <Link href="/workouts/add">Add Workout</Link>
          </Button>
        </div>
      ) : (
        <ExerciseListContainer
          workouts={workouts}
          day={weekday[day]}
          exercises={exercises}
        />
      )}
    </div>
  );
}

export default WorkoutsPage;
