"use client";

import React, { useEffect, useState, useContext } from "react";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/utils";
import WorkoutTimer from "../workoutTimer/workoutTimer";
import StartExerciseList from "../startExerciseList/startExerciseList";
import {
  WorkoutContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";
import style from "./startWorkout.module.css";
import {
  saveWorkoutHistory,
  changeCurrentWorkout,
  changeCurrentWorkoutRest,
  incrementStreak,
} from "@/lib/actions";
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
  const { removeItem: removeCurrentExerciseItem } =
    useLocalStorage("CurrentExercise");

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
      await incrementStreak();
      await saveWorkoutHistory(startWorkoutContext, time);
      if (workoutContext.workouts[newDay].rest) {
        await changeCurrentWorkoutRest(workoutContext.id, newDay);
      } else {
        await changeCurrentWorkout(workoutContext.id, newDay);
      }
      router.push("/workouts");
    } catch (error) {
      console.error("Error calling changeCurrentWorkout: ", error);
    }
  };

  return (
    <div className={style.startContainer}>
      <div className="flex flex-col w-fit items-center mx-auto mb-10">
        {!begin ? (
          <div className={`flex flex-col ${style.initialize} gap-10`}>
            <div className="text-4xl text-center leading-normal font-semibold">
              <h1>Ready to begin</h1>
              <h1>{workoutContext.name}?</h1>
            </div>
            <Button
              className="text-lg min-w-[105px]"
              onClick={() => {
                setStartItem(true);
                setBegin(true);
              }}
            >
              <h1>Begin</h1>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
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
                    removeCurrentExerciseItem();
                    removeStartItem();
                    removeTimeItem();
                    removeStartWorkoutItem();
                    incrementCurrentWorkout();
                  }}
                >
                  <h1 className="cursor-pointer">Finish</h1>
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      <div>{begin && <StartExerciseList day={day} />}</div>
    </div>
  );
}

export default StartWorkout;
