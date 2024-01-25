import React, { useContext, useState } from "react";
import styles from "./workoutDay.module.css";
import { WorkoutContext } from "@/app/workouts/add/context";

function WorkoutDay({ day }) {
  // MODAL
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [workoutsContext, setWorkoutsContext] = useContext(WorkoutContext);
  const [rest, setRest] = useState(workoutsContext[day].rest);
  const [workouts, setWorkouts] = useState(workoutsContext[day].workouts);
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
        id: workouts.length,
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
    toggle();
  };

  const addDay = (e) => {
    e.preventDefault();
    setWorkoutsContext({
      ...workoutsContext,
      [day]: { completed: true, workouts: workouts, rest: rest },
    });
  };

  const debug = (e) => {
    console.log(workoutsContext);
  };

  return (
    <div className={styles.card}>
      <h1 className="text-center text-3xl mb-5">{day}</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={toggle}>
          Add Workout
        </button>
        {!rest && (
          <button className={styles.button} onClick={handleRest}>
            Rest Day?
          </button>
        )}
        {rest && (
          <button className={styles.restButton} onClick={handleRest}>
            Rest Day
          </button>
        )}
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
          <button className={styles.submitButton}>Submit</button>
        </form>
      )}
      <div className={(rest ? "blur" : "") + " overflow-y-scroll h-full w-full mx-0 my-4 no-scrollbar"}>
        {workouts.map((workout) => (
          <article className={styles.workouts} key={workout.id}>
            <h1 className="justify-self-start">{workout.name}</h1>
            <h1>{workout.sets}</h1>
            <h1>{workout.reps}</h1>
            <h1>{workout.weight}</h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWorkouts(workouts.filter((w) => w.id !== workout.id));
              }}
            >
              Delete
            </button>
          </article>
        ))}
      </div>
      <button onClick={addDay} className={styles.button}>Submit {day}</button>
      {/* <button onClick={debug}>Debug</button> */}
    </div>
  );
}

export default WorkoutDay;

// "flex flex-col items-center mb-4 bg-red-700"
