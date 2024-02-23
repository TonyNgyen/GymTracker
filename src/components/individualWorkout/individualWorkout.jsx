import React, { useState, useContext } from "react";
import styles from "./individualWorkout.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { WorkoutContext } from "@/components/workoutSlug/context";

function IndividualWorkout(workout) {
  const [workoutsContext, setWorkoutsContext] = useContext(WorkoutContext);

  const [sets, setSets] = useState(workout.workout.sets);
  const [reps, setReps] = useState(workout.workout.reps);
  const [weight, setWeight] = useState(workout.workout.weight);

  const [edit, setEdit] = useState(false);

  const [editWorkout, setEditWorkout] = useState("");

  const editSelect = (workoutId) => {
    setEditWorkout(workoutId);
    setEdit(!edit);
  };

  const editWorkouts = (workoutId, sets, reps, weight) => {
    editSelect(workoutId);
    let copyWorkouts = [];
    workoutsContext.workouts.map((workout) => {
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
    console.log(copyWorkouts);
    setWorkoutsContext({ ...workoutsContext, workouts: copyWorkouts });
  };

  const deleteWorkout = (workoutId) => {
    setWorkoutsContext({ ...workoutsContext, workouts: workoutsContext.workouts.filter((w) => w.id !== workoutId) });
  }

  return (
    <div>
      {workout.workout.id == editWorkout && edit ? (
        <form className={styles.workouts}>
          <button
            onClick={() => editWorkouts(workout.workout.id, sets, reps, weight)}
            className={styles.edit}
          >
            <FaEdit />
          </button>
          <h1 className={styles.stats}>{workout.workout.name}</h1>
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
            onClick={() => editSelect(workout.workout.id)}
            className={styles.edit}
          >
            <FaEdit />
          </button>
          <h1 className={styles.stats}>{workout.workout.name}</h1>
          <h1 className={styles.stats}>{workout.workout.sets}</h1>
          <h1 className={styles.stats}>{workout.workout.reps}</h1>
          <h1 className={styles.stats}>{workout.workout.weight}</h1>
          <button
            className={styles.trash}
            onClick={(e) => {
              e.preventDefault();
              deleteWorkout(workout.workout.id);
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
