"use client";

import React, { useContext, useState } from "react";
import styles from "./workoutSlug.module.css";
import { updateWorkout, updateExercises } from "@/lib/actions";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import EditExercise from "../editExercise/editExercise";
import { makeid } from "@/lib/utils";
import {
  ExercisesContext,
  NewExercisesContext,
  WorkoutContext,
} from "../editList/context";
import AutosizeInput from "react-input-autosize";

function WorkoutSlug({ workout, day }) {
  const tableHeaderStyle = "font-semibold px-4";
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [newExercisesContext, setNewExercisesContext] =
    useContext(NewExercisesContext);
  const [workoutContext, setWorkoutContext] = useContext(WorkoutContext);
  const [needSaving, setNeedSaving] = useState(false);

  const [exerciseIds, setExerciseIds] = useState(
    workout.workouts[day].workouts
  );

  const [drop, setDrop] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSets, setNewSets] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const addExercise = (e) => {
    e.preventDefault();
    const newExerciseId = makeid();

    setExerciseIds([...exerciseIds, newExerciseId]);

    setExercisesContext({
      ...exercisesContext,
      [newExerciseId]: {
        id: newExerciseId,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
        history: {},
      },
    });

    setWorkoutContext({
      ...workoutContext,
      workouts: {
        ...workoutContext.workouts,
        [day]: {
          ...workoutContext.workouts[day],
          workouts: [...workoutContext.workouts[day].workouts, newExerciseId],
        },
      },
    });

    setNewName("");
    setNewSets("");
    setNewReps("");
    setNewWeight("");
    setNeedSaving(true);
    setModal(false);
  };
  const updateDay = async (workoutID, workoutName, exercises, day) => {
    await updateWorkout(workoutID, workoutName, exercises, day);
    await updateExercises(exercisesContext);
    setNeedSaving(false);
  };

  return (
    <NewExercisesContext.Provider
      value={[newExercisesContext, setNewExercisesContext]}
    >
      <WorkoutContext.Provider value={[workoutContext, setWorkoutContext]}>
        <div className="">
          <div
            className={`styles.cardContainer border-2 border-exerciseBorder rounded-md px-4 py-5 bg-cardBG`}
          >
            <div className={`styles.textContainer flex justify-between mb-2`}>
              <div className="">
                <h1 className={`styles.dayHeader`}>
                  <p className="text-3xl">Day {day}</p>
                </h1>
              </div>
              {drop ? (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowUp className="text-3xl" />
                </button>
              ) : (
                <button onClick={() => setDrop(!drop)}>
                  <IoIosArrowDown className="text-3xl" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {needSaving && (
                <button
                  onClick={() =>
                    updateDay(
                      workout.id,
                      workout.name,
                      workoutContext.workouts[day].workouts,
                      day
                    )
                  }
                  className="bg-greenConfirm text-background py-1 px-2 rounded-md font-semibold"
                >
                  Save
                </button>
              )}

              {drop &&
                (!modal ? (
                  <button
                    onClick={() => setModal(true)}
                    className="bg-greenConfirm text-background py-1 px-2 rounded-md font-semibold"
                  >
                    Add Exercise
                  </button>
                ) : (
                  <button
                    onClick={() => setModal(false)}
                    className="bg-destructive text-background py-1 px-2 rounded-md font-semibold"
                  >
                    Cancel
                  </button>
                ))}
            </div>
            {drop && (
              <div className={`${styles.workoutContainer} mt-5`}>
                <table className={`${styles.table} w-full md:w-[90%]`}>
                  <thead>
                    <tr className="md:text-3xl text-lg border-b-foreground border border-transparent">
                      <th className={tableHeaderStyle}>Exercise</th>
                      <th className={tableHeaderStyle}>Sets</th>
                      <th className={tableHeaderStyle}>Reps</th>
                      <th className={tableHeaderStyle}>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modal && (
                      <tr
                        className={`${styles.tableRow} relative border-b-foreground border border-transparent`}
                      >
                        <td className={`${styles.exerciseName} pl-4`}>
                          <AutosizeInput
                            value={newName}
                            type="text"
                            placeholder="Workout"
                            inputStyle={{
                              textAlign: "center",
                              background: "transparent",
                              borderBottom: "2px solid hsl(var(--foreground)",
                              marginBottom: "-2px",
                            }}
                            onChange={(e) => {
                              setNewName(e.target.value);
                            }}
                          />
                        </td>
                        <td className={styles.middle}>
                          <AutosizeInput
                            value={newSets}
                            type="number"
                            placeholder="Sets"
                            inputStyle={{
                              textAlign: "center",
                              background: "transparent",
                              borderBottom: "2px solid hsl(var(--foreground)",
                              marginBottom: "-2px",
                            }}
                            onChange={(e) => {
                              setNewSets(e.target.value);
                            }}
                          />
                        </td>
                        <td className={styles.middle}>
                          <AutosizeInput
                            value={newReps}
                            type="number"
                            placeholder="Reps"
                            inputStyle={{
                              textAlign: "center",
                              background: "transparent",
                              borderBottom: "2px solid hsl(var(--foreground)",
                              marginBottom: "-2px",
                            }}
                            onChange={(e) => {
                              setNewReps(e.target.value);
                            }}
                          />
                        </td>
                        <td className={styles.weight}>
                          <AutosizeInput
                            value={newWeight}
                            type="number"
                            placeholder="Weight"
                            inputStyle={{
                              textAlign: "center",
                              background: "transparent",
                              borderBottom: "2px solid hsl(var(--foreground)",
                              marginBottom: "-2px",
                            }}
                            onChange={(e) => {
                              setNewWeight(e.target.value);
                            }}
                          />
                        </td>
                        <td
                          className={`absolute ${styles.delete} text-greenConfirm text-xl`}
                          onClick={addExercise}
                        >
                          <FaPlus />
                        </td>
                      </tr>
                    )}
                    {workoutContext.workouts[day].workouts.map(
                      (exercise, index) => (
                        <EditExercise
                          exerciseID={exercise}
                          day={day}
                          key={index}
                          index={index}
                          needSaving={needSaving}
                          setNeedSaving={setNeedSaving}
                        />
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </WorkoutContext.Provider>
    </NewExercisesContext.Provider>
  );
}

export default WorkoutSlug;
