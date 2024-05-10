"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useEffect, useState } from "react";
import WorkoutDayTest from "@/components/workoutDayTest/workoutDayTest";
import { WorkoutContext, ExerciseContext } from "../autoUpdate/context";
import {
  addWorkout,
  validateWorkoutName,
  validateWorkoutDays,
} from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./workoutDaysContainer.module.css";

function WorkoutDaysContainer({ days, daysDict, title, exercises }) {
  const [workoutContext, setWorkoutContext] = useState(daysDict);
  const [exerciseContext, setExerciseContext] = useState(exercises);
  return (
    <ExerciseContext.Provider value={[exerciseContext, setExerciseContext]}>
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        <div className="flex flex-col items-center">
          <h1 className="text-center text-5xl font-semibold mb-5">{title}</h1>
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
              onClick={() => addWorkout(title, workoutContext, exerciseContext)}
              className="mt-6 bg-main hover:bg-main-foreground hover:text-foreground text-xl font-semibold p-7"
            >
              Submit Workout
            </Button>
          </Link>
        </div>
      </WorkoutContext.Provider>
    </ExerciseContext.Provider>
  );
}

export default WorkoutDaysContainer;
