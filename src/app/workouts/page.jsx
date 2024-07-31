"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ExerciseListContainer from "@/components/exerciseListContainer/exerciseListContainer";
import { getWorkouts, getExercises, getWorkoutHistory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

async function WorkoutsPage() {
  const [workouts, setWorkouts] = useState();
  const [exercises, setExercises] = useState();
  const [workoutHistory, setWorkoutHistory] = useState();
  const [loading, setLoading] = useState(true);
  const day = format(new Date(), "P");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchWorkouts = await getWorkouts();
        const fetchExercies = await getExercises();
        const fetchHistory = await getWorkoutHistory();
        console.log(fetchWorkouts.ok);
        setWorkouts(fetchWorkouts);
        setExercises(fetchExercies);
        setWorkoutHistory(fetchHistory);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div></div>;
  }
  return (
    <div>
      {workouts === undefined || !Object.keys(workouts).length ? (
        <div className="flex flex-col items-center">
          <section className="p-10 flex justify-center w-1/2 mx-auto rounded-md">
            <h1 className="text-5xl text-center leading-snug">
              There are no workouts to display
            </h1>
          </section>
          <Button
            asChild
            className="bg-main text-background text-lg px-6 py-6 hover:bg-main-foreground hover:text-foreground"
          >
            <Link href="/workouts/add">Add Workout</Link>
          </Button>
        </div>
      ) : (
        <ExerciseListContainer
          workouts={workouts}
          day={day}
          exercises={exercises}
          workoutHistory={workoutHistory}
        />
      )}
    </div>
  );
}

export default WorkoutsPage;
