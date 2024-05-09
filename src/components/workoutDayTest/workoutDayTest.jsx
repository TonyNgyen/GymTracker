"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./workoutDayTest.module.css";
import { ExerciseContext, WorkoutContext } from "../autoUpdate/context";
import { Button } from "../ui/button";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { makeid } from "@/lib/utils";
import FoundExercise from "../foundExercises/foundExercise";

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
  const [exerciseIDs, setExerciseIDs] = useState([]);
  const [unsavedExercises, setUnsavedExercises] = useState([]);
  const [foundExercises, setFoundExercises] = useState([]);
  const [foundBoolean, setFoundBoolean] = useState(false);

  const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;

  useEffect(() => {
    setWorkoutsContext({
      ...workoutsContext,
      [day]: { completed: true, workouts: exerciseIDs, rest: rest },
    });
  }, [exerciseIDs, rest]);

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
      return;
    }
    let newExercise = {
      id: newExerciseID,
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    setWorkouts([...workouts, newExercise]);
    setUnsavedExercises([...unsavedExercises, newExercise]);
    setExerciseIDs([...exerciseIDs, newExerciseID]);
    setExerciseContext({ ...exerciseContext, [newExerciseID]: newExercise });
    setWorkoutsContext({
      ...workoutsContext,
      [day]: { completed: true, workouts: exerciseIDs, rest: rest },
    });
    setName("");
    setSets("");
    setReps("");
    setWeight("");
    return;
  };

  const addChosen = (exerciseID, exercise) => {
    setWorkouts([
      ...workouts,
      {
        id: exerciseID,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      },
    ]);
    setExerciseIDs([...exerciseIDs, exerciseID]);
    setName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const createNewExercise = () => {
    const newExerciseID = makeid();
    let newExercise = {
      id: newExerciseID,
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    setWorkouts([...workouts, newExercise]);
    setUnsavedExercises([...unsavedExercises, newExercise]);
    setExerciseIDs([...exerciseIDs, newExerciseID]);
    setExerciseContext({ ...exerciseContext, [newExerciseID]: newExercise });
    setName("");
    setSets("");
    setReps("");
    setWeight("");
    setFoundBoolean(false);
  };

  // const addDay = (e) => {
  //   e.preventDefault();
  // setWorkoutsContext({
  //   ...workoutsContext,
  //   [day]: { completed: true, workouts: exerciseIDs, rest: rest },
  // });
  //   setExerciseContext([...exerciseContext, ...unsavedExercises]);
  //   setUnsavedExercises([]);
  //   setWorkoutSaved(true);
  // };

  // const closeWorkoutSaved = (e) => {
  //   e.preventDefault();
  //   setWorkoutSaved(false);
  // };

  const debug = (e) => {
    console.log(exerciseContext);
  };

  return (
    <div className={styles.card}>
      <h1 className="text-center text-3xl font-semibold mt-10">{day}</h1>
      <div
        className={`${styles.buttons} z-0 pt-4 ${
          foundBoolean ? " pointer-events-none blur" : ""
        }`}
      >
        {!modal ? (
          <Button
            onClick={() => setModal(!modal)}
            className="min-w-[110px] text-lg bg-main hover:bg-main-foreground hover:text-foreground"
          >
            Add
          </Button>
        ) : (
          <Button
            onClick={() => setModal(!modal)}
            className="min-w-[110px] text-lg bg-main hover:bg-main-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        )}
        {!rest ? (
          <Button
            onClick={() => setRest(!rest)}
            className="min-w-[110px] text-lg"
          >
            Rest?
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="min-w-[110px] text-lg"
            onClick={() => setRest(!rest)}
          >
            Rest
          </Button>
        )}
        {/* <Button onClick={debug} className="min-w-[69px]">
          Debug
        </Button> */}
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
          <Button
            type="submit"
            className="bg-main hover:bg-main-foreground hover:text-foreground"
          >
            <FaPlus />
          </Button>
        </form>
      )}

      {foundBoolean && (
        <div className={`${styles.foundContainer} z-10 w-1/2`}>
          <h2>Found Exercises</h2>
          <div className="flex flex-col gap-4 mt-4 overflow-y-scroll no-scrollbar h-64">
            {foundExercises.map((exercise) => (
              <FoundExercise
                exercise={exercise}
                setFoundBoolean={setFoundBoolean}
                foundBoolean={foundBoolean}
                addChosen={addChosen}
                key={exercise.id}
              />
            ))}
            <Button
              onClick={() => createNewExercise()}
              className="bg-main hover:bg-main-foreground hover:text-foreground"
            >
              Create New Exercise
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setFoundBoolean(false);
                setName("");
                setSets("");
                setReps("");
                setWeight("");
              }}
              className=""
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div
        className={
          (rest || foundBoolean ? "blur pointer-events-none" : "") +
          " overflow-y-scroll h-full w-full mx-0 my-4 no-scrollbar z-0"
        }
      >
        {!workouts.length && !foundBoolean && (
          <div className="mt-32 text-2xl font-semibold">
            Please add workouts or mark {day} as a rest day!
          </div>
        )}
        {!foundBoolean &&
          workouts.map((workout) => (
            <article
              className={`${styles.workouts} z-0 md:text-lg ${
                foundBoolean ? " pointer-events-none " : ""
              }`}
              key={workout.id}
            >
              <h1 className="justify-self-start">{workout.name}</h1>
              <h1>{workout.sets}</h1>
              <h1>{workout.reps}</h1>
              <h1>{workout.weight}</h1>
              <Button
                variant="ghost"
                className={styles.trash}
                onClick={(e) => {
                  e.preventDefault();
                  setWorkouts(workouts.filter((w) => w.id !== workout.id));
                }}
              >
                <FaTrashAlt />
              </Button>
            </article>
          ))}
      </div>
    </div>
  );
}

export default WorkoutDay;
