import styles from "./workoutSlider.module.css";
import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";

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

function WorkoutSlider() {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 6);
    }
    if (direction === "r") {
      setIndex(index !== 6 ? index + 1 : 0);
    }
  };

  console.log(index);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        Previous
      </button>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {days.map((day) => (
          <div className={styles.cardContainer} key={day}>
            <WorkoutDay day={day} list={daysDict[day]} />
          </div>
        ))}
      </div>
      <button
        className={styles.button}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        Next
      </button>
    </div>
  );
}

export default WorkoutSlider;
