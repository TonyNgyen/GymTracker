"use client";

import React, { useState } from "react";
import styles from "./displayDay.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DisplayExercise from "../displayExercise/displayExercise";
import { Button } from "../ui/button";

function DisplayDay({ workout, day, exercises }) {
  const [drop, setDrop] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <div className="flex">
            <h1 className="md:text-3xl text-2xl font-semibold">{day}</h1>
          </div>
          {drop ? (
            <Button className="bg-main text-background hover:bg-main-foreground hover:text-foreground font-extrabold text-lg" onClick={() => setDrop(!drop)}>
              <IoIosArrowUp />
            </Button>
          ) : (
            <Button
              className="bg-main text-background hover:bg-main-foreground hover:text-foreground font-extrabold text-lg"
              onClick={() => setDrop(!drop)}
            >
              <IoIosArrowDown />
            </Button>
          )}
        </div>
        {drop && (
          <div className={styles.workoutContainer}>
            <div className={`${styles.workoutHeader} md:text-3xl`}>
              <h1 className={styles.headers}>Exercise</h1>
              <h1 className={styles.headers}>Sets</h1>
              <h1 className={styles.headers}>Reps</h1>
              <h1 className={styles.headers}>Weight</h1>
            </div>
            {workout.workouts.map((exerciseID) => (
              <div key={exerciseID}>
                <DisplayExercise
                  exerciseID={exerciseID}
                  exercises={exercises}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayDay;
