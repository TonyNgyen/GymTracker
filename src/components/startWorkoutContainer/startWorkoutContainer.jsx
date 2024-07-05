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
  // console.log(workout.workouts[workout.currentWorkout].workouts)
  let convertedExercises = convertExercises(
    workout.workouts[workout.currentWorkout].workouts,
    exercises
  );
  console.log(convertedExercises);
  convertedExercises.map((exercise) => {
    console.log(exercise)
  })
  // const startWorkout = Object.keys(workout.workouts).reduce((acc, key) => {
  //   // acc[key] = workout[key] * 2;
  //   console.log(workout.workouts[key])
  //   return acc;
  // }, {});
  // console.log(Object.keys.workout)
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
