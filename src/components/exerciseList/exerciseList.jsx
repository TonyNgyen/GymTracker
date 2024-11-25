"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "./exerciseList.module.css";
import { Button } from "../ui/button";
import { ExercisesContext } from "../exerciseListContainer/context";
import { format, compareAsc, add } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import MainExercise from "../mainExercise/mainExercise";
import HistoryMainList from "../historyMainList/historyMainList";
import {
  incrementStreak,
  resetStreak,
  saveRestDay,
  workoutHomepageChangeDay,
  workoutHomepageChangeToRest,
} from "@/lib/actions";
import { getUser } from "@/lib/data";

function ExerciseList({ workouts, day, workoutHistory }) {
  const tableHeaderStyle =
    "font-semibold lg:px-16 lg:py-4 md:px-12 md:py-4 sm:px-4 sm:py-4";
  const [api, setApi] = useState();
  const [currentDate, setCurrentDate] = useState(day);
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [workoutForDay, setWorkoutForDay] = useState(
    workouts[select].workouts[workouts[select].currentWorkout]
  );
  const date = format(new Date(), "P");
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

  const incrementDay = async () => {
    let newDay = workouts[select].currentWorkout;
    if (newDay === Object.keys(workouts[select].workouts).length) {
      newDay = 1;
    } else {
      newDay += 1;
    }
    // if next day is a rest day
    if (workouts[select].workouts[newDay].rest) {
      console.log("HERE 1");
      await workoutHomepageChangeToRest(workouts[select].id, newDay);
      workouts[select].currentWorkout = newDay;
      workouts[select].restDay = date;
    } else {
      // if next day is not a rest day
      console.log("HERE 2");
      await workoutHomepageChangeDay(workouts[select].id, newDay);
      workouts[select].currentWorkout = newDay;
      workouts[select].restDay = "undefined";
    }
    setWorkoutForDay(workouts[select].workouts[newDay]);
  };

  useEffect(() => {
    if (workoutHistory[date] == undefined) {
      workoutHistory[date] = undefined;
    }
  });

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentDate(Object.keys(workoutHistory)[api.selectedScrollSnap()]);
    api.on("select", () => {
      setCurrentDate(Object.keys(workoutHistory)[api.selectedScrollSnap()]);
    });
  }, [currentDate, api]);

  useEffect(() => {
    const checkRestDay = async () => {
      const user = await getUser();
      if (user["lastWorkout"] != select) {
        return;
      }
      // // today is not rest day
      // if (workouts[select].restDay == "undefined") {
      //   console.log("Working 2");
      //   return;
      // }
      // console.log("Working 2");
      // // if rest day is today
      // if (workouts[select].restDay == date) {
      //   return;
      // }
      // check if current date is after dateLast and current date is not in workout history and implies that last day was a rest day
      if (
        compareAsc(date, workouts[select].dateLast) != -1 &&
        Object.keys(workoutHistory)[Object.keys(workoutHistory).length - 1] !=
          date
      ) {
        // Checks if current date is after restDay date
        if (compareAsc(date, workouts[select].restDay) == 1) {
          try {
            if (
              date != format(add(workouts[select].restDay, { days: 1 }), "P")
            ) {
              console.log("RESET");
              await resetStreak();
            } else {
              console.log("INCREMENT");
              await incrementStreak();
            }
            await saveRestDay({}, -2, workouts[select].restDay);
            incrementDay();
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    checkRestDay();
  }, [select]);

  useEffect(() => {
    setWorkoutForDay(
      workouts[select].workouts[workouts[select].currentWorkout]
    );
  }, [select]);

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
          {workoutHistory[date] == undefined &&
          compareAsc(workouts[select].dateCreated, date) != 1 &&
          workouts[select].restDay != date ? (
            <Button
              asChild
              className="bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground text-lg min-w-[76px]"
            >
              <Link href={`/workouts/${workouts[select].id}/start`}>Start</Link>
            </Button>
          ) : (
            <Button className="bg-greenConfirm hover:bg-greenConfirm text-lg min-w-[76px] dark:opacity-50 brightness-75 cursor-default">
              Start
            </Button>
          )}

          <Button
            asChild
            className="text-lg min-w-[76px] bg-main hover:bg-main-foreground hover:text-foreground"
          >
            <Link href={`/workouts/${workouts[select].id}`}>Edit</Link>
          </Button>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button>
                  <BsThreeDotsVertical
                    className={`text-4xl dark:text-gray-300 text-gray-500 absolute ${styles.moreOptions}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>More Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger>
                  <DropdownMenuItem>Skip Day</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>
                  <a href="/workouts/add">Add New Workout</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="w-[80vw] rounded-md">
              <DialogHeader>
                <DialogTitle>Skip Day</DialogTitle>
                <DialogDescription>
                  Do you want to skip this workout?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row justify-center gap-2 font-bold">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="min-w-28"
                  >
                    Don&apos;t Skip
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="min-w-28 bg-main text-background font-bold"
                    onClick={() => incrementDay()}
                  >
                    Skip
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          {compareAsc(workouts[select].dateCreated, date) == 1 &&
          currentDate == date ? (
            <>This workout starts on {workouts[select].dateCreated}</>
          ) : workoutHistory[date] != undefined ? (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            />
          ) : workoutForDay.rest ? (
            <div className="text-center">Today is a rest day</div>
          ) : currentDate != date && currentDate != undefined ? (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            />
          ) : workoutHistory[date] == undefined ? (
            <div className="w-[85vw] md:w-3/4 flex flex-col items-center justify-center">
              <table className={`lg:w-3/4 w-full ${styles.table}`}>
                <thead>
                  <tr className="md:text-3xl">
                    <th className={tableHeaderStyle}>Exercise</th>
                    <th className={tableHeaderStyle}>Set</th>
                    <th className={tableHeaderStyle}>Reps</th>
                    <th className={tableHeaderStyle}>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {convertedExercises.map((exercise) => (
                    <MainExercise key={exercise.id} exercise={exercise} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            />
          )}
          {/* {workoutForDay.rest ? (
            <div className="text-center">Today is a rest day</div>
          ) : currentDate != date && currentDate != undefined ? (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            />
          ) : workoutHistory[date] == undefined ? (
            <div className="w-[85vw] md:w-3/4 flex flex-col items-center justify-center">
              <table className={`lg:w-3/4 w-full ${styles.table}`}>
                <thead>
                  <tr className="md:text-3xl">
                    <th className={tableHeaderStyle}>Exercise</th>
                    <th className={tableHeaderStyle}>Set</th>
                    <th className={tableHeaderStyle}>Reps</th>
                    <th className={tableHeaderStyle}>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {convertedExercises.map((exercise) => (
                    <MainExercise key={exercise.id} exercise={exercise} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <HistoryMainList
              workout={workoutHistory[currentDate]}
              date={currentDate}
            />
          )} */}
        </>
      ) : (
        <div>There seems to be an error</div>
      )}
    </div>
  );
}

export default ExerciseList;

{
  /* <div className={styles.workoutContainer}>
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
</div> */
}
