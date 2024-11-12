"use client";

import { Button } from "@/components/ui/button";
import WorkoutTimer from "@/components/workoutTimer/workoutTimer";
import React, { useState } from "react";
import { useLocalStorage } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

function DebugAndTestPage() {
  const [pause, setPause] = useState(false);
  const {
    setItem: setStartItem,
    getItem: getStartItem,
    removeItem: removeStartItem,
  } = useLocalStorage("Start");
  const {
    setItem: setTimeItem,
    getItem: getTimeItem,
    removeItem: removeTimeItem,
  } = useLocalStorage("time");
  const {
    setItem: setLastTime,
    getItem: getLastTime,
    removeItem: removeLastTime,
  } = useLocalStorage("lastTime");
  const { removeItem: removeStartWorkoutItem } =
    useLocalStorage("StartWorkout");
  const { removeItem: removeCurrentExerciseItem } =
    useLocalStorage("CurrentExercise");
  const resuming = () => {
    setLastTime(new Date());
  };
  const pausing = () => {
    const currentTime = new Date();
    const pastTime = getLastTime();
    let timeItem = getTimeItem();
    setTimeItem(timeItem + differenceInSeconds(currentTime, pastTime));
  };
  return (
    <div>
      <WorkoutTimer pause={pause} />
      <div className="flex gap-3">
        {!pause ? (
          <Button
            className="text-lg min-w-[105px]"
            onClick={() => {
              setPause(true);
              pausing();
            }}
          >
            Pause
          </Button>
        ) : (
          <Button
            className="text-lg min-w-[105px]"
            onClick={() => {
              setPause(false);
              resuming();
            }}
          >
            Resume
          </Button>
        )}
        <Button
          className="text-lg min-w-[105px] cursor-pointer"
          onClick={() => {}}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}

export default DebugAndTestPage;
