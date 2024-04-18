"use client";

import React, { useContext, useState } from "react";
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
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [newExercisesContext, setNewExercisesContext] =
    useContext(NewExercisesContext);
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);

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

    setExercisesContext([
      ...exercisesContext,
      {
        id: newExerciseId,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
      },
    ]);

    setNewExercisesContext([
      ...newExercisesContext,
      {
        id: newExerciseId,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
      },
    ]);

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
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <div className={styles.textContainer}>
              <div className="flex">
                <h1 className={styles.dayHeader}>{day}</h1>
                <button
                  onClick={() =>
                    updateDay(
                      workout.id,
                      workout.name,
                      workoutContext.workouts[day].workouts,
                      day
                    )
                  }
                >
                  <FaCheck />
                </button>
              </div>
              {drop ? (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowUp />
                </button>
              ) : (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowDown />
                </button>
              )}
            </div>
            {drop && (
              <div className={styles.workoutContainer}>
                <div className={styles.workoutHeader}>
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
                </div>
                {modal && (
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
                )}
                {workoutContext.workouts[day].workouts.map((exercise) => (
                  <div key={exercise}>
                    <EditExercise exerciseID={exercise} day={day}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </WorkoutContext.Provider>
      </NewExercisesContext.Provider>
  );
}

export default WorkoutSlug;
