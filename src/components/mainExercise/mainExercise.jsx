import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaEdit, FaCheck } from "react-icons/fa";
import styles from "./mainExercise.module.css";
import { ExercisesContext } from "../exerciseListContainer/context";
import { updateExercises } from "@/lib/actions";

function MainExercise({ exercise }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(exercise.weight);

  useEffect(() => {
    updateExercises(exercisesContext);
  }, [exercisesContext]);

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
  };

  return (
    <tr className={`${styles.tableRow} text-xl text-center bg-cardBG`}>
      <td className={`${styles.exerciseName} md:pl-[4.2rem] pl-5 w-36`}>{exercise.name}</td>
      <td className={styles.middle}>{exercise.sets}</td>
      <td className={styles.middle}>{exercise.reps}</td>
      <td className={styles.middle}>
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
      </td>
      <td className={`${styles.edit} md:p-8 py-8`}>
        {!editToggle ? (
          <Button
            className={`bg-main hover:bg-main-foreground hover:text-foreground`}
            onClick={() => setEditToggle(!editToggle)}
          >
            <FaEdit />
          </Button>
        ) : (
          <Button
            className={`bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground`}
            onClick={confirmEditClick}
          >
            <FaCheck />
          </Button>
        )}
      </td>
    </tr>
  );
}

export default MainExercise;
