import { getWorkout, getUserExercises } from "@/lib/data";
import React from "react";
import EditList from "@/components/editList/editList";
import { auth } from "@/lib/auth";
import DisplayWorkout from "@/components/displayList/displayList";

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const session = await auth();
  const userEmail = session.user?.email;
  const workout = await getWorkout(slug);
  const exercises = await getUserExercises(workout.creator);
  return (
    <div>
      {workout.creator === userEmail ? (
        <div>
          <h1 className="text-center my-10 text-5xl font-bold">
            {workout.name}
          </h1>
          <EditList workout={workout} exercises={exercises} />
        </div>
      ) : (
        <DisplayWorkout workout={workout} exercises={exercises} />
      )}
    </div>
  );
}

export default SingleWorkoutPage;
