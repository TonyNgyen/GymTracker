"use client";

import React, { useContext } from "react";
import {
  WorkoutContext,
  ExercisesContext,
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

function StartExerciseList({ day }) {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  let convertedExercises = convertExercises(
    workoutContext.workouts[day].workouts,
    exercisesContext
  );
  return (
    <div className="m-2">
      <Carousel>
        <CarouselContent>
          {convertedExercises.map((exercise) => (
            <CarouselItem>
              <StartExercise exercise={exercise} />
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