"use client";

import React, { useState } from "react";
import { ExercisesContext } from "./context";
import ExerciseList from "./exerciseList";

function ExerciseListContainer({ workouts, day, exercises }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts[day];
  const [exercisesContext, setExercisesContext] = useState(exercises);

  const convertedExercises = [];

  workoutForDay.workouts.map((id) => {
    exercises.map((exercise) => {
      if (id == exercise.id) {
        convertedExercises.push(exercise);
      }
    });
  });

  return (
    <ExercisesContext.Provider value={[exercisesContext, setExercisesContext]}>
      <ExerciseList workouts={workouts} day={day}/>
    </ExercisesContext.Provider>
  );
}

export default ExerciseListContainer;
