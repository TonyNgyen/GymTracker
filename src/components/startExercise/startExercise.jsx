import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./startExercise.module.css";
import {
  ExercisesContext,
  StartWorkoutContext,
} from "@/app/workouts/[slug]/start/context";
import { Button } from "../ui/button";
import { FaCheck, FaEdit } from "react-icons/fa";
import { updateExercises } from "@/lib/actions";

function StartExercise({ set }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);
  const isFirstRender = useRef(true);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(set.weight);
  const [submitWeight, setSubmitWeight] = useState(0);
  console.log(startWorkoutContext);

  // useEffect(() => {
  //   if (!isFirstRender.current) {
  //     updateExercises(exercisesContext);
  //   } else {
  //     isFirstRender.current = false;
  //   }
  // }, [submitWeight]);

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
          weight: weight,
        },
      },
    });
    setSubmitWeight(!submitWeight);
  };
  return (
    <div className="flex flex-auto flex-col gap-5">
      <div className={`${styles.workouts} text-xl w-full`}>
        <h1 className={styles.stats}>{set.reps}</h1>
        <h1 className={styles.stats}>
          {!editToggle ? (
            set.weight
          ) : (
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
          )}
        </h1>
        {!editToggle ? (
          <Button
            className={`${styles.edit} bg-main hover:bg-main-foreground hover:text-foreground`}
            onClick={() => setEditToggle(!editToggle)}
          >
            <FaEdit />
          </Button>
        ) : (
          <Button
            className={`${styles.edit} bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground`}
            onClick={confirmEditClick}
          >
            <FaCheck />
          </Button>
        )}
      </div>
    </div>
  );
}

export default StartExercise;
