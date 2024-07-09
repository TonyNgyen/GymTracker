"use client";

import React, { useState } from "react";
import StartWorkout from "../startWorkout/startWorkout";
import {
  WorkoutContext,
  ExercisesContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";
import { convertExercises } from "@/lib/utils";

function StartWorkoutContainer({ workout, exercises, day }) {
  let convertedExercises = convertExercises(
    workout.workouts[workout.currentWorkout].workouts,
    exercises
  );
  console.log(convertedExercises)
  let startWorkout = {};
  convertedExercises.map((exercise) => {
    for (let i = 1; i <= exercise.sets; i++) {
      if (exercise.id in startWorkout) {
        startWorkout[exercise.id][i] = {
          id: exercise.id,
          name: exercise.name,
          set: i,
          reps: exercise.reps,
          weight: exercise.weight,
        };
      } else {
        startWorkout[exercise.id] = {};
        startWorkout[exercise.id][i] = {
          id: exercise.id,
          name: exercise.name,
          set: i,
          reps: exercise.reps,
          weight: exercise.weight,
        };
      }
    }
  });
  const [workoutContext, setWorkoutContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);
  const [startWorkoutContext, setStartWorkoutContext] = useState(startWorkout);
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
