"use client";

import { React, useState } from "react";
import {
  NewExercisesContext,
  ExercisesContext,
  WorkoutContext,
} from "./context";
import styles from "./editList.module.css";
import WorkoutSlug from "../workoutSlug/workoutSlug";

function EditList({ workout, exercises }) {
  const [newExercisesContext, setNewExercisesContext] = useState([]);
  const [workoutContext, setWorkoutContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);
  return (
    <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
      <ExercisesContext.Provider value={[exercisesContext, setExercisesContext]}>
        <NewExercisesContext.Provider value={[newExercisesContext, setNewExercisesContext]}>
          <div className={styles.slugContainer}>
            {Object.keys(workout.workouts).map((day) => (
              <WorkoutSlug day={day} workout={workout} key={day} />
            ))}
          </div>
        </NewExercisesContext.Provider>
      </ExercisesContext.Provider>
    </WorkoutContext.Provider>
  );
}

export default EditList;
