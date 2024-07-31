import React from "react";
import { getWorkout, getUserExercises, getUserWorkout } from "@/lib/data";
import StartWorkoutContainer from "@/components/startWorkoutContainer/startWorkoutContainer";

async function StartPage({ params }) {
  const { slug } = params;
  const workout = (await getUserWorkout())[slug];
  const exercises = await getUserExercises();
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
      <StartWorkoutContainer
        workout={workout}
        exercises={exercises}
        day={weekday[day]}
      />
    </div>
  );
}

export default StartPage;
