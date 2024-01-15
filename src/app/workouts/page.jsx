import Link from "next/link";
import React from "react";
import WorkoutList from "@/components/workoutList/workoutList";
import { getWorkouts } from "@/lib/data";

async function WorkoutsPage() {
  const workouts = await getWorkouts();
  const day = new Date().getDay();
  // console.log(workouts)
  return (
    <div>
      <Link
        href="/workouts/add"
        className="py-2 px-4 bg-white text-black rounded-full"
      >
        Add Workout
      </Link>
      <WorkoutList workouts={workouts} day={day} />
    </div>
  );
}

export default WorkoutsPage;
