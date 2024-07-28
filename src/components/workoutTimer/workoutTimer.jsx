import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/utils";

function WorkoutTimer({pause}) {
  const { setItem, getItem, removeItem } = useLocalStorage("Time");
  const [time, setTime] = useState(getItem());

  useEffect(() => {
    if (!pause) {
      let intervalId;
      intervalId = setInterval(() => setTime(time + 1), 1000);
      setItem(time);
      return () => clearInterval(intervalId);
    }
  }, [time, pause]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time % 3600 / 60);
  const seconds = Math.floor(time % 60)

  return (
    <div className="mb-2">
      <p className="text-4xl">
        {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default WorkoutTimer;
