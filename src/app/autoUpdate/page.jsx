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
import { WorkoutContext } from "./context";
import { addWorkout } from "@/lib/actions";
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

  const [context, setContext] = useState(daysDict);

  return (
    <WorkoutContext.Provider value={[context, setContext]}>
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
          <Button onClick={() => (console.log(context))}
            className="mt-6"
          >
          {/* onClick={() => addWorkout(id, title, context)} */}
            Submit Workout
          </Button>
        {/* </Link> */}
      </div>
    </WorkoutContext.Provider>
  );
}

export default autoUpdatePage;
