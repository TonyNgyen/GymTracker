"use client";

import React, { useState } from "react";
import StartWorkout from "../startWorkout/startWorkout";
import {
  WorkoutContext,
  ExercisesContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";

function StartWorkoutContainer({ workout, exercises, day }) {
  const [workoutContext, setWorkoutContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);
  const [startWorkoutContext, setStartWorkoutContext] = useState({});
  return (
    <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
      <ExercisesContext.Provider
        value={[exercisesContext, setExercisesContext]}
      >
        <StartWorkoutContext.Provider
          value={[startWorkoutContext, setStartWorkoutContext]}
        >
          <StartWorkout day={day} />
        </StartWorkoutContext.Provider>
      </ExercisesContext.Provider>
    </WorkoutContext.Provider>
  );
}

export default StartWorkoutContainer;
