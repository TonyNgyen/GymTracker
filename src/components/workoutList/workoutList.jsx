"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./workoutList.module.css";

function WorkoutList({ workouts, day }) {
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts[day];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select
          onChange={(e) => setSelect(e.target.value)}
          className="text-4xl text-black"
        >
          {Object.keys(workouts).map((name) => (
            <option key={name} className="text-black">
              {name}
            </option>
          ))}
        </select>
        <Link
          href="/workouts/add"
          className="py-2 px-4 bg-white text-black rounded-full"
        >
          Add Workout
        </Link>
        {/* <Link
          href={`/workouts/${workouts[select].id}`}
          className="py-2 px-4 bg-white text-black rounded-full"
        >
          Edit Workout
        </Link> */}
      </div>
      {workoutForDay.rest ? (
        <div>Today is a rest day</div>
      ) : (
        <div className={styles.workoutContainer}>
          <div className={styles.workoutHeader + " text-2xl font-bold"}>
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
