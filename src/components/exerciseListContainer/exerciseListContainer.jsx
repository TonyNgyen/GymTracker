"use client";

import React, { useState } from "react";
import { ExercisesContext } from "./context";
import ExerciseList from "../exerciseList/exerciseList";

function ExerciseListContainer({ workouts, day, exercises, workoutHistory }) {
  const [exercisesContext, setExercisesContext] = useState(exercises);

  return (
    <ExercisesContext.Provider value={[exercisesContext, setExercisesContext]}>
      <ExerciseList
        workouts={workouts}
        day={day}
        workoutHistory={workoutHistory}
      />
    </ExercisesContext.Provider>
  );
}

export default ExerciseListContainer;
