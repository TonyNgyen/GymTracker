"use client";

import React, { useContext, useState } from "react";
import styles from "./workoutSlug.module.css";
import { updateWorkout } from "@/lib/actions";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { WorkoutContext, UpdatedExercisesContext } from "./context";
import IndividualWorkout from "../individualWorkout/individualWorkout";
import { makeid } from "@/lib/utils";
import {
  ExerciseIDsContext,
  NewExercisesContext,
} from "@/app/workouts/[slug]/context";

//https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects

function WorkoutSlug({ workout, day }) {
  const [exerciseIDsContext, setExerciseIDsContext] =
    useContext(ExerciseIDsContext);
  const [newExercisesContext, setNewExercisesContext] =
    useContext(NewExercisesContext);

  const [exerciseIds, setExerciseIds] = useState(
    workout.workouts[day].workouts
  );
  const convert = [];

  const [updatedExercisesContext, setUpdatedExercisesContext] = useState([]);
  const [workoutsContext, setWorkoutsContext] = useState(workout.workouts[day]);

  workoutsContext.workouts.map((id) => {
    exerciseIDsContext.map((exercise) => {
      if (id == exercise.id) {
        convert.push(exercise);
      }
    });
  });

  const [convertedExercises, setConveredExercises] = useState(convert);
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

    setConveredExercises([
      ...convertedExercises,
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

    setWorkoutsContext({
      ...workoutsContext,
      workouts: [...workoutsContext.workouts, newExerciseId],
    });

    setNewName("");
    setNewSets("");
    setNewReps("");
    setNewWeight("");
  };

  return (
    <WorkoutContext.Provider value={[workoutsContext, setWorkoutsContext]}>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.textContainer}>
            <div className="flex">
              <h1 className={styles.dayHeader}>{day}</h1>
              <button
                onClick={() =>
                  updateWorkout(
                    workout.id,
                    workout.name,
                    workoutsContext.workouts,
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
              {convertedExercises.map((workout) => (
                <div key={workout.id}>
                  <IndividualWorkout workout={workout} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </WorkoutContext.Provider>
  );
}

export default WorkoutSlug;
