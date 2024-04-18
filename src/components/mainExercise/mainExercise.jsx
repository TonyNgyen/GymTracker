import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaEdit, FaCheck } from "react-icons/fa";
import styles from "./mainExercise.module.css";
import { ExercisesContext } from "../exerciseList/context";
import { updateExercises } from "@/lib/actions";

function MainExercise({ exercise }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(exercise.weight);

  useEffect(() => {
    updateExercises(exercisesContext)
  }, [exercisesContext])

  const confirmEditSubmit = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    let copyExercises = [];
    for (let exerciseIndex in exercisesContext) {
      if (exercisesContext[exerciseIndex].id == exercise.id) {
        copyExercises.push({
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
        });
      } else {
        copyExercises.push(exercisesContext[exerciseIndex]);
      }
    }
    setExercisesContext(copyExercises);
  };

  const confirmEditClick = () => {
    setEditToggle(!editToggle);
    let copyExercises = [];
    for (let exercise in exercisesContext) {
      if (exercisesContext[exercise].id == exercise.id) {
        copyExercises.push({
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
        });
      } else {
        copyExercises.push(exercisesContext[exercise]);
      }
    }
    setExercisesContext(copyExercises);
  };
  
  return (
    <div className={`${styles.workouts} text-xl`}>
      <h1 className={styles.stats}>{exercise.name}</h1>
      <h1 className={styles.stats}>{exercise.sets}</h1>
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
  );
}

export default MainExercise;
