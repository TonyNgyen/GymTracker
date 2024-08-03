import React from "react";

function HistoryMainList({ workout, date }) {
  console.log(workout);
  return (
    <div className="text-center">
      {date}
      <table>
        <tr>
          <th>Exercise</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weight</th>
        </tr>
        {Object.keys(workout.exercises).map((exercise) => (
          <div>
            {Object.keys(workout.exercises[exercise]).map((set) => (
              <tr>{set}</tr>
            ))}
          </div>
        ))}
      </table>
    </div>
  );
}

export default HistoryMainList;
