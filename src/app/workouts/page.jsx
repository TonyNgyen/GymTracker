import Link from "next/link";
import React from "react";
import ExerciseListContainer from "@/components/exerciseListContainer/exerciseListContainer";
import { getWorkouts, getExercises } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

async function WorkoutsPage() {
  const workouts = await getWorkouts();
  const day = format(new Date(), "P");
  const exercises = await getExercises();
  return (
    <div>
      {workouts === undefined || !Object.keys(workouts).length ? (
        <div className="flex flex-col items-center">
          <section className="p-10 flex justify-center w-1/2 mx-auto rounded-md">
            <h1 className="text-5xl text-center leading-snug">
              There are no workouts to display
            </h1>
          </section>
          <Button asChild className="bg-main text-background text-lg px-6 py-6 hover:bg-main-foreground hover:text-foreground">
            <Link href="/workouts/add">Add Workout</Link>
          </Button>
        </div>
      ) : (
        <ExerciseListContainer
          workouts={workouts}
          day={day}
          exercises={exercises}
        />
      )}
    </div>
  );
}

export default WorkoutsPage;
