import React, { useContext } from 'react'
import { WorkoutContext, ExercisesContext } from '@/app/workouts/[slug]/start/context'

function StartExerciseList() {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  return (
    <div>StartExerciseList</div>
  )
}

export default StartExerciseList