import Link from "next/link";
import React from "react";
import WorkoutList from "@/components/workoutList/workoutList";
import { getWorkouts, getExercises } from "@/lib/data";

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
      {!Object.keys(workouts).length ? (
        <div className="flex flex-col items-center">
          <section className="p-10 flex justify-center w-1/2 mx-auto rounded-md">
            <h1 className="text-4xl">There are no workouts to display</h1>
          </section>
          <Link
            href="/workouts/add"
            className="py-2 px-4 bg-white text-black rounded-full"
          >
            Add Workout
          </Link>
        </div>
      ) : (
        <WorkoutList workouts={workouts} day={weekday[day]} exercises={exercises} />
      )}
    </div>
  );
}

export default WorkoutsPage;
