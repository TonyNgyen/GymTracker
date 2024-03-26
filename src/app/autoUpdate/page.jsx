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
import { addWorkout, addExercises } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function autoUpdatePage() {
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
  const [exerciseContext, setExerciseContext] = useState({});

  const add = () => {
    try {
      addWorkout("Test Workout", workoutContext);
      addExercises(exerciseContext);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExerciseContext.Provider value={[exerciseContext, setExerciseContext]}>
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        <div className="flex flex-col items-center">
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
          {/* <Link href="/workouts"> */}
          {/* <Button onClick={() => console.log(workoutContext)} className="mt-6"> */}
          <Button onClick={add} className="mt-6">
            Submit Workout
          </Button>
          {/* </Link> */}
        </div>
      </WorkoutContext.Provider>
    </ExerciseContext.Provider>
  );
}

export default autoUpdatePage;
