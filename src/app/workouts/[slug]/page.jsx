import WorkoutSlug from "@/components/workoutSlug/workoutSlug";
import { getWorkout } from "@/lib/data";
import React from "react";

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  const workouts = workout.workouts
  return (
    <div>
      <h1>{workout.name}</h1>
      {Object.keys(workouts).map((day) => (
        <WorkoutSlug workouts={workouts} day={day} key={day}/>
      ))}
    </div>
  );
}

export default SingleWorkoutPage;
