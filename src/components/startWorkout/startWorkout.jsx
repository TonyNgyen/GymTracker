"use client";

import React, { useEffect, useState, useContext } from "react";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/utils";
import WorkoutTimer from "../workoutTimer/workoutTimer";
import StartExerciseList from "../startExerciseList/startExerciseList";
import {
  WorkoutContext,
  ExercisesContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";
import style from "./startWorkout.module.css";

function StartWorkout({ day }) {
  const { setItem, getItem } = useLocalStorage("Start");
  const [begin, setBegin] = useState("");
  const [pause, setPause] = useState(false);
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);
  useEffect(() => {
    setBegin(getItem());
  });
  return (
    <div className={style.startContainer}>
      <div className="flex flex-col w-fit items-center mx-auto mb-10">
        {!begin ? <h1>Ready to begin {workoutContext.name}?</h1> : ""}
        {begin ? <WorkoutTimer pause={pause} /> : ""}
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setItem(true);
              setBegin(true);
            }}
          >
            {begin ? "Begined" : "Begin Workout"}
          </Button>
          {!pause ? (
            <Button onClick={() => setPause(true)}>Pause</Button>
          ) : (
            <Button onClick={() => setPause(false)}>Resume</Button>
          )}
        </div>
      </div>
      <div>{begin && <StartExerciseList day={day} />}</div>
    </div>
  );
}

export default StartWorkout;
