"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "./exerciseList.module.css";
import { Button } from "../ui/button";
import { ExercisesContext } from "../exerciseListContainer/context";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselAPI,
} from "@/components/ui/carousel";

import MainExercise from "../mainExercise/mainExercise";
import HistoryMainList from "../historyMainList/historyMainList";

function ExerciseList({ workouts, day, workoutHistory }) {
  const [api, setApi] = useState(CarouselAPI);
  const [currentDate, setCurrentDate] = useState(undefined);
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const workoutForDay =
    workouts[select].workouts[workouts[select].currentWorkout];
  const date = format(new Date(), "P");
  if (!(date in workoutHistory)) {
    workoutHistory[date] = undefined;
  }

  const convertedExercises = [];
  if (workoutForDay != undefined) {
    workoutForDay.workouts.map((id) => {
      convertedExercises.push(exercisesContext[id]);
    });
  } else {
    for (let day in workouts[select].workouts) {
      console.log(day);
    }
  }

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentDate(Object.keys(workoutHistory)[api.selectedScrollSnap()]);
    api.on("select", () => {
      setCurrentDate(Object.keys(workoutHistory)[api.selectedScrollSnap()]);
    });
    console.log(workoutHistory);
  }, [currentDate, api]);
  console.log(currentDate);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select
          onValueChange={(value) => setSelect(value)}
          className="text-center"
        >
          <SelectTrigger className="w-[280px] text-4xl mb-4 md:mb-0 border-transparent">
            <SelectValue placeholder={workouts[select].name} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(workouts).map((id) => (
              <SelectItem value={id} key={id}>
                {workouts[id].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={styles.buttons}>
          <Button
            asChild
            className="bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground text-lg min-w-[76px]"
          >
            <Link href={`/workouts/${workouts[select].id}/start`}>Start</Link>
          </Button>

          <Button
            asChild
            className="bg-main hover:bg-main-foreground hover:text-foreground text-lg min-w-[76px]"
          >
            <Link href="/workouts/add">Add</Link>
          </Button>

          <Button asChild className="text-lg min-w-[76px]">
            <Link href={`/workouts/${workouts[select].id}`}>Edit</Link>
          </Button>
        </div>
      </div>
      {workoutForDay !== undefined ? (
        <>
          <Carousel
            className="my-5 w-9/12 md:w-6/12 lg:w-4/12"
            opts={{
              align: "center",
              startIndex: Object.keys(workoutHistory).length - 1,
            }}
            setApi={setApi}
          >
            <CarouselContent className="text-center text-3xl font-semibold">
              {Object.keys(workoutHistory).map((date) => (
                <CarouselItem key={date}>
                  <div className="">
                    <span className="">{date}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {workoutForDay.rest ? (
            <div className="text-center">Today is a rest day</div>
          ) : currentDate != date && currentDate != undefined ? (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            ></HistoryMainList>
          ) : workoutHistory[date] == undefined ? (
            <div className={styles.workoutContainer}>
              <div className={`${styles.workoutHeader} text-3xl`}>
                <h1 className={styles.headers}>Exercise</h1>
                <h1 className={styles.headers}>Sets</h1>
                <h1 className={styles.headers}>Reps</h1>
                <h1 className={styles.headers}>Weight</h1>
              </div>
              {convertedExercises.map((exercise) => (
                <div key={exercise.id}>
                  <MainExercise exercise={exercise} />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>There seems to be an error</div>
      )}
    </div>
  );
}

export default ExerciseList;
