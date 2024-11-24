import React, { useState, useContext, useEffect } from "react";
import styles from "./editExercise.module.css";
import { FaTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
import { WorkoutContext, ExercisesContext } from "../editList/context";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AutosizeInput from "react-input-autosize";
import { format } from "date-fns";

function EditExercise({ exerciseID, day, index, needSaving, setNeedSaving }) {
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);

  let workout = {};

  for (let exercise in exercisesContext) {
    if (exercisesContext[exercise].id == exerciseID) {
      workout = exercisesContext[exercise];
    }
  }

  const [sets, setSets] = useState(workout.sets);
  const [reps, setReps] = useState(workout.reps);
  const [weight, setWeight] = useState(workout.weight);

  const [edit, setEdit] = useState(false);

  const [exerciseSelect, setExerciseSelect] = useState("");

  const editSelect = (exerciseID) => {
    setExerciseSelect(exerciseID);
    setEdit(!edit);
  };

  const editExercise = (exerciseID, name, sets, reps, weight) => {
    const date = format(new Date(), "P");
    editSelect(exerciseID);
    if (
      sets == workout.sets &&
      reps == workout.reps &&
      weight == workout.weight
    ) {
      return;
    }
    let copyExercises = exercisesContext;
    copyExercises[exerciseID] = {
      history: { ...exercisesContext[exerciseID].history, [date]: weight },
      id: exerciseID,
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    setExercisesContext(copyExercises);
    setNeedSaving(true);
  };

  const deleteWorkout = (workoutId) => {
    setWorkoutContext({
      ...workoutContext,
      workouts: {
        ...workoutContext.workouts,
        [day]: {
          ...workoutContext.workouts[day],
          workouts: workoutContext.workouts[day].workouts.filter(
            (w) => w !== workoutId
          ),
        },
      },
    });
    setNeedSaving(true);
  };

  return (
    <>
      {workout.id == exerciseSelect && edit ? (
        <tr
          className={`${
            styles.tableRow
          } text-xl text-center bg-cardBG relative ${
            index != workoutContext.workouts[day].workouts.length - 1 &&
            "border-b-foreground border"
          } border-transparent`}
        >
          <td className={`${styles.exerciseName} pl-4`}>{workout.name}</td>
          <td className={styles.middle}>
            <AutosizeInput
              type="number"
              name="sets"
              id=""
              onChange={(e) => {
                setSets(e.target.value);
              }}
              placeholder="Sets"
              value={sets}
              inputStyle={{
                textAlign: "center",
                background: "transparent",
                borderBottom: "2px solid hsl(var(--foreground)",
                marginBottom: "-2px",
              }}
            />
          </td>
          <td className={styles.middle}>
            <AutosizeInput
              type="number"
              name="reps"
              id=""
              onChange={(e) => {
                setReps(e.target.value);
              }}
              placeholder="Reps"
              value={reps}
              inputStyle={{
                textAlign: "center",
                background: "transparent",
                borderBottom: "2px solid hsl(var(--foreground)",
                marginBottom: "-2px",
              }}
            />
          </td>
          <td className={styles.weight}>
            <AutosizeInput
              type="number"
              name="weight"
              id=""
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              placeholder="Weight"
              value={weight}
              inputStyle={{
                textAlign: "center",
                background: "transparent",
                borderBottom: "2px solid hsl(var(--foreground)",
                marginBottom: "-2px",
              }}
            />
          </td>
          <FaCheck
            className={`absolute ${styles.delete} text-greenConfirm`}
            onClick={() =>
              editExercise(workout.id, workout.name, sets, reps, weight)
            }
          />
        </tr>
      ) : (
        <tr
          className={`${
            styles.tableRow
          } text-xl text-center bg-cardBG relative ${
            index != workoutContext.workouts[day].workouts.length - 1 &&
            "border-b-foreground border"
          } border-transparent`}
        >
          <td className={`${styles.exerciseName} pl-4`}>{workout.name}</td>
          <td className={styles.middle}>{sets}</td>
          <td className={styles.middle}>{reps}</td>
          <td className={styles.weight}>{weight}</td>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical
                className={`absolute ${styles.delete} text-gray-400`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem>
                <div
                  className="flex gap-2 justify-center items-center"
                  onClick={() => editSelect(workout.id)}
                >
                  <FaEdit className="text-main" />
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  deleteWorkout(workout.id);
                }}
              >
                <div className="flex gap-2 justify-center items-center">
                  <FaTrashAlt className="text-destructive" />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </tr>
      )}

      {index != workoutContext.workouts[day].workouts.length - 1 && (
        <div className="h-2"></div>
      )}
    </>
  );
}

export default EditExercise;
