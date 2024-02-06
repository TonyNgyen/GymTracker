import WorkoutSlug from "@/components/workoutSlug/workoutSlug";
import { getWorkout } from "@/lib/data";
import React from "react";
import styles from "./slug.module.css";

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  return (
    <div>
      <h1 className="text-center my-10 text-5xl font-bold">{workout.name}</h1>
      <div className={styles.slugContainer}>
        {Object.keys(workout.workouts).map((day) => (
          <WorkoutSlug day={day} workout={workout} key={day} />
        ))}
      </div>
    </div>
  );
}

export default SingleWorkoutPage;
