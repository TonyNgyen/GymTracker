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
          className={styles.select}
        >
          {Object.keys(workouts).map((name) => (
            <option key={name} className="text-white">
              {name}
            </option>
          ))}
        </select>
        <div className={styles.buttons}>
          <Link href="/workouts/add">
            <button className={styles.button}>
              Add Workout
            </button>
          </Link>
          <Link href={`/workouts/${workouts[select].id}`}>
            <button className={styles.button}>
              Edit Workout
            </button>
          </Link>
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
