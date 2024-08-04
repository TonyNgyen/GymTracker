import React from "react";
import styles from "./historyMainList.module.css";
import HistoryExerciseGroup from "../historyExerciseGroup/historyExerciseGroup";

function HistoryMainList({ workout, date }) {
  console.log(workout);
  return (
    <div className="text-center">
      <h1>{date}</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className="text-3xl">
              <th className={styles.tableHeader}>Exercise</th>
              <th className={styles.tableHeader}>Set</th>
              <th className={styles.tableHeader}>Reps</th>
              <th className={styles.tableHeader}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(workout.exercises).map((exercise) =>
              <HistoryExerciseGroup workout={workout} exercise={exercise} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryMainList;
