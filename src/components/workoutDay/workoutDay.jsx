import React, { useState } from "react";
import styles from "./workoutDay.module.css";

function workoutDay({ day, dict }) {
  // MODAL
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [rest, setRest] = useState(dict.false);
  const [workouts, setWorkouts] = useState(dict.workouts);
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const handleRest = () => {
    setRest(!rest);
  };
  
  const add = (e) => {
    e.preventDefault();
    setWorkouts([
      ...workouts,
      {
        name: name,
        sets: sets,
        reps: reps,
        weight: weight,
      },
    ]);
    setName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  console.log(rest);

  return (
    <div className={styles.card}>
      <h1 className="text-center text-3xl mb-5">{day}</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={toggle}>
          Add Workout
        </button>
        <button className={styles.button} onClick={handleRest}>
          Rest Day?
        </button>
      </div>

      {modal && (
        <form className={styles.form} onSubmit={add}>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Workout"
          />
          <input
            type="number"
            name="sets"
            id=""
            onChange={(e) => {
              setSets(e.target.value);
            }}
            placeholder="Sets"
            value={sets}
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
          />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

export default workoutDay;

// "flex flex-col items-center mb-4 bg-red-700"
