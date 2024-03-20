"use server";

import { auth } from "./auth";
import { DevLog, User, Workout } from "./models";
import { connectToDb } from "./mongo";
import { unstable_noStore as noStore } from "next/cache";

export const getWorkouts = async () => {
  const session = await auth();
  const userEmail = session.user?.email;
  connectToDb();
  try {
    const user = await User.findOne({ email: userEmail });
    return Object.fromEntries(user.workouts);
  } catch (error) {
    console.log(error);
  }
};

export const getExercises = async () => {
  const session = await auth();
  const userEmail = session.user?.email;
  connectToDb();
  try {
    const user = await User.findOne({ email: userEmail });
    return user.exercises;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkout = async (id) => {
  noStore();
  try {
    connectToDb();
    const workout = await Workout.findOne({ id: id });
    return workout;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch workout!");
  }
};

// export const getExercises = async (exerciseIDs) => {
//   const session = await auth();
//   const userEmail = session.user?.email;
//   const exercises = [];
//   connectToDb();
//   try {
//     const user = await User.findOne({email: userEmail});
//     const allExercises = Object.fromEntries(user.execises);
//     exerciseIDs.map(id => {
//       allExercises.map(exercise => {
//         if (id == exercise.id) {
//           exercises.push(exercise);
//         }
//       })
//     })
//     return exercises;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getDevLogs = async () => {
  try {
    connectToDb();
    const devLogs = await DevLog.find();
    return devLogs;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch devLogs");
  }
};
