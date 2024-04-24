import React from "react";
import { getWorkout, getUserExercises } from "@/lib/data";
import StartWorkout from "@/components/startWorkout/startWorkout";

async function StartPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  const exercises = await getUserExercises(workout.creator);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = new Date().getDay();
  return (
    <div>
      <StartWorkout workout={workout} exercises={exercises} day={weekday[day]} />
    </div>
  );
}

export default StartPage;
