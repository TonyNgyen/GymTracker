import React, { useState } from "react";
import styles from "./historyExerciseGroup.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function HistoryExerciseGroup({ workout, exercise }) {
  const [drop, setDrop] = useState(false);
  return Object.keys(workout.exercises[exercise]).map(
    (set) =>
      (set == 1 || drop) && (
        <>
          <tr
            key={`${exercise}-${set}`}
            className={`text-xl ${styles.tableRow} relative ${
              (set == 1 && !workout.exercises[exercise][set].completed) ? "dark:bg-red-600 dark:bg-opacity-50 bg-red-300" : !workout.exercises[exercise][set].completed ? "dark:bg-red-950 bg-red-100" : set == 1 ? "bg-cardBG" : "bg-cardBG-foreground"
            }`}
          >
            <td className={`md:pl-[4.2rem] pl-7 w-36 ${styles.exerciseName}`}>
              {workout.exercises[exercise][set].name}
            </td>
            <td className={styles.middle}>{set}</td>
            <td className={styles.middle}>
              {workout.exercises[exercise][set].reps}
            </td>
            <td className={styles.weight}>
              {workout.exercises[exercise][set].weight}
            </td>
            {/* <td className="bg-background pl-1 md:pl-4">
              {set == 1 && (
                <button
                  className={`text-2xl`}
                  onClick={() => setDrop(!drop)}
                >
                  {drop ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              )}
            </td> */}
            <div className="relative">
              {set == 1 && (
                <h2
                  className={`absolute ml-4 md:ml-6 cursor-pointer text-2xl ${styles.dropButton}`}
                  onClick={() => setDrop(!drop)}
                >
                  {drop ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </h2>
              )}
            </div>
          </tr>
        </>
      )
  );
}

export default HistoryExerciseGroup;
