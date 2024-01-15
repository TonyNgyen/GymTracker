"use client";

import React, { useState } from "react";

function WorkoutList({ workouts, day }) {
  const [select, setSelect] = useState(workouts[0]);
  return (
    <div>
      <select
        onChange={(e) => setSelect(e.target.value)}
        className="text-4xl text-black"
      >
        {workouts.map((workout) => (
          <option key="1" className="text-black">{workout.name}</option>
        ))}
      </select>
      {select}
    </div>
  );
}

export default WorkoutList;
