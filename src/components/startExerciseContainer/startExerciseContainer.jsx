import React from "react";
import StartExercise from "../startExercise/startExercise";

function StartExerciseContainer({ exercise }) {
  return (
    <>
      <h1 className="text-3xl text-center mb-4">{exercise[1].name}</h1>
      <div className="flex flex-col gap-3">
        {Object.keys(exercise).map((set) => (
          <StartExercise set={exercise[set]} key={set} />
        ))}
      </div>
    </>
  );
}

export default StartExerciseContainer;
