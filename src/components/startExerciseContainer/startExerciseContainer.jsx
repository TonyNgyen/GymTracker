import React from "react";
import StartExercise from "../startExercise/startExercise";

function StartExerciseContainer({ exercise }) {
  const rows = [];
  for (let i = 0; i < exercise.sets; i++) {
    rows.push(i);
  }
  return (
    <div>
      <h1 className="text-3xl text-center mb-4">{exercise.name}</h1>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <StartExercise exercise={exercise} key={row} />
        ))}
      </div>
    </div>
  );
}

export default StartExerciseContainer;
