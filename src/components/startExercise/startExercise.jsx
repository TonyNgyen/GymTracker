import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./startExercise.module.css";
import {
  ExercisesContext,
  StartWorkoutContext,
  CurrentExerciseContext,
} from "@/app/workouts/[slug]/start/context";
import { Button } from "../ui/button";
import { FaCheck, FaEdit } from "react-icons/fa";
import { updateExercises } from "@/lib/actions";
import { useLocalStorage, useSessionStorage } from "@/lib/utils";

function StartExercise({ set }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);
  const [currentExerciseContext, setCurrentExerciseContext] = useContext(
    CurrentExerciseContext
  );
  const isFirstRender = useRef(true);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(set.weight);
  const [reps, setReps] = useState(set.reps);
  const [submitWeight, setSubmitWeight] = useState(0);
  const {
    setItem: setStartWorkoutItem,
    getItem: getStartWorkoutItem,
    removeItem: removeStartWorkoutItem,
  } = useSessionStorage("StartWorkout");
  
  // useEffect(() => {
  //   if (!isFirstRender.current) {
  //     updateExercises(exercisesContext);
  //   } else {
  //     isFirstRender.current = false;
  //   }
  // }, [submitWeight]);

  useEffect(() => {
    setStartWorkoutItem(startWorkoutContext);
  }, [startWorkoutContext]);

  const confirmEditSubmit = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    let exerciseID = set.id;
    let setID = set.set;
    setStartWorkoutContext({
      ...startWorkoutContext,
      [exerciseID]: {
        ...startWorkoutContext[exerciseID],
        [setID]: {
          ...startWorkoutContext[exerciseID][setID],
          reps: reps,
          weight: weight,
        },
      },
    });
    setSubmitWeight(!submitWeight);
  };

  const confirmEditClick = () => {
    setEditToggle(!editToggle);
    let exerciseID = set.id;
    let setID = set.set;
    setStartWorkoutContext({
      ...startWorkoutContext,
      [exerciseID]: {
        ...startWorkoutContext[exerciseID],
        [setID]: {
          ...startWorkoutContext[exerciseID][setID],
          reps: reps,
          weight: weight,
        },
      },
    });
    setSubmitWeight(!submitWeight);
  };
  return (
    <div className="flex flex-auto flex-col gap-5">
      <div
        className={`${styles.workouts} text-xl w-full ${
          currentExerciseContext[set.id] == set.set
            ? ""
            : "opacity-40 pointer-events-none"
        }`}
      >
        {!editToggle ? (
          <>
            <h1 className={styles.stats}>{set.reps}</h1>
            <h1 className={styles.stats}>{set.weight}</h1>
            <Button
              className={`${styles.edit} bg-main hover:bg-main-foreground hover:text-foreground`}
              onClick={() => setEditToggle(!editToggle)}
            >
              <FaEdit />
            </Button>
          </>
        ) : (
          <>
            <h1 className={styles.stats}>
              <form className="text-center" onSubmit={confirmEditSubmit}>
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
              </form>
            </h1>
            <h1 className={styles.stats}>
              <form className="text-center" onSubmit={confirmEditSubmit}>
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
              </form>
            </h1>
            <Button
              className={`${styles.edit} bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground`}
              onClick={confirmEditClick}
            >
              <FaCheck />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default StartExercise;
