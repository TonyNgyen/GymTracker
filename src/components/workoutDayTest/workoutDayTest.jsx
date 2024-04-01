"use client";

import React, { useContext, useState } from "react";
import styles from "./workoutDayTest.module.css";
import { ExerciseContext, WorkoutContext } from "../autoUpdate/context";
import { Button } from "../ui/button";
import { addExercises } from "@/lib/actions";
import { makeid } from "@/lib/utils";

function WorkoutDay({ day }) {
  const [modal, setModal] = useState(false);
  const [workoutsContext, setWorkoutsContext] = useContext(WorkoutContext);
  const [exerciseContext, setExerciseContext] = useContext(ExerciseContext);
  const [rest, setRest] = useState(workoutsContext[day].rest);
  const [workouts, setWorkouts] = useState(workoutsContext[day].workouts);
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutSaved, setWorkoutSaved] = useState(false);
  const [exerciseIDs, setExerciseIDs] = useState([]);
  const [unsavedExercises, setUnsavedExercises] = useState([]);
  const [foundExercises, setFoundExercises] = useState([]);
  const [foundBoolean, setFoundBoolean] = useState(false);

  const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;

  const add = (e) => {
    e.preventDefault();
    const newExerciseID = makeid();
    if (isWhitespaceString(name) || sets == "" || reps == "" || weight == "") {
      alert("Please fill in required inputs");
      return;
    }

    let foundExercisesArray = [];
    for (let exercise in exerciseContext) {
      if (exerciseContext[exercise].name == name) {
        foundExercisesArray.push(exerciseContext[exercise]);
        // FOUND OUT WHY THIS DOES NOT WORK
        // setFoundExercises(...foundExercises, exerciseContext[exercise])
      }
    }
    setFoundExercises(foundExercisesArray);
    if (foundExercisesArray.length) {
      setFoundBoolean(true);
      setModal(false);
    } else {
      setWorkouts([
        ...workouts,
        {
          id: newExerciseID,
          name: name,
          sets: sets,
          reps: reps,
          weight: weight,
        },
      ]);
      setUnsavedExercises([
        ...unsavedExercises,
        {
          id: newExerciseID,
          name: name,
          sets: sets,
          reps: reps,
          weight: weight,
        },
      ]);
      setExerciseIDs([...exerciseIDs, newExerciseID]);
    }
    setName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const addDay = (e) => {
    e.preventDefault();
    setWorkoutsContext({
      ...workoutsContext,
      [day]: { completed: true, workouts: exerciseIDs, rest: rest },
    });
    setExerciseContext([...exerciseContext, ...unsavedExercises]);
    setUnsavedExercises([]);
    setWorkoutSaved(true);
  };

  const closeWorkoutSaved = (e) => {
    e.preventDefault();
    setWorkoutSaved(false);
  };

  const debug = (e) => {
    console.log(foundExercises);
  };

  return (
    <div className={styles.card}>
      <h1 className="text-center text-3xl mb-5">{day}</h1>
      <div className={styles.buttons}>
        <Button onClick={() => setModal(!modal)} className="min-w-[69px]">
          Add
        </Button>
        {!rest && (
          <Button onClick={() => setRest(!rest)} className="min-w-[69px]">
            Rest?
          </Button>
        )}
        {rest && <Button onClick={() => setRest(!rest)}>Rest</Button>}
        <Button onClick={debug} className="min-w-[69px]">
          Debug
        </Button>
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
          <div className={styles.buttonsContainer}>
            <Button type="submit">Add</Button>
            <Button type="submit">Reuse</Button>
          </div>
        </form>
      )}

      {foundBoolean && (
        <div>Yoyoyo</div>
      )}
      <div
        className={
          (rest ? "blur" : "") +
          " overflow-y-scroll h-full w-full mx-0 my-4 no-scrollbar"
        }
      >
        {!workouts.length && (
          <div className="mt-36 text-2xl font-semibold">
            Please add workouts or mark {day} as a rest day!
          </div>
        )}
        {workouts.map((workout) => (
          <article className={styles.workouts} key={workout.id}>
            <h1 className="justify-self-start">{workout.name}</h1>
            <h1>{workout.sets}</h1>
            <h1>{workout.reps}</h1>
            <h1>{workout.weight}</h1>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setWorkouts(workouts.filter((w) => w.id !== workout.id));
              }}
            >
              Delete
            </Button>
          </article>
        ))}
      </div>
      {workoutSaved ? (
        <div className="bg-green-500 px-4 py-2 rounded-md mb-5">
          Workout Successfully Saved!
          <button onClick={closeWorkoutSaved} className="ml-5">
            X
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <Button onClick={addDay}>
        {/* <Button onClick={() => console.log(exerciseIDs)}> */}
        Save {day}
      </Button>
    </div>
  );
}

export default WorkoutDay;
