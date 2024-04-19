"use client"

import React, { useState } from "react";
import styles from "./displayDay.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function DisplayDay({ workout, day }) {
  const [drop, setDrop] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <div className="flex">
            <h1 className={styles.dayHeader}>{day}</h1>
          </div>
          {drop ? (
            <button onClick={() => setDrop(!drop)}>
              <IoIosArrowUp />
            </button>
          ) : (
            <button onClick={() => setDrop(!drop)}>
              <IoIosArrowDown />
            </button>
          )}
        </div>
        {drop && (
          <div className={styles.workoutContainer}>
            <div className={styles.workoutHeader}>
              <h1 className={styles.empty}></h1>
              <h1 className={styles.headers}>Workouts</h1>
              <h1 className={styles.headers}>Sets</h1>
              <h1 className={styles.headers}>Reps</h1>
              <h1 className={styles.headers}>Weight</h1>
              <button
                className={styles.add + " text-2xl font-bold"}
                onClick={toggle}
              >
                +
              </button>
            </div>
            {workoutContext.workouts[day].workouts.map((exercise) => (
              <div key={exercise}>
                <EditExercise exerciseID={exercise} day={day} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayDay;
