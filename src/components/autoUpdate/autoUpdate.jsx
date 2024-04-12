"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useState } from "react";
import WorkoutDayTest from "@/components/workoutDayTest/workoutDayTest";
import { WorkoutContext, ExerciseContext } from "./context";
import { addWorkout, validateWorkoutId } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./autoUpdate.module.css";

function AutoUpdate({ exercises }) {
  const daysDict = {
    Monday: { completed: false, workouts: [], rest: false },
    Tuesday: { completed: false, workouts: [], rest: false },
    Wednesday: { completed: false, workouts: [], rest: false },
    Thursday: { completed: false, workouts: [], rest: false },
    Friday: { completed: false, workouts: [], rest: false },
    Saturday: { completed: false, workouts: [], rest: false },
    Sunday: { completed: false, workouts: [], rest: false },
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [workoutContext, setWorkoutContext] = useState(daysDict);
  const [exerciseContext, setExerciseContext] = useState(exercises);
  const [state, formAction] = useFormState(validateWorkoutId, undefined);
  const [title, setTitle] = useState("");
  console.log(state);

  return (
    <ExerciseContext.Provider value={[exerciseContext, setExerciseContext]}>
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        {state?.success == undefined && (
          <div className="text-center">
            <h1 className="text-2xl">What will be the name of the workout?</h1>
            <form
              action={formAction}
              className="flex flex-col gap-5 items-center"
            >
              <input
                type="text"
                name="title"
                id="title"
                className={styles.input}
                placeholder="Workout name"
                onChange={(e) => setTitle(e.target.value)}
              />
              {state?.error != undefined ? (
                <h1 className={styles.error}>{state?.error}</h1>
              ) : (
                <></>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </div>
        )}
        {state?.success != undefined && (
          <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl mb-5">{title}</h1>
            <Carousel
              className="flex w-10/12 md:w-4/5"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="text-center">
                {days.map((day) => (
                  <CarouselItem key={day}>
                    <WorkoutDayTest day={day} list={daysDict[day]} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Link href="/workouts">
              <Button
                onClick={() =>
                  addWorkout(title, workoutContext, exerciseContext)
                }
                className="mt-6"
              >
                Submit Workout
              </Button>
            </Link>
          </div>
        )}
      </WorkoutContext.Provider>
    </ExerciseContext.Provider>
  );
}

export default AutoUpdate;
