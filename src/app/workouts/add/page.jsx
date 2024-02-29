"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useState } from "react";
import WorkoutDay from "@/components/workoutDay/workoutDay";
import { WorkoutContext } from "./context";
import { addWorkout, validateWorkoutId } from "@/lib/actions";
import styles from "./add.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

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

function AddPage() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [context, setContext] = useState(daysDict);
  const [index, setIndex] = useState(0);
  const [state, formAction] = useFormState(validateWorkoutId, undefined);

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 6);
    }
    if (direction === "r") {
      setIndex(index !== 6 ? index + 1 : 0);
    }
  };

  return (
    <WorkoutContext.Provider value={[context, setContext]}>
      <div>
        {state?.success == undefined && (
          <div className="text-center">
            <h1 className="text-2xl">
              What will be the name and ID of the workout?
            </h1>
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
              <input
                type="text"
                name="id"
                id="id"
                className={styles.input}
                placeholder="Workout ID"
                onChange={(e) => setId(e.target.value)}
              />
              {state?.error != undefined ? (
                <h1 className={styles.error}>{state?.error}</h1>
              ) : (
                <></>
              )}
              <Button>Submit</Button>
            </form>
          </div>
        )}
        {state?.success != undefined && (
          <div>
            <h1 className="text-center text-4xl mb-2">{title}</h1>
            <h1 className="text-center text-md mb-8">{id}</h1>
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
                      <WorkoutDay day={day} list={daysDict[day]} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <Link href="/workouts">
                <Button
                  onClick={() => addWorkout(id, title, context)}
                  className="mt-6"
                >
                  Submit Workout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </WorkoutContext.Provider>
  );
}

export default AddPage;
