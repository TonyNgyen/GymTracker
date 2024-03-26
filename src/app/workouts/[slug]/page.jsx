import WorkoutSlug from "@/components/workoutSlug/workoutSlug";
import { getWorkout, getExercises } from "@/lib/data";
import React from "react";
import styles from "./slug.module.css";
import { NewExercisesContext, ExercisesContext } from "./context";

async function SingleWorkoutPage({ params }) {
  const { slug } = params;
  const workout = await getWorkout(slug);
  const exercises = await getExercises();

  const [newExercisesContext, setNewExercisesContext] = useState(workout);
  const [exercisesContext, setExercisesContext] = useState(exercises);

  return (
    <ExercisesContext.Provider
      value={[exercisesContext, setExercisesContext]}
    >
      <NewExercisesContext.Provider value={[newExercisesContext, setNewExercisesContext]}>
        <div>
          <h1 className="text-center my-10 text-5xl font-bold">
            {workout.name}
          </h1>
          <div className={styles.slugContainer}>
            {Object.keys(workout.workouts).map((day) => (
              <WorkoutSlug
                day={day}
                workout={workout}
                key={day}
              />
            ))}
          </div>
        </div>
      </NewExercisesContext.Provider>
    </ExercisesContext.Provider>
  );
}

export default SingleWorkoutPage;
