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

function WorkoutList({ workouts, day }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts[day];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select onValueChange={(value) => setSelect(value)}>
          <SelectTrigger className="w-[280px] text-3xl mb-4 md:mb-0">
            <SelectValue placeholder={select} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(workouts).map((name) => (
              <SelectItem value={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={styles.buttons}>
          <Button>
            <Link href="/workouts/add">Add Workout</Link>
          </Button>

          <Button>
            <Link href={`/workouts/${workouts[select].id}`}>Edit Workout</Link>
          </Button>
        </div>
      </div>
      {workoutForDay.rest ? (
        <div className="text-center">Today is a rest day</div>
      ) : (
        <div className={styles.workoutContainer}>
          <div className={styles.workoutHeader}>
            <h1>Workouts</h1>
            <h1>Sets</h1>
            <h1>Reps</h1>
            <h1>Weight</h1>
          </div>
          {workoutForDay.workouts.map((workout) => (
            <div key={workout.id}>
              <div className={styles.workouts}>
                <h1>{workout.name}</h1>
                <h1>{workout.sets}</h1>
                <h1>{workout.reps}</h1>
                <h1>{workout.weight}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
