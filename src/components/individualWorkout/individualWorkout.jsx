import React, { useState, useContext } from "react";
import styles from "./individualWorkout.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { WorkoutContext } from "@/components/workoutSlug/context";

function IndividualWorkout(workout) {
  const [workoutsContext, setWorkoutsContext] = useContext(WorkoutContext);

  const [prevSets, setPrevSets] = useState("");
  const [prevReps, setPrevReps] = useState("");
  const [prevWeight, setPrevWeight] = useState("");

  const [newSets, setNewSets] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

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
    setWorkoutsContext(copyWorkouts);
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <div>
      {workout.workout.id == editWorkout && edit ? (
        <form className={styles.workouts}>
          <button
            onClick={() => editWorkouts(workout.id, sets, reps, weight)}
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
          <button className={styles.edit}>
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
          <h1 className={styles.stats}>{workout.workout.name}</h1>
          <h1 className={styles.stats}>{workout.workout.sets}</h1>
          <h1 className={styles.stats}>{workout.workout.reps}</h1>
          <h1 className={styles.stats}>{workout.workout.weight}</h1>
          <button
            className={styles.edit}
            onClick={(e) => {
              e.preventDefault();
              setNewWorkouts(newWorkouts.filter((w) => w.id !== workout.id));
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
