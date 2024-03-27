import { getWorkout, getExercises } from "@/lib/data";
import React from "react";
import EditList from "@/components/editList/editList";

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  const exercises = await getExercises();
  return (
    <div>
      <h1 className="text-center my-10 text-5xl font-bold">{workout.name}</h1>
      <EditList workout={workout} exercises={exercises} />
    </div>
  );
}

export default SingleWorkoutPage;
