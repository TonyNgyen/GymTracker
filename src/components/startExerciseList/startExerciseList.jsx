"use client";

import React, { useContext } from "react";
import {
  WorkoutContext,
  ExercisesContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";
import { convertExercises } from "@/lib/utils";
import StartExercise from "../startExercise/startExercise";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StartExerciseContainer from "../startExerciseContainer/startExerciseContainer";

function StartExerciseList({ day }) {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);
  // Object.keys(startWorkoutContext).map((key) => (
  //   console.log(key)
  // ))
  console.log(startWorkoutContext);
  return (
    <div className="">
      <Carousel className="mx-auto w-10/12 md:w-6/12">
        <CarouselContent>
          {Object.keys(startWorkoutContext).map((key) => (
            <CarouselItem key={key}>
              <StartExerciseContainer
                exercise={startWorkoutContext[key]}
                savedExercise={exercisesContext[key]}
                id={key}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default StartExerciseList;
