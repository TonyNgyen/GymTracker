import React from "react";
import styles from "./historyMainList.module.css";

function HistoryMainList({ workout, date }) {
  console.log(workout);
  return (
    <div className="text-center">
      {date}
      <table>
        <thead>
          <tr className="text-3xl">
            <th className={styles.tableHeader}>Exercise</th>
            <th className={styles.tableHeader}>Sets</th>
            <th className={styles.tableHeader}>Reps</th>
            <th className={styles.tableHeader}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(workout.exercises).map((exercise) =>
            Object.keys(workout.exercises[exercise]).map((set) => (
              <tr key={`${exercise}-${set}`} className={`text-xl ${styles.tableRow}`}>
                <td className={`${styles.exerciseName}`}>{workout.exercises[exercise][set].name}</td>
                <td className={styles.tableData}>{set}</td>
                <td className={styles.tableData}>{workout.exercises[exercise][set].reps}</td>
                <td className={styles.tableData}>{workout.exercises[exercise][set].weight}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryMainList;