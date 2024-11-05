import React from "react";
import styles from "./historyMainList.module.css";
import HistoryExerciseGroup from "../historyExerciseGroup/historyExerciseGroup";

function HistoryMainList({ workout, date }) {
  const tableHeaderStyle =
    "font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4";
  return (
    <div className="w-[85vw] md:w-3/4 flex flex-col items-center justify-center">
      <table className={`lg:w-3/4 w-full ${styles.table}`}>
        <thead>
          <tr className="md:text-3xl">
            <th className={tableHeaderStyle}>Exercise</th>
            <th className={tableHeaderStyle}>Set</th>
            <th className={tableHeaderStyle}>Reps</th>
            <th className={tableHeaderStyle}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(workout.exercises).map((exercise) => (
            <HistoryExerciseGroup
              key={exercise}
              workout={workout}
              exercise={exercise}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryMainList;
