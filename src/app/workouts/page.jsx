import Link from "next/link";
import React from "react";
import WorkoutList from "@/components/workoutList/workoutList";
import { getWorkouts } from "@/lib/data";

async function WorkoutsPage() {
  const workouts = await getWorkouts();
  const day = new Date().getDay();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(Object.keys(workouts).length == true);
  return (
    <div>
      {Object.keys(workouts).length && (
        <WorkoutList workouts={workouts} day={weekday[day]} />
      )}
      {!Object.keys(workouts).length && (
        <section className="bg-indigo-200 p-10 flex justify-center w-1/2 mx-auto rounded-md">
          <h1 className="text-4xl">There are no workouts to display</h1>
        </section>
      )}
    </div>
  );
}

export default WorkoutsPage;
