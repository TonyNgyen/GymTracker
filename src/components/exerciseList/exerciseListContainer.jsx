"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./workoutList.module.css";
import { Button } from "../ui/button";
import { ExercisesContext } from "./context";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainExercise from "../mainExercise/mainExercise";
import ExerciseList from "./exerciseList";

function ExerciseListContainer({ workouts, day, exercises }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts["Monday"];
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
      <ExerciseList workouts={workouts}/>
    </ExercisesContext.Provider>
  );
}

export default ExerciseListContainer;
