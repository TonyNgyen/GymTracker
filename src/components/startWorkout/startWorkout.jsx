"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/utils";

function StartWorkout({ workout, exercises }) {
  const { setItem, getItem } = useLocalStorage("Start");
  const [begin, setBegin] = useState(getItem());
  console.log(begin);
  return (
    <div>
      <h1>Ready to begin {workout.name}?</h1>
      <Button
        onClick={() => {
          setItem(true);
          setBegin(true);
        }}
      >
        {begin ? "Begined" : "Begin Workout"}
      </Button>
    </div>
  );
}

export default StartWorkout;
