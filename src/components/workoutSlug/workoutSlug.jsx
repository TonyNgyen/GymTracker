"use client";

import React, { useState } from "react";
import styles from "./workoutSlug.module.css";
import Link from "next/link";

{
  /* {day} | {workouts[day].completed ? "True" : "False"} |{" "}
        {workouts[day].rest ? "Rest" : "Workout"} */
}

function WorkoutSlug({ workouts, day }) {
  const dayWorkouts = workouts[day].workouts;
  const [drop, setDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editWorkout, setEditWorkout] = useState("");

  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [newWorkouts, setNewWorkouts] = useState(workouts[day].workouts);

  const editSelect = (workoutId) => {
    setEditWorkout(workoutId);
    setEdit(!edit);
  };

  // const editWorkouts = (workoutId, sets, reps, weight) => {
  //   setEditWorkout(workoutId);
  //   setEdit(!edit);
  //   newWorkouts.map((workout) => {
  //     if (workout.id == workoutId) {
  //       setCopyWorkouts([
  //         ...copyWorkouts,
  //         {
  //           id: workoutId,
  //           name: workout.name,
  //           sets: sets,
  //           reps: reps,
  //           weight: weight,
  //         },
  //       ]);
  //     } else {
  //       console.log(workout)
  //       setCopyWorkouts([
  //         ...copyWorkouts,
  //         workout,
  //       ]);
  //     }
  //   });
  // };

  const editWorkouts = (workoutId, sets, reps, weight) => {
    editSelect(workoutId);
    let copyWorkouts = [];
    newWorkouts.map((workout) => {
      if (workout.id == workoutId) {
        copyWorkouts = [
          ...copyWorkouts,
          {
            id: workoutId,
            name: workout.name,
            sets: sets,
            reps: reps,
            weight: weight,
          },
        ];
      } else {
        copyWorkouts = [...copyWorkouts, workout];
      }
    });
    setNewWorkouts(copyWorkouts);
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <h1 className="text-2xl">{day}</h1>
          <button onClick={() => setDrop(!drop)}>Toggle</button>
        </div>
        {drop && (
          <div className={styles.workoutContainer}>
            <div className={styles.workoutHeader + " text-2xl font-bold"}>
              <h1 className={styles.empty}></h1>
              <h1 className={styles.headers}>Workouts</h1>
              <h1 className={styles.headers}>Sets</h1>
              <h1 className={styles.headers}>Reps</h1>
              <h1 className={styles.headers}>Weight</h1>
            </div>
            {newWorkouts.map((workout) => (
              <div key={workout.id}>
                {workout.id == editWorkout && edit ? (
                  <form className={styles.workouts}>
                    <button
                      onClick={() =>
                        editWorkouts(workout.id, sets, reps, weight)
                      }
                      className={styles.edit}
                    >
                      Editing
                    </button>
                    <h1 className={styles.stats}>{workout.name}</h1>
                    <input
                      type="number"
                      name="sets"
                      id=""
                      onChange={(e) => {
                        setSets(e.target.value);
                      }}
                      placeholder="Sets"
                      value={sets}
                      className={styles.inputs}
                    />
                    <input
                      type="number"
                      name="reps"
                      id=""
                      onChange={(e) => {
                        setReps(e.target.value);
                      }}
                      placeholder="Reps"
                      value={reps}
                      className={styles.inputs}
                    />
                    <input
                      type="number"
                      name="weight"
                      id=""
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                      placeholder="Weight"
                      value={weight}
                      className={styles.inputs}
                    />
                    <button className={styles.edit}>Delete</button>
                  </form>
                ) : (
                  <div className={styles.workouts}>
                    <button
                      onClick={() => editSelect(workout.id)}
                      className={styles.edit}
                    >
                      Edit
                    </button>{" "}
                    <h1 className={styles.stats}>{workout.name}</h1>
                    <h1 className={styles.stats}>{workout.sets}</h1>
                    <h1 className={styles.stats}>{workout.reps}</h1>
                    <h1 className={styles.stats}>{workout.weight}</h1>
                    <button
                      className={styles.edit}
                      onClick={(e) => {
                        e.preventDefault();
                        setNewWorkouts(
                          newWorkouts.filter((w) => w.id !== workout.id)
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutSlug;
