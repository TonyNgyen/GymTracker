import React, { useState, useContext } from "react";
import styles from "./individualWorkout.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { WorkoutContext, ExercisesContext } from "../editList/context";
import { updateExercises } from "@/lib/actions";

function IndividualWorkout({ exerciseID, day }) {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);

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
    let copyExercises = [];
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
    updateExercises(exercisesContext);
  };

  const deleteWorkout = (workoutId) => {
    console.log(workoutContext.workouts[day].workouts);
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
    <div>
      {workout.id == exerciseSelect && edit ? (
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
      )}
    </div>
  );
}

export default IndividualWorkout;
