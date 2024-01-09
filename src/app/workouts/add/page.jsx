"use client";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";
import { WorkoutContext } from "./context";
import { addWorkout } from "@/lib/actions";

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

  const creator = "Creator Placeholder"

  const nameSubmit = (e) => {
    e.preventDefault();
    setName(title);
    setFirstModal(false);
  };

  // const debug = (e) => {
  //   e.preventDefault();
  //   console.log(context);
  // };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   connectToDb();
  //   try {
  //     const newWorkout = new Workout({
  //       id: id,
  //       name: name,
  //       creator: "No Creator",
  //       workouts: context,
  //     });
  //     await newWorkout.save();
  //     console.log("saved to db");
  //   } catch (error) {
  //     console.log(error);
  //     return { error: "Something went wrong" };
  //   }
  // };

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
            <h1 className="text-center text-3xl mb-5">
              {name} | {id}
            </h1>
            <div className="w-5/6 mx-auto flex flex-col">
              {/* {days.map((day) => (
                <WorkoutDay day={day} list={daysDict[day]} />
              ))} */}
              <WorkoutDay day={"Monday"} list={daysDict["Monday"]} />
              <button onClick={() => addWorkout(id, name, creator, context)}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </WorkoutContext.Provider>
  );
}

export default AddPage;
