import React, { useContext } from "react";
import StartExercise from "../startExercise/startExercise";
import { CurrentExerciseContext } from "@/app/workouts/[slug]/start/context";

function StartExerciseContainer({ exercise, id, savedExercise }) {
  const [currentExerciseContext, setCurrentExerciseContext] = useContext(
    CurrentExerciseContext
  );
  return (
    <>
      <h1 className="text-3xl text-center mb-4">{exercise[1].name}</h1>
      {currentExerciseContext[id] > Object.keys(exercise).length ? (
        <h1>Exercise is Completed!</h1>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-scroll no-scrollbar">
        {Object.keys(exercise).map((set) => (
          <StartExercise set={exercise[set]} key={set} savedWeight={savedExercise.weight} />
        ))}
      </div>
    </>
  );
}

export default StartExerciseContainer;
