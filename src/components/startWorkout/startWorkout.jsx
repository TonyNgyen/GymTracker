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
import Link from "next/link";
import { saveWorkoutHistory, changeCurrentWorkout } from "@/lib/actions";
import { useRouter } from "next/navigation";

function StartWorkout({ day }) {
  const {
    setItem: setStartItem,
    getItem: getStartItem,
    removeItem: removeStartItem,
  } = useLocalStorage("Start");
  const { getItem: getTimeItem, removeItem: removeTimeItem } =
    useLocalStorage("Time");
  const { removeItem: removeStartWorkoutItem } =
    useLocalStorage("StartWorkout");

  const router = useRouter();
  const [begin, setBegin] = useState("");
  const [pause, setPause] = useState(false);
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);

  const [time, setTime] = useState(0);

  useEffect(() => {
    setBegin(getStartItem());
  });

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => setTime(getTimeItem()), 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  const incrementCurrentWorkout = async () => {
    let newDay = workoutContext.currentWorkout;
    if (newDay === Object.keys(workoutContext.workouts).length) {
      newDay = 1;
    } else {
      newDay += 1;
    }
    try {
      await saveWorkoutHistory(startWorkoutContext, time);
      await changeCurrentWorkout(workoutContext.id, newDay);
      router.push("/workouts");
    } catch (error) {
      console.error("Error calling changeCurrentWorkout: ", error);
    }
  };

  return (
    <div className={style.startContainer}>
      <div className="flex flex-col w-fit items-center mx-auto mb-10">
        {!begin ? <h1>Ready to begin {workoutContext.name}?</h1> : ""}
        {begin ? <WorkoutTimer pause={pause} /> : ""}
        <div className="flex gap-3">
          {begin ? (
            !pause ? (
              <Button
                className="text-lg min-w-[105px]"
                onClick={() => setPause(true)}
              >
                Pause
              </Button>
            ) : (
              <Button
                className="text-lg min-w-[105px]"
                onClick={() => setPause(false)}
              >
                Resume
              </Button>
            )
          ) : (
            <></>
          )}
          {begin ? (
            <Button
              asChild
              className="text-lg min-w-[105px]"
              onClick={() => {
                removeStartItem();
                setPause(false);
                setBegin(false);
                removeTimeItem();
                removeStartWorkoutItem();
                incrementCurrentWorkout();
              }}
            >
              <h1 className="cursor-pointer">Finish</h1>
            </Button>
          ) : (
            <Button
              className="text-lg min-w-[105px]"
              onClick={() => {
                setStartItem(true);
                setBegin(true);
              }}
            >
              {begin ? "End" : "Begin Workout"}
            </Button>
          )}
        </div>
      </div>
      <div>{begin && <StartExerciseList day={day} />}</div>
    </div>
  );
}

export default StartWorkout;
