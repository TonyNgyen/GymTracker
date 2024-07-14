import React from "react";
import { getWorkout, getUserExercises } from "@/lib/data";
import StartWorkoutContainer from "@/components/startWorkoutContainer/startWorkoutContainer";

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
      <StartWorkoutContainer
        workout={workout}
        exercises={exercises}
        day={weekday[day]}
      />
    </div>
  );
}

export default StartPage;
