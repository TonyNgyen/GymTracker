"use client";

import React, { useEffect, useState } from "react";
import {
  validateWorkoutName,
  validateWorkoutDays,
} from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import styles from "./autoUpdate.module.css";
import WorkoutDaysContainer from "../workoutDaysContainer/workoutDaysContainer";

function AutoUpdate({ exercises }) {
  const [daysDict, setDaysDict] = useState({});
  const [nameState, nameFormAction] = useFormState(
    validateWorkoutName,
    undefined
  );
  const [dayState, dayFormAction] = useFormState(
    validateWorkoutDays,
    undefined
  );
  const [daysNeeded, setDaysNeeded] = useState(0);
  const [title, setTitle] = useState("");

  const [days, setDays] = useState([]);

  useEffect(() => {
    if (daysNeeded > 0) {
      const newDaysDict = {};
      const newDays = [];
      for (let i = 1; i <= daysNeeded; i++) {
        newDaysDict[i] = { completed: false, workouts: [], rest: false, date: i.toString() };
        newDays.push(i);
      }
      setDaysDict(newDaysDict);
      setDays(newDays);
    }
  }, [daysNeeded]);

  return (
    <>
      {nameState?.success == undefined && (
        <div className="text-center">
          <h1 className="text-5xl font-semibold mb-12">
            What will be the name of the workout?
          </h1>
          <form
            action={nameFormAction}
            className="flex flex-col gap-5 items-center"
          >
            <input
              type="text"
              name="title"
              id="title"
              className={styles.input}
              placeholder="Workout name"
              onChange={(e) => setTitle(e.target.value)}
            />
            {nameState?.error != undefined ? (
              <h1 className={styles.error}>{nameState?.error}</h1>
            ) : (
              <></>
            )}
            <Button
              className="text-xl py-6 px-5 bg-main hover:bg-main-foreground hover:text-foreground"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      )}

      {nameState?.success != undefined && dayState?.success == undefined && (
        <div className="text-center">
          <h1 className="text-5xl font-semibold mb-4">
            How many days are needed for {title}?
          </h1>
          <h1 className="mb-12 text-2xl">(including rest days)</h1>
          <form
            action={dayFormAction}
            className="flex flex-col gap-5 items-center"
          >
            <input
              type="number"
              name="numOfDays"
              id="numOfDays"
              className={styles.input}
              placeholder="Number of Days"
              onChange={(e) => setDaysNeeded(e.target.value)}
            />
            {dayState?.error != undefined ? (
              <h1 className={styles.error}>{dayState?.error}</h1>
            ) : (
              <></>
            )}
            <Button
              className="text-xl py-6 px-5 bg-main hover:bg-main-foreground hover:text-foreground"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      )}

      {nameState?.success != undefined && dayState?.success != undefined && (
        <WorkoutDaysContainer days={days} daysDict={daysDict} title={title} exercises={exercises} />
      )}
    </>
  );
}

export default AutoUpdate;
