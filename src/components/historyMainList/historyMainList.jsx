import React from "react";
import styles from "./historyMainList.module.css";
import HistoryExerciseGroup from "../historyExerciseGroup/historyExerciseGroup";

function HistoryMainList({ workout, date }) {
  const tableHeaderStyle = "";
  return (
    <div className="w-[80vw] md:w-full flex flex-col items-center justify-center">
      <h1>{date}</h1>
      <div className="w-full">
        <table className={`lg:w-3/4 w-full ${styles.table}`}>
          <thead>
            <tr className="md:text-3xl">
              <th className="font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4">Exercise</th>
              <th className="font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4">Set</th>
              <th className="font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4">Reps</th>
              <th className="font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4">Weight</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(workout.exercises).map((exercise) => (
              <HistoryExerciseGroup workout={workout} exercise={exercise} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryMainList;
