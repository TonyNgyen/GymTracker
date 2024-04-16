"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./workoutList.module.css";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function WorkoutList({ workouts, day, exercises }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts["Monday"];

  const convertedExercises = [];

  workoutForDay.workouts.map(id => {
    exercises.map(exercise => {
      if (id == exercise.id) {
        convertedExercises.push(exercise);
      }
    })
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select onValueChange={(value) => setSelect(value)}>
          <SelectTrigger className="w-[280px] text-4xl mb-4 md:mb-0 border-transparent">
            <SelectValue placeholder={select} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(workouts).map((name) => (
              <SelectItem value={name} key={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={styles.buttons}>
          <Button className="bg-main hover:bg-main-foreground hover:text-foreground text-lg">
            <Link href="/workouts/add">Add Workout</Link>
          </Button>

          <Button className="text-lg">
            <Link href={`/workouts/${workouts[select].id}`}>Edit Workout</Link>
          </Button>
        </div>
      </div>
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
          {convertedExercises.map((workout) => (
            <div key={workout.id}>
              <div className={`${styles.workouts} text-xl`}>
                <h1 className={styles.stats}>{workout.name}</h1>
                <h1 className={styles.stats}>{workout.sets}</h1>
                <h1 className={styles.stats}>{workout.reps}</h1>
                <h1 className={styles.stats}>{workout.weight}</h1>
                <Button className={styles.edit}>Edit</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
