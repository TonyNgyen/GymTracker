"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./workoutSlug.module.css";
import { updateWorkout, addExercises, updateExercises } from "@/lib/actions";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import EditExercise from "../editExercise/editExercise";
import { makeid } from "@/lib/utils";
import {
  ExercisesContext,
  NewExercisesContext,
  WorkoutContext,
} from "../editList/context";

function WorkoutSlug({ workout, day }) {
  const tableHeaderStyle = "font-semibold px-4";
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [newExercisesContext, setNewExercisesContext] =
    useContext(NewExercisesContext);
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [needSaving, setNeedSaving] = useState(false);

  const [exerciseIds, setExerciseIds] = useState(
    workout.workouts[day].workouts
  );

  const [drop, setDrop] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSets, setNewSets] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const addExercise = (e) => {
    e.preventDefault();
    const newExerciseId = makeid();

    setExerciseIds([...exerciseIds, newExerciseId]);

    setExercisesContext({
      ...exercisesContext,
      [newExerciseId]: {
        id: newExerciseId,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
      },
    });

    setNewExercisesContext({
      ...newExercisesContext,
      [newExerciseId]: {
        id: newExerciseId,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
      },
    });

    setWorkoutContext({
      ...workoutContext,
      workouts: {
        ...workoutContext.workouts,
        [day]: {
          ...workoutContext.workouts[day],
          workouts: [...workoutContext.workouts[day].workouts, newExerciseId],
        },
      },
    });

    setNewName("");
    setNewSets("");
    setNewReps("");
    setNewWeight("");
  };

  useEffect(() => {}, [exercisesContext, newExercisesContext, workoutContext]);

  const updateDay = (workoutID, workoutName, exercises, day) => {
    updateWorkout(workoutID, workoutName, exercises, day);
    updateExercises(exercisesContext);
    // addExercises(newExercisesContext);
  };

  return (
    <NewExercisesContext.Provider
      value={[newExercisesContext, setNewExercisesContext]}
    >
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        <div className="">
          <div
            className={`styles.cardContainer border-2 border-foreground rounded-md px-4 py-5 bg-cardBG`}
          >
            <div className={`styles.textContainer flex justify-between mb-2`}>
              <div className="">
                <h1 className={`styles.dayHeader`}>
                  <p className="text-3xl">Day {day}</p>
                </h1>
              </div>
              {drop ? (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowUp className="text-3xl" />
                </button>
              ) : (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowDown className="text-3xl" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {needSaving && (
                <button
                  onClick={() =>
                    updateDay(
                      workout.id,
                      workout.name,
                      workoutContext.workouts[day].workouts,
                      day
                    )
                  }
                  className="bg-greenConfirm text-background py-1 px-2 rounded-md font-semibold"
                >
                  Save
                </button>
              )}

              {drop && (
                <button
                  onClick={() =>
                    updateDay(
                      workout.id,
                      workout.name,
                      workoutContext.workouts[day].workouts,
                      day
                    )
                  }
                  className="bg-greenConfirm text-background py-1 px-2 rounded-md font-semibold"
                >
                  Add Exercise
                </button>
              )}
            </div>
            {drop && (
              <div className={`${styles.workoutContainer} mt-5`}>
                <table className={`${styles.table} w-full md:w-[90%]`}>
                  <thead>
                    <tr className="md:text-3xl text-lg">
                      <th></th>
                      <th className={tableHeaderStyle}>Exercise</th>
                      <th className={tableHeaderStyle}>Sets</th>
                      <th className={tableHeaderStyle}>Reps</th>
                      <th className={tableHeaderStyle}>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {modal && (
                      <form className={styles.addHeader}>
                        <h1 className={styles.empty}></h1>
                        <input
                          value={newName}
                          type="text"
                          placeholder="Workout"
                          className={styles.addInputs}
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                        />
                        <input
                          value={newSets}
                          type="number"
                          placeholder="Sets"
                          className={styles.addInputs}
                          onChange={(e) => {
                            setNewSets(e.target.value);
                          }}
                        />
                        <input
                          value={newReps}
                          type="number"
                          placeholder="Reps"
                          className={styles.addInputs}
                          onChange={(e) => {
                            setNewReps(e.target.value);
                          }}
                        />
                        <input
                          value={newWeight}
                          type="number"
                          placeholder="Weight"
                          className={styles.addInputs}
                          onChange={(e) => {
                            setNewWeight(e.target.value);
                          }}
                        />
                        <button
                          className={styles.add + " text-2xl font-bold"}
                          onClick={addExercise}
                        >
                          +
                        </button>
                      </form>
                    )} */}
                    {workoutContext.workouts[day].workouts.map(
                      (exercise, index) => (
                        <EditExercise
                          exerciseID={exercise}
                          day={day}
                          key={index}
                          index={index}
                        />
                      )
                    )}
                  </tbody>
                </table>
                {/* <div className={styles.workoutHeader}>
                  <h1 className={styles.empty}></h1>
                  <h1 className={styles.headers}>Workouts</h1>
                  <h1 className={styles.headers}>Sets</h1>
                  <h1 className={styles.headers}>Reps</h1>
                  <h1 className={styles.headers}>Weight</h1>
                  <button
                    className={styles.add + " text-2xl font-bold"}
                    onClick={toggle}
                  >
                    +
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </WorkoutContext.Provider>
    </NewExercisesContext.Provider>
  );
}

export default WorkoutSlug;
