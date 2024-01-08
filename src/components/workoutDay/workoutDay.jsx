import React, { useContext, useState } from "react";
import styles from "./workoutDay.module.css";
import { WorkoutContext } from "@/app/workouts/add/context";

function workoutDay({ day, list }) {

  const workoutsContext = useContext(WorkoutContext)

  console.log(workoutsContext)

  // MODAL
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [rest, setRest] = useState(workoutsContext[day].rest);
  const [workouts, setWorkouts] = useState(workoutsContext[day].workouts);
  const [allWorkouts, setAllWorkouts] = useState(workoutsContext);
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
  };

  const addDay = (e) => {
    e.preventDefault();
    // BUG WHERE THIS LINE OF CODE CREATES A NEW KEY IN THE DICTIONARY OF VALUE "DAY"
    setAllWorkouts({...allWorkouts, day:{completed:true, workouts: workouts, rest: rest}})
    console.log("THIS WORKS")
    console.log(allWorkouts)
  }

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
      {workouts.map((workout) => (
        <article className={styles.workouts}>
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
            {/* <HiOutlineTrash size={40} /> */}
            Delete
          </button>
        </article>
      ))}
      <button onClick={addDay}>Submit Workout</button>
    </div>
  );
}

export default workoutDay;

// "flex flex-col items-center mb-4 bg-red-700"
