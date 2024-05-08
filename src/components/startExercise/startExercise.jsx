import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./startExercise.module.css";
import { ExercisesContext } from "@/app/workouts/[slug]/start/context";
import { Button } from "../ui/button";
import { FaCheck, FaEdit } from "react-icons/fa";
import { updateExercises } from "@/lib/actions";

function StartExercise({ exercise }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const isFirstRender = useRef(true)
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(exercise.weight);
  const [submitWeight, setSubmitWeight] = useState(0);

  useEffect(() => {
    if (!isFirstRender.current) {
      updateExercises(exercisesContext);
    } else {
      isFirstRender.current = false;
    }
  }, [submitWeight]);

  const confirmEditSubmit = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    let copyExercises = {};
    for (let exerciseIndex in exercisesContext) {
      if (exercisesContext[exerciseIndex].id == exercise.id) {
        copyExercises[exercise.id] = {
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
        };
      } else {
        copyExercises[exerciseIndex] = exercisesContext[exerciseIndex];
      }
    }
    setExercisesContext(copyExercises);
    setSubmitWeight(!submitWeight);
  };

  const confirmEditClick = () => {
    setEditToggle(!editToggle);
    let copyExercises = {};
    for (let exerciseIndex in exercisesContext) {
      if (exercisesContext[exerciseIndex].id == exercise.id) {
        copyExercises[exercise.id] = {
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
        };
      } else {
        copyExercises[exerciseIndex] = exercisesContext[exerciseIndex];
      }
    }
    setExercisesContext(copyExercises);
    setSubmitWeight(!submitWeight);
  };
  return (
    <div className="flex flex-auto flex-col gap-5">
      <div className={`${styles.workouts} text-xl w-full`}>
        <h1 className={styles.stats}>{exercise.reps}</h1>
        <h1 className={styles.stats}>
          {!editToggle ? (
            exercise.weight
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
