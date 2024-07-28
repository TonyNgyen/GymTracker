"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "./exerciseList.module.css";
import { Button } from "../ui/button";
import { ExercisesContext } from "../exerciseListContainer/context";
import { format } from "date-fns";

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

function ExerciseList({ workouts, day }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const workoutForDay =
    workouts[select].workouts[workouts[select].currentWorkout];
  const date = format(new Date(), "P");

  const convertedExercises = [];
  if (workoutForDay != undefined) {
    workoutForDay.workouts.map((id) => {
      convertedExercises.push(exercisesContext[id]);
    });
  } else {
    for (let day in workouts[select].workouts) {
      console.log(day);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select onValueChange={(value) => setSelect(value)}>
          <SelectTrigger className="w-[280px] text-4xl mb-4 md:mb-0 border-transparent">
            <SelectValue placeholder={workouts[select].name} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(workouts).map((id) => (
              <SelectItem value={id} key={id}>
                {workouts[id].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={styles.buttons}>
          <Button
            asChild
            className="bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground text-lg min-w-[76px]"
          >
            <Link href={`/workouts/${workouts[select].id}/start`}>Start</Link>
          </Button>

          <Button
            asChild
            className="bg-main hover:bg-main-foreground hover:text-foreground text-lg min-w-[76px]"
          >
            <Link href="/workouts/add">Add</Link>
          </Button>

          <Button asChild className="text-lg min-w-[76px]">
            <Link href={`/workouts/${workouts[select].id}`}>Edit</Link>
          </Button>
        </div>
      </div>
      {workoutForDay !== undefined ? (
        <>
          <h1 className="text-center my-5 text-3xl font-semibold">{date}</h1>
          {workoutForDay.rest ? (
            <div className="text-center">Today is a rest day</div>
          ) : (
            <div className={styles.workoutContainer}>
              <div className={`${styles.workoutHeader} text-3xl`}>
                <h1 className={styles.headers}>Exercise</h1>
                <h1 className={styles.headers}>Sets</h1>
                <h1 className={styles.headers}>Reps</h1>
                <h1 className={styles.headers}>Weight</h1>
              </div>
              {convertedExercises.map((exercise) => (
                <div key={exercise.id}>
                  <MainExercise exercise={exercise} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>There seems to be an error</div>
      )}
    </div>
  );
}

export default ExerciseList;
