"use client";

import React, { useState } from "react";
import StartWorkout from "../startWorkout/startWorkout";
import {
  WorkoutContext,
  ExercisesContext,
} from "@/app/workouts/[slug]/start/context";

function StartWorkoutContainer({ workout, exercises, day }) {
  const [workoutContext, setWorkoutContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);
  console.log(workoutContext.workouts[day].workouts);
  return (
    <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
      <ExercisesContext.Provider
        value={[exercisesContext, setExercisesContext]}
      >
        <StartWorkout day={day} />
      </ExercisesContext.Provider>
    </WorkoutContext.Provider>
  );
}

export default StartWorkoutContainer;
