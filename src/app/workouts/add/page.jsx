"use client";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";
import { WorkoutContext } from "./context";
import { addWorkout, validateWorkoutId } from "@/lib/actions";
import styles from "./add.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const daysDict = {
  Monday: { completed: false, workouts: [], rest: false },
  Tuesday: { completed: false, workouts: [], rest: false },
  Wednesday: { completed: false, workouts: [], rest: false },
  Thursday: { completed: false, workouts: [], rest: false },
  Friday: { completed: false, workouts: [], rest: false },
  Saturday: { completed: false, workouts: [], rest: false },
  Sunday: { completed: false, workouts: [], rest: false },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function AddPage() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  // const [name, setName] = useState("");
  const [context, setContext] = useState(daysDict);
  const [index, setIndex] = useState(0);
  const [state, formAction] = useFormState(validateWorkoutId, undefined);

  // const nameSubmit = (e) => {
  //   e.preventDefault();
  //   if (state?.error == undefined) {
  //     setName(title);
  //     setFirstModal(false);
  //   }
  // };

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 6);
    }
    if (direction === "r") {
      setIndex(index !== 6 ? index + 1 : 0);
    }
  };

  console.log(state?.error != undefined)

  return (
    <WorkoutContext.Provider value={[context, setContext]}>
      <div>
        {state?.success == undefined && (
          <div className="text-center">
            <h1 className="text-2xl">What will be the name and ID of the workout?</h1>
            <form action={formAction} className="flex flex-col gap-5 items-center">
              <input
                type="text"
                name="title"
                id="title"
                className={styles.input}
                placeholder="Workout name"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="id"
                id="id"
                className={styles.input}
                placeholder="Workout ID"
                onChange={(e) => setId(e.target.value)}
              />
              {state?.error != undefined ? <h1 className={styles.error}>{state?.error}</h1> : <></>}
              <button className={styles.submit}>Submit</button>
            </form>
          </div>
        )}
        {state?.success != undefined && (
          <div>
            <h1 className="text-center text-3xl mb-8">
              {title} | {id}
            </h1>
            <div className="flex">
              <button onClick={() => handleArrow("l")} className="text-7xl">
                <FaAngleLeft />
              </button>
              <div className="w-5/6 text-center">
                {days.map((day) => (
                  <div className={index === days.indexOf(day) ? "" : "hidden"}>
                    <WorkoutDay day={day} list={daysDict[day]} />
                  </div>
                ))}
                <Link href="/workouts">
                  <button
                    onClick={() => addWorkout(id, title, context)}
                    className={styles.button}
                  >
                    Submit Workout
                  </button>
                </Link>
              </div>
              <button onClick={() => handleArrow("r")} className="text-7xl">
                <FaAngleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </WorkoutContext.Provider>
  );
}

export default AddPage;
