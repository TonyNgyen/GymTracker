"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/utils";
import WorkoutTimer from "../workoutTimer/workoutTimer";

function StartWorkout({ workout, exercises }) {
  const { setItem, getItem } = useLocalStorage("Start");
  const [begin, setBegin] = useState("");
  const [pause, setPause] = useState(false);
  useEffect(() => {
    setBegin(getItem());
  });
  return (
    <div className="flex flex-col w-fit items-center mx-auto">
      {!begin ? <h1>Ready to begin {workout.name}?</h1> : ""}
      {begin ? <WorkoutTimer pause={pause} /> : ""}
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setItem(true);
            setBegin(true);
          }}
        >
          {begin ? "Begined" : "Begin Workout"}
        </Button>
        {!pause ? (
          <Button onClick={() => setPause(true)}>Pause</Button>
        ) : (
          <Button onClick={() => setPause(false)}>Resume</Button>
        )}
      </div>
    </div>
  );
}

export default StartWorkout;
