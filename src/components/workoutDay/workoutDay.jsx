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
  const [workoutSaved, setWorkoutSaved] = useState(false);

  const handleRest = () => {
    setRest(!rest);
  };

  const add = (e) => {
    e.preventDefault();
    if (name == "" || sets == "" || reps == "" || weight == "") {
      alert("Please fill in required inputs");
      return;
    }
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
  };

  const addDay = (e) => {
    e.preventDefault();
    setWorkoutsContext({
      ...workoutsContext,
      [day]: { completed: true, workouts: workouts, rest: rest },
    });
    setWorkoutSaved(true);
  };

  const closeWorkoutSaved = (e) => {
    e.preventDefault();
    setWorkoutSaved(false);
  }

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
      <div
        className={
          (rest ? "blur" : "") +
          " overflow-y-scroll h-full w-full mx-0 my-4 no-scrollbar"
        }
      >
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
      {workoutSaved ? (
        <div className="bg-green-500 px-4 py-2 rounded-md mb-5">
          Workout Successfully Saved! 
          <button onClick={closeWorkoutSaved} className="ml-5">X</button>
        </div>
      ) : (
        <div></div>
      )}
      <button onClick={addDay} className={styles.button}>
        Save {day}
      </button>
    </div>
  );
}

export default WorkoutDay;
