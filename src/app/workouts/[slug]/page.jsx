import WorkoutSlug from "@/components/workoutSlug/workoutSlug";
import { getWorkout } from "@/lib/data";
import React from "react";
import styles from "./slug.module.css"

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  const workouts = workout.workouts;
  return (
    <div>
      <h1>{workout.name}</h1>
      <div className={styles.slugContainer}>
        {Object.keys(workouts).map((day) => (
          <WorkoutSlug workouts={workouts} day={day} key={day} />
        ))}
      </div>
    </div>
  );
}

export default SingleWorkoutPage;
