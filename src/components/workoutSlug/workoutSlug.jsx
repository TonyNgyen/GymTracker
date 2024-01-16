import React from "react";

function WorkoutSlug({ workouts, day }) {
  const dayWorkouts = workouts[day].workouts;
  return (
    <div>
      <div>
        {day} | {workouts[day].completed ? "True" : "False"} |{" "}
        {workouts[day].rest ? "Rest" : "Workout"}
      </div>
      <div>
        {dayWorkouts.map((workout) => (
          <div>
            <h1>{workout.name}</h1>
            <h1>{workout.sets}</h1>
            <h1>{workout.reps}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutSlug;
