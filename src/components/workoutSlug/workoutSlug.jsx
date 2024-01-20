"use client";

import React, { useState } from "react";
import styles from "./workoutSlug.module.css";
import Link from "next/link";

{
  /* {day} | {workouts[day].completed ? "True" : "False"} |{" "}
        {workouts[day].rest ? "Rest" : "Workout"} */
}

function WorkoutSlug({ workouts, day }) {
  const dayWorkouts = workouts[day].workouts;
  const [drop, setDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editWorkout, setEdtiWorkout] = useState("");

  const editSelect = {
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <h1 className="text-2xl">{day}</h1>
          <button onClick={() => setDrop(!drop)}>Toggle</button>
        </div>
        {drop && (
          <div className={styles.workoutContainer}>
            <div className={styles.workoutHeader + " text-2xl font-bold"}>
              <h1 className={styles.empty}></h1>
              <h1 className={styles.headers}>Workouts</h1>
              <h1 className={styles.headers}>Sets</h1>
              <h1 className={styles.headers}>Reps</h1>
              <h1 className={styles.headers}>Weight</h1>
            </div>
            {dayWorkouts.map((workout) => (
              <div key={workout.id}>
                <div className={styles.workouts}>
                  <button onClick={() => setEdit(!edit)} className={styles.edit}>Edit</button>
                  <h1 className={styles.stats}>{workout.name}</h1>
                  <h1 className={styles.stats}>{workout.sets}</h1>
                  <h1 className={styles.stats}>{workout.reps}</h1>
                  <h1 className={styles.stats}>{workout.weight}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutSlug;
