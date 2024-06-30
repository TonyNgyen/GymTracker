import React from "react";
import StartExercise from "../startExercise/startExercise";

function StartExerciseContainer({ exercise }) {
  const sets = [];
  console.log(exercise)
  for (let i = 0; i < exercise.sets; i++) {
    sets.push({id: i, reps: exercise.reps, weight: exercise.weight});
  }
  return (
    <>
      <h1 className="text-3xl text-center mb-4">{exercise.name}</h1>
      <div className="flex flex-col gap-3">
        {sets.map((set) => (
          <StartExercise set={set} key={set.id} />
        ))}
      </div>
    </>
  );
}

export default StartExerciseContainer;
