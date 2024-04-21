import React from "react";

function DisplayExercise({ exerciseID, exercises }) {
  // console.log(exercise)
  let exercise;
  for (let exerciseIndex in exercises) {
    if (exercises[exerciseIndex].id == exerciseID) {
      exercise = exercises[exerciseIndex];
    }
  }
  return (
    <div className={styles.workouts}>
      <h1 className={styles.stats}>{exercise.name}</h1>
      <h1 className={styles.stats}>{exercise.sets}</h1>
      <h1 className={styles.stats}>{exercise.reps}</h1>
      <h1 className={styles.stats}>{exercise.weight}</h1>
    </div>
  );
}

export default DisplayExercise;
