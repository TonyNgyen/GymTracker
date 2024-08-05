import React, { useState } from "react";
import styles from "./historyExerciseGroup.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function HistoryExerciseGroup({ workout, exercise }) {
  const [drop, setDrop] = useState(false);
  return Object.keys(workout.exercises[exercise]).map((set) => (
    (set == 1 || drop) && (<>
      <tr
        key={`${exercise}-${set}`}
        className={`text-xl ${styles.tableRow} relative`}
      >
        <td className={`${styles.exerciseName}`}>
          {workout.exercises[exercise][set].name}
        </td>
        <td className={styles.middle}>{set}</td>
        <td className={styles.middle}>
          {workout.exercises[exercise][set].reps}
        </td>
        <td className={styles.weight}>
          {workout.exercises[exercise][set].weight}
        </td>
        {set == 1 && <h2 className={`absolute ml-6 cursor-pointer text-2xl ${styles.dropButton}`} onClick={() => setDrop(!drop)}>{drop ? <IoIosArrowUp /> : <IoIosArrowDown />}</h2>}
      </tr>
    </>)
  ));
}

export default HistoryExerciseGroup;
