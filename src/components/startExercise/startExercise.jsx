import React, { useContext, useState, useEffect } from "react";
import styles from "./startExercise.module.css";
import {
  ExercisesContext,
  StartWorkoutContext,
  CurrentExerciseContext,
} from "@/app/workouts/[slug]/start/context";
import { Button } from "../ui/button";
import { FaCheck, FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { updateSpecificExercise } from "@/lib/actions";
import { useLocalStorage } from "@/lib/utils";
import AutosizeInput from "react-input-autosize";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

function StartExercise({ set, savedWeight }) {
  const [startWorkoutContext, setStartWorkoutContext] =
    useContext(StartWorkoutContext);
  const [currentExerciseContext, setCurrentExerciseContext] = useContext(
    CurrentExerciseContext
  );
  const [exercisesContext, setExercisesContext] = useContext(ExercisesContext);
  const [updatedWeight, setUpdatedWeight] = useState(savedWeight);
  const [editToggle, setEditToggle] = useState(false);
  const [weight, setWeight] = useState(set.weight);
  const [previousWeight, setPreviousWeight] = useState(set.weight);
  const [previousReps, setPreviousReps] = useState(set.reps);
  const [reps, setReps] = useState(set.reps);
  const [showDialog, setShowDialog] = useState(false);
  const date = format(new Date(), "P");

  const {
    setItem: setStartWorkoutItem,
    getItem: getStartWorkoutItem,
    removeItem: removeStartWorkoutItem,
  } = useLocalStorage("StartWorkout");

  useEffect(() => {
    setStartWorkoutItem(startWorkoutContext);
  }, [startWorkoutContext]);

  const completeRep = () => {
    let currentExercise = currentExerciseContext[set.id];
    let exerciseID = set.id;
    let setID = set.set;
    setCurrentExerciseContext({
      ...currentExerciseContext,
      [set.id]: currentExercise + 1,
    });
    setStartWorkoutContext({
      ...startWorkoutContext,
      [exerciseID]: {
        ...startWorkoutContext[exerciseID],
        [setID]: {
          ...startWorkoutContext[exerciseID][setID],
          completed: true,
        },
      },
    });
  };

  const confirmEditSubmit = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    let exerciseID = set.id;
    let setID = set.set;
    setStartWorkoutContext({
      ...startWorkoutContext,
      [exerciseID]: {
        ...startWorkoutContext[exerciseID],
        [setID]: {
          ...startWorkoutContext[exerciseID][setID],
          reps: reps,
          weight: weight,
        },
      },
    });
    setPreviousWeight(weight);
    setPreviousReps(reps);
    if (weight > exercisesContext[set.id].weight) {
      setShowDialog(true);
    }
  };

  const confirmEditClick = () => {
    setEditToggle(!editToggle);
    let exerciseID = set.id;
    let setID = set.set;
    setStartWorkoutContext({
      ...startWorkoutContext,
      [exerciseID]: {
        ...startWorkoutContext[exerciseID],
        [setID]: {
          ...startWorkoutContext[exerciseID][setID],
          reps: reps,
          weight: weight,
        },
      },
    });
    setPreviousWeight(weight);
    setPreviousReps(reps);
    if (weight > exercisesContext[set.id].weight) {
      setShowDialog(true);
    }
  };

  const cancelEdit = () => {
    setEditToggle(!editToggle);
    setWeight(previousWeight);
    setReps(previousReps);
  };

  console.log(exercisesContext);

  return (
    <div className="flex flex-auto flex-col gap-5">
      <div
        className={`text-xl w-full ${
          currentExerciseContext[set.id] == set.set
            ? ` ${styles.currentExercise}`
            : ` ${styles.workouts} opacity-40`
        }`}
      >
        {!editToggle ? (
          <>
            <AlertDialog open={showDialog}>
              <AlertDialogContent className="w-[80vw] rounded-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Weight Increase!</AlertDialogTitle>
                  <AlertDialogDescription>
                    The weight on this rep is a new PR! Would you like future
                    sets to use this weight?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowDialog(false)}>
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setShowDialog(false);
                      updateSpecificExercise(set.id, weight, date);
                      setUpdatedWeight(weight);
                      setExercisesContext({
                        ...exercisesContext,
                        [set.id]: {
                          ...exercisesContext[set.id],
                          weight: weight,
                        },
                      });
                    }}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <h1 className={styles.stats}>{set.reps}</h1>
            <h1 className={styles.stats}>{exercisesContext[set.id].weight}</h1>
            <div className={`${styles.edit} flex gap-3`}>
              <Button
                className={`bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground rounded-full md:h-11 md:w-11 ${
                  editToggle ? "opacity-40 pointer-events-none" : ""
                } ${
                  currentExerciseContext[set.id] != set.set
                    ? ` opacity-40 pointer-events-none`
                    : ``
                }`}
                onClick={() => completeRep()}
                size="icon"
              >
                <FaCheck />
              </Button>
              <Button
                className={`bg-main hover:bg-main-foreground hover:text-foreground md:h-11 md:w-11`}
                onClick={() => setEditToggle(!editToggle)}
                size="icon"
              >
                <FaEdit />
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.stats}>
              <form className="text-center" onSubmit={confirmEditSubmit}>
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
                    borderBottom: "2px solid white",
                    marginBottom: "-2px",
                  }}
                  style={{ background: "transparent" }}
                />
              </form>
            </h1>
            <h1 className={styles.stats}>
              <form className="text-center" onSubmit={confirmEditSubmit}>
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
                    borderBottom: "2px solid white",
                    marginBottom: "-2px",
                  }}
                  style={{ background: "transparent" }}
                />
              </form>
            </h1>
            <div className={`${styles.edit} flex gap-3`}>
              <Button
                className={`bg-destructive hover:bg-destructive-foreground hover:text-foreground md:h-11 md:w-11`}
                onClick={() => cancelEdit()}
                size="icon"
              >
                <ImCross />
              </Button>
              <Button
                className={`${styles.edit} bg-greenConfirm hover:bg-greenConfirm-foreground hover:text-foreground md:h-11 md:w-11`}
                onClick={confirmEditClick}
                size="icon"
              >
                <FaCheck />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StartExercise;
