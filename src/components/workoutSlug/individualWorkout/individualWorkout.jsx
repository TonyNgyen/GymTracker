import React, { useState } from "react";
import { WorkoutContext } from "../context";

function IndividualWorkout(workout) {
  const [prevSets, setPrevSets] = useState("");
  const [prevReps, setPrevReps] = useState("");
  const [prevWeight, setPrevWeight] = useState("");

  const [newSets, setNewSets] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newWeight, setNewWeight] = useState("");

  return <div>IndividualWorkout</div>;
}

export default IndividualWorkout;
