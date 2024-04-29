import React, { useState, useEffect } from "react";

function WorkoutTimer({pause}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!pause) {
      let intervalId;
      intervalId = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(intervalId);
    }
  }, [time, pause]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time % 3600 / 60);
  const seconds = Math.floor(time % 60)

  return (
    <div>
      <p className="stopwatch-time">
        {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default WorkoutTimer;
