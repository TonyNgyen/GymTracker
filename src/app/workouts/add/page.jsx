"use client";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";
import { WorkoutContext } from "./context";

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

  const nameSubmit = (e) => {
    e.preventDefault();
    setName(title);
    setFirstModal(false);
  };

  return (
    <WorkoutContext.Provider value={daysDict}>
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <button>Submit</button>
            </form>
          </div>
        )}
        {!firstModal && (
          <div>
            <h1 className="text-center text-3xl mb-5">{name}</h1>
            <div className="bg-red-200 w-5/6 mx-auto flex flex-col">
              {days.map((day) => (
                <WorkoutDay day={day} list={daysDict[day]} />
              ))}
            </div>
          </div>
        )}
      </div>
    </WorkoutContext.Provider>
  );
}

export default AddPage;
