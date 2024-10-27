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
              set == 1 ? "bg-cardBG" : "bg-cardBG-foreground"
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
            <td className="">
              {set == 1 && (
                <h2
                  className={``}
                  onClick={() => setDrop(!drop)}
                >
                  {drop ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </h2>
              )}
            </td>
          </tr>
        </>
      )
  );
}

export default HistoryExerciseGroup;
