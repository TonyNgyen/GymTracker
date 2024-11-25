import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

function WorkoutTimer({ pause }) {
  const { getItem: getTimeItem } = useLocalStorage("time");
  const { setItem: setLastTime, getItem: getLastTime } =
    useLocalStorage("lastTime");
  const [time, setTime] = useState(getTimeItem());
  const {
    setItem: setTotalTime,
  } = useLocalStorage("totalTime");

  useEffect(() => {
    const time = new Date();
    setLastTime(time);
  }, []);

  useEffect(() => {
    if (!pause) {
      let intervalId;
      intervalId = setInterval(() => {
        const currentTime = new Date();
        const pastTime = getLastTime();
        const savedTime = getTimeItem();
        setTime(savedTime + differenceInSeconds(currentTime, pastTime));
        setTotalTime(savedTime + differenceInSeconds(currentTime, pastTime));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [time, pause]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return (
    <div className="mb-2">
      <p className="text-4xl">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default WorkoutTimer;
