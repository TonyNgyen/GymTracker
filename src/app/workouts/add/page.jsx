"use client";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";

const daysDict = {
  Monday: { completed: false, workouts: [], rest: true },
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
  const [name, setName] = useState("");
  const [firstModal, setFirstModal] = useState(true);

  const nameSubmit = (e) => {
    e.preventDefault();
    setName(title);
    setFirstModal(false);
  };

  return (
    <div>
      {firstModal && (
        <div>
          <h1>What will be the name of the workout?</h1>
          <form onSubmit={nameSubmit}>
            <input
              type="text"
              name="title"
              id="title"
              className="text-black"
              placeholder="Workout name"
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
            {/* {days.map((day) => <WorkoutDay day={day} dict={daysDict[day]} />)} */}
            <WorkoutDay day={"Monday"} list={daysDict["Monday"]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPage;
