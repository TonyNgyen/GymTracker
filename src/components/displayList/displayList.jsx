import React from 'react'
import styles from "./displayList.module.css"
import WorkoutSlug from '../workoutSlug/workoutSlug'
import DisplayDay from '../displayDay/displayDay'

function DisplayWorkout({ workout, exercises }) {
  return (
    <div className={styles.slugContainer}>
    {Object.keys(workout.workouts).map((day) => (
      <DisplayDay day={day} workout={workout.workouts[day]} key={day} exercises={exercises} />
    ))}
  </div>
  )
}

export default DisplayWorkout