import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import styles from "./mainExercise.module.css";
import { ExercisesContext } from "../exerciseListContainer/context";
import { updateExercises } from "@/lib/actions";
import { format } from "date-fns";

function MainExercise({ exercise }) {
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(exercise.weight);
  const date = format(new Date(), "P");

  useEffect(() => {
    updateExercises(exercisesContext);
  }, [exercisesContext]);

  const confirmEditSubmit = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    let copyExercises = {};
    for (let exerciseIndex in exercisesContext) {
      if (exercisesContext[exerciseIndex].id == exercise.id) {
        let historyEdit = exercise.history;
        historyEdit[date] = weight;
        copyExercises[exercise.id] = {
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
          history: historyEdit,
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
        let historyEdit = exercise.history;
        historyEdit[date] = weight;
        copyExercises[exercise.id] = {
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: weight,
          history: historyEdit,
        };
      } else {
        copyExercises[exerciseIndex] = exercisesContext[exerciseIndex];
      }
    }
    setExercisesContext(copyExercises);
  };

  return (
    <tr className={`${styles.tableRow} text-xl text-center bg-cardBG`}>
      <td className={`${styles.exerciseName} md:pl-[4.2rem] pl-5 w-36`}>
        {exercise.name}
      </td>
      <td className={styles.middle}>{exercise.sets}</td>
      <td className={styles.middle}>{exercise.reps}</td>
      <td className={styles.weight}>
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
              className="w-[40px] text-center border-separate border-b-2 border-white bg-transparent"
            />
          </form>
        )}
      </td>
      <div className="relative">
        {!editToggle ? (
          <h2
            className={`text-main hover:text-foreground absolute ml-4 md:ml-6 cursor-pointer text-2xl ${styles.editNew}`}
            onClick={() => setEditToggle(!editToggle)}
          >
            <FaEdit />
          </h2>
        ) : (
          <h2
            className={`text-greenConfirm hover:text-foreground absolute ml-4 md:ml-6 cursor-pointer text-2xl ${styles.editNew}`}
            onClick={confirmEditClick}
          >
            <FaCheck />
          </h2>
        )}
      </div>
    </tr>
  );
}

export default MainExercise;
