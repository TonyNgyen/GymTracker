import React from "react";
import styles from "./foundExercise.module.css";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

function FoundExercise({ exercise, setFoundBoolean, addChosen }) {
  const chosen = (exerciseID, exercise) => {
    setFoundBoolean(false)
    addChosen(exerciseID, exercise)
  }
  return (
    <div className={styles.workouts}>
      <h1 className={styles.stats}>{exercise.name}</h1>
      <h1 className={styles.stats}>{exercise.sets}</h1>
      <h1 className={styles.stats}>{exercise.reps}</h1>
      <h1 className={styles.stats}>{exercise.weight}</h1>
      <Button className={`${styles.button} bg-main hover:bg-main-foreground hover:text-foreground`} onClick={() => chosen(exercise.id, exercise)}><FaPlus /></Button>
    </div>
  );
}

export default FoundExercise;
