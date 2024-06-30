import React from "react";
import styles from "./displayList.module.css";
import WorkoutSlug from "../workoutSlug/workoutSlug";
import DisplayDay from "../displayDay/displayDay";

function DisplayWorkout({ workout, exercises }) {
  return (
    <div className={styles.daysContainer}>
      <>
        <h1 className="text-center font-bold text-5xl mb-2">{workout.name}</h1>
        <h2 className="text-center font-medium text-xl">{workout.creator}</h2>
      </>
      {Object.keys(workout.workouts).map((day) => (
        <DisplayDay
          day={day}
          workout={workout.workouts[day]}
          key={day}
          exercises={exercises}
        />
      ))}
    </div>
  );
}

export default DisplayWorkout;
