"use client";

import React, { useState } from "react";
import StartWorkout from "../startWorkout/startWorkout";
import {
  WorkoutContext,
  ExercisesContext,
  StartWorkoutContext,
  CurrentExerciseContext,
} from "@/app/workouts/[slug]/start/context";
import { convertExercises } from "@/lib/utils";
import { useLocalStorage } from "@/lib/utils";

function StartWorkoutContainer({ workout, exercises, day }) {
  let convertedExercises = convertExercises(
    workout.workouts[workout.currentWorkout].workouts,
    exercises
  );
  const {
    setItem: setStartWorkoutItem,
    getItem: getStartWorkoutItem,
    removeItem: removeStartWorkoutItem,
  } = useLocalStorage("StartWorkout");
  const {
    setItem: setCurrentExerciseItem,
    getItem: getCurrentExerciseItem,
    removeItem: removeCurrentExerciseItem,  
  } = useLocalStorage("CurrentExercise");

  let startWorkout = getStartWorkoutItem();
  let currentExercise = getCurrentExerciseItem();
  if (!startWorkout || !currentExercise) {
    startWorkout = {};
    currentExercise = {};
    convertedExercises.map((exercise) => {
      for (let i = 1; i <= exercise.sets; i++) {
        if (exercise.id in startWorkout) {
          startWorkout[exercise.id][i] = {
            id: exercise.id,
            name: exercise.name,
            set: i,
            reps: exercise.reps,
            weight: exercise.weight,
            completed: false,
          };
        } else {
          startWorkout[exercise.id] = {};
          startWorkout[exercise.id][i] = {
            id: exercise.id,
            name: exercise.name,
            set: i,
            reps: exercise.reps,
            weight: exercise.weight,
            completed: false,
          };
        }
      }
      currentExercise[exercise.id] = 1;
    });
    setStartWorkoutItem(startWorkout);
    setCurrentExerciseItem(currentExercise);
  }
  const [workoutContext, setWorkoutContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);
  const [startWorkoutContext, setStartWorkoutContext] = useState(startWorkout);
  const [currentExerciseContext, setCurrentExerciseContext] =
    useState(currentExercise);
  return (
    <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
      <ExercisesContext.Provider
        value={[exercisesContext, setExercisesContext]}
      >
        <StartWorkoutContext.Provider
          value={[startWorkoutContext, setStartWorkoutContext]}
        >
          <CurrentExerciseContext.Provider
            value={[currentExerciseContext, setCurrentExerciseContext]}
          >
            <StartWorkout day={day} />
          </CurrentExerciseContext.Provider>
        </StartWorkoutContext.Provider>
      </ExercisesContext.Provider>
    </WorkoutContext.Provider>
  );
}

export default StartWorkoutContainer;
