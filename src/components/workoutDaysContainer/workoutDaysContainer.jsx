"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover2";

import React, { useEffect, useState } from "react";
import WorkoutDayTest from "@/components/workoutDayTest/workoutDayTest";
import { WorkoutContext, ExerciseContext } from "../autoUpdate/context";
import { addWorkout } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./workoutDaysContainer.module.css";
import {
  format,
  addDays,
  differenceInCalendarDays,
  isAfter,
  isBefore,
  differenceInDays,
  subDays,
} from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { cn } from "@/lib/utils";

function WorkoutDaysContainer({ daysDict, title, exercises }) {
  const [workoutContext, setWorkoutContext] = useState(daysDict);
  const [exerciseContext, setExerciseContext] = useState(exercises);
  const [date, setDate] = useState();

  useEffect(() => {
    try {
      if (date) {
        let workoutWithDays = {};
        if (workoutContext[1].date.length == 1) {
          for (let key in workoutContext) {
            workoutWithDays[key] = workoutContext[key];
            workoutWithDays[key].date = addDays(date, key - 1);
          }
        } else {
          let difference = differenceInDays(date, workoutContext[1].date);
          if (isAfter(date, workoutContext[1].date)) {
            for (let key in workoutContext) {
              workoutWithDays[key] = workoutContext[key];
              workoutWithDays[key].date = addDays(
                workoutWithDays[key].date,
                difference
              );
            }
          }
          if (isBefore(date, workoutContext[1].date)) {
            for (let key in workoutContext) {
              workoutWithDays[key] = workoutContext[key];
              workoutWithDays[key].date = addDays(
                workoutWithDays[key].date,
                difference
              );
            }
          }
        }
        setWorkoutContext(workoutWithDays);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  return (
    <ExerciseContext.Provider value={[exerciseContext, setExerciseContext]}>
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        <div className="flex flex-col items-center">
          <h1 className="text-center text-5xl font-semibold mb-5">{title}</h1>
          <Carousel
            className="w-10/12 md:w-4/5"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="text-center">
              {Object.entries(workoutContext).map(([key, value]) => (
                <CarouselItem key={key}>
                  <WorkoutDayTest day={value.date} index={key} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Dialog className="">
            <DialogTrigger>
              <Button className="mt-6 bg-main hover:bg-main-foreground hover:text-foreground text-xl font-semibold p-6">
                Save Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 border-secondary-foreground rounded-lg md:w-3/12 bg-background border-2">
              <DialogHeader>
                <DialogTitle>Set Start Day</DialogTitle>
                <DialogDescription>
                  When will this workout start?
                </DialogDescription>
              </DialogHeader>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`justify-start text-left font-normal
                      ${!date && " text-muted-foreground"}`}
                  >
                    <FaCalendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date <=
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                </PopoverContent>
              </Popover>
              <DialogFooter>
                <Button
                  asChild
                  type="submit"
                  onClick={() =>
                    addWorkout(
                      title,
                      workoutContext,
                      exerciseContext,
                      format(date, "P")
                    )
                  }
                >
                  <Link href="/workouts">Save Workout</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </WorkoutContext.Provider>
    </ExerciseContext.Provider>
  );
}

export default WorkoutDaysContainer;
