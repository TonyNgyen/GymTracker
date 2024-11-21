import React, { useState, useContext, useEffect } from "react";
import styles from "./editExercise.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  WorkoutContext,
  ExercisesContext,
  NewExercisesContext,
} from "../editList/context";

function EditExercise({ exerciseID, day, index }) {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [newExercisesContext, setNewExercisesContext] =
    useContext(NewExercisesContext);

  let workout = {};

  for (let exercise in exercisesContext) {
    if (exercisesContext[exercise].id == exerciseID) {
      workout = exercisesContext[exercise];
    }
  }

  const [sets, setSets] = useState(workout.sets);
  const [reps, setReps] = useState(workout.reps);
  const [weight, setWeight] = useState(workout.weight);

  const [edit, setEdit] = useState(false);

  const [exerciseSelect, setExerciseSelect] = useState("");

  const editSelect = (exerciseID) => {
    setExerciseSelect(exerciseID);
    setEdit(!edit);
  };

  const editExercise = (exerciseID, name, sets, reps, weight) => {
    editSelect(exerciseID);
    let copyExercises = exercisesContext;
    copyExercises[exerciseID] = {
      id: exerciseID,
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    for (let exercise in exercisesContext) {
      if (exercisesContext[exercise].id == exerciseID) {
        copyExercises.push({
          id: exerciseID,
          name: name,
          sets: sets,
          reps: reps,
          weight: weight,
        });
      } else {
        copyExercises.push(exercisesContext[exercise]);
      }
    }
    setExercisesContext(copyExercises);

    copyExercises = [];
    for (let exercise in newExercisesContext) {
      if (newExercisesContext[exercise].id == exerciseID) {
        copyExercises.push({
          id: exerciseID,
          name: name,
          sets: sets,
          reps: reps,
          weight: weight,
        });
      } else {
        copyExercises.push(exercisesContext[exercise]);
      }
    }
    setNewExercisesContext(copyExercises);
  };

  const deleteWorkout = (workoutId) => {
    setWorkoutContext({
      ...workoutContext,
      workouts: {
        ...workoutContext.workouts,
        [day]: {
          ...workoutContext.workouts[day],
          workouts: workoutContext.workouts[day].workouts.filter(
            (w) => w !== workoutId
          ),
        },
      },
    });
  };

  return (
    <>
      {/* {workout.id == exerciseSelect && edit ? (
        <form className={styles.workouts}>
          <button
            onClick={() =>
              editExercise(workout.id, workout.name, sets, reps, weight)
            }
            className={styles.edit}
          >
            <FaEdit />
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
          <button className={styles.trash}>
            <FaTrashAlt />
          </button>
        </form>
      ) : (
        <div className={styles.workouts}>
          <button
            onClick={() => editSelect(workout.id)}
            className={styles.edit}
          >
            <FaEdit />
          </button>
          <h1 className={styles.stats}>{workout.name}</h1>
          <h1 className={styles.stats}>{workout.sets}</h1>
          <h1 className={styles.stats}>{workout.reps}</h1>
          <h1 className={styles.stats}>{workout.weight}</h1>
          <button
            className={styles.trash}
            onClick={(e) => {
              e.preventDefault();
              deleteWorkout(workout.id);
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      )} */}
      <tr
        className={`${styles.tableRow} text-xl text-center bg-cardBG relative ${
          index != workoutContext.workouts[day].workouts.length - 1 &&
          "border-b-white border"
        } border-transparent`}
      >
        <button
          onClick={() => editSelect(workout.id)}
          className={`absolute ${styles.edit}`}
        >
          <FaEdit />
        </button>
        <td className={`${styles.exerciseName} pl-8`}>{workout.name}</td>
        <td className={styles.middle}>{workout.sets}</td>
        <td className={styles.middle}>{workout.reps}</td>
        <td className={styles.weight}>{workout.weight}</td>
        <button
          className={`absolute ${styles.delete} text-destructive`}
          onClick={(e) => {
            e.preventDefault();
            deleteWorkout(workout.id);
          }}
        >
          <FaTrashAlt />
        </button>
      </tr>
      {index != workoutContext.workouts[day].workouts.length - 1 && (
        <div className="h-2"></div>
      )}
    </>
  );
}

export default EditExercise;
