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
  console.log(workouts)
  return (
    <div>
      <WorkoutList workouts={workouts} day={weekday[day]} />
    </div>
  );
}

export default WorkoutsPage;
