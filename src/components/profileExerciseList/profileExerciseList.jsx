import React from "react";

function ProfileExerciseList({ exercises }) {
  console.log(exercises);
  return <div>{Object.keys(exercises).map((exercise) => <div>{exercises[exercise].name}</div>)}</div>;
}

export default ProfileExerciseList;
