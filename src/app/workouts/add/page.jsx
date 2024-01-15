"use client";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";
import { WorkoutContext } from "./context";
import { addWorkout } from "@/lib/actions";
import styles from "./add.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";

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
  const [name, setName] = useState("");
  const [firstModal, setFirstModal] = useState(true);
  const [context, setContext] = useState(daysDict);
  const [index, setIndex] = useState(0);

  const creator = "Creator Placeholder";

  const nameSubmit = (e) => {
    e.preventDefault();
    setName(title);
    setFirstModal(false);
  };

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 6);
    }
    if (direction === "r") {
      setIndex(index !== 6 ? index + 1 : 0);
    }
  };

  return (
    <WorkoutContext.Provider value={[context, setContext]}>
      <div>
        {firstModal && (
          <div>
            <h1>What will be the name and ID of the workout?</h1>
            <form onSubmit={nameSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="title"
                id="title"
                className="text-black"
                placeholder="Workout name"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="id"
                id="id"
                className="text-black"
                placeholder="Workout ID"
                onChange={(e) => setId(e.target.value)}
              />
              <button>Submit</button>
            </form>
          </div>
        )}
        {!firstModal && (
          <div>
            <h1 className="text-center text-3xl mb-8">
              {name} | {id}
            </h1>
            <div className="flex">
              <button onClick={() => handleArrow("l")} className="text-7xl">
                <FaAngleLeft />
              </button>
              <div className="w-5/6 mx-auto flex flex-col">
                {days.map((day) => (
                  <div className={index === days.indexOf(day) ? "" : "hidden"}>
                    <WorkoutDay day={day} list={daysDict[day]} />
                  </div>
                ))}
                <Link href="/workouts">
                  <button
                    onClick={() => addWorkout(id, name, creator, context)}
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
