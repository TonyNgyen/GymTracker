"use client";

import React, { useState } from "react";
import styles from "./workoutSlug.module.css";
import { updateWorkout } from "@/lib/actions";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

function WorkoutSlug({ workout, day }) {
  const originalWorkouts = workout.workouts[day].workouts;
  const [drop, setDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editWorkout, setEditWorkout] = useState("");

  const [rest, setRest] = useState(false);

  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [newName, setNewName] = useState("");
  const [newSets, setNewSets] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const [newWorkouts, setNewWorkouts] = useState(originalWorkouts);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const editSelect = (workoutId) => {
    setEditWorkout(workoutId);
    setEdit(!edit);
  };

  const editWorkouts = (workoutId, sets, reps, weight) => {
    editSelect(workoutId);
    let copyWorkouts = [];
    newWorkouts.map((workout) => {
      if (workout.id == workoutId) {
        copyWorkouts = [
          ...copyWorkouts,
          {
            id: workoutId,
            name: workout.name,
            sets: sets,
            reps: reps,
            weight: weight,
          },
        ];
      } else {
        copyWorkouts = [...copyWorkouts, workout];
      }
    });
    setNewWorkouts(copyWorkouts);
    setSets("");
    setReps("");
    setWeight("");
  };

  // FINISH METHOD
  const addWorkout = (e) => {
    e.preventDefault();
    setNewWorkouts([
      ...newWorkouts,
      {
        id: newWorkouts.length,
        name: newName,
        sets: newSets,
        reps: newReps,
        weight: newWeight,
      },
    ]);
    setNewName("");
    setNewSets("");
    setNewReps("");
    setNewWeight("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <h1 className="flex">
            <h1 className={styles.dayHeader}>{day}</h1>
            <button
              onClick={() =>
                updateWorkout(workout.id, workout.name, newWorkouts, day)
              }
            >
              <FaCheck />
            </button>
          </h1>
          {drop ? (
            <button onClick={() => setDrop(!drop)}>
              <IoIosArrowUp />
            </button>
          ) : (
            <button onClick={() => setDrop(!drop)}>
              <IoIosArrowDown />
            </button>
          )}
        </div>
        {drop && (
          <div className={styles.workoutContainer}>
            <div className={styles.workoutHeader}>
              <h1 className={styles.empty}></h1>
              <h1 className={styles.headers}>Workouts</h1>
              <h1 className={styles.headers}>Sets</h1>
              <h1 className={styles.headers}>Reps</h1>
              <h1 className={styles.headers}>Weight</h1>
              <button className={styles.add} onClick={toggle}>
                +
              </button>
            </div>
            {modal && (
              <form className={styles.addHeader}>
                <h1 className={styles.empty}></h1>
                <input
                  value={newName}
                  type="text"
                  placeholder="Workout"
                  className={styles.addInputs}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <input
                  value={newSets}
                  type="number"
                  placeholder="Sets"
                  className={styles.addInputs}
                  onChange={(e) => {
                    setNewSets(e.target.value);
                  }}
                />
                <input
                  value={newReps}
                  type="number"
                  placeholder="Reps"
                  className={styles.addInputs}
                  onChange={(e) => {
                    setNewReps(e.target.value);
                  }}
                />
                <input
                  value={newWeight}
                  type="number"
                  placeholder="Weight"
                  className={styles.addInputs}
                  onChange={(e) => {
                    setNewWeight(e.target.value);
                  }}
                />
                <button
                  className={styles.add + " text-2xl font-bold"}
                  onClick={addWorkout}
                >
                  +
                </button>
              </form>
            )}
            {newWorkouts.map((workout) => (
              <div key={workout.id}>
                {workout.id == editWorkout && edit ? (
                  <form className={styles.workouts}>
                    <button
                      onClick={() =>
                        editWorkouts(workout.id, sets, reps, weight)
                      }
                      className={styles.edit}
                    >
                      <FaEdit />
                    </button>
                    <h1 className={styles.stats}>{workout.name}</h1>
                    <input
                      type="number"
                      name="sets"
                      id=""
                      onChange={(e) => {
                        setSets(e.target.value);
                      }}
                      placeholder="Sets"
                      value={sets}
                      className={styles.inputs}
                    />
                    <input
                      type="number"
                      name="reps"
                      id=""
                      onChange={(e) => {
                        setReps(e.target.value);
                      }}
                      placeholder="Reps"
                      value={reps}
                      className={styles.inputs}
                    />
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
                    <button className={styles.edit}>
                      <FaTrashAlt />
                    </button>
                  </form>
                ) : (
                  <div className={styles.workouts}>
                    <button
                      onClick={() => editSelect(workout.id)}
                      className={styles.edit}
                    >
                      <FaEdit />
                    </button>
                    <h1 className={styles.stats}>{workout.name}</h1>
                    <h1 className={styles.stats}>{workout.sets}</h1>
                    <h1 className={styles.stats}>{workout.reps}</h1>
                    <h1 className={styles.stats}>{workout.weight}</h1>
                    <button
                      className={styles.edit}
                      onClick={(e) => {
                        e.preventDefault();
                        setNewWorkouts(
                          newWorkouts.filter((w) => w.id !== workout.id)
                        );
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutSlug;
