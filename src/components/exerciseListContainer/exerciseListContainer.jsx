"use client";

import React, { useState } from "react";
import { ExercisesContext } from "./context";
import ExerciseList from "../exerciseList/exerciseList";

function ExerciseListContainer({ workouts, day, exercises }) {
  const [exercisesContext, setExercisesContext] = useState(exercises);

  return (
    <ExercisesContext.Provider value={[exercisesContext, setExercisesContext]}>
      <ExerciseList workouts={workouts} day={day}/>
    </ExercisesContext.Provider>
  );
}

export default ExerciseListContainer;
