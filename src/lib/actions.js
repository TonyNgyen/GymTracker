"use server";

import { Workout, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export const addWorkout = async (id, name, creator, workout) => {
  connectToDb();
  try {
    const newWorkout = new Workout({
      id: id,
      name: name,
      creator: creator,
      workouts: workout,
    });
    await newWorkout.save();
    console.log("saved to db");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async (e) => {
  "use server";
  await signIn("github");
};

export const handleLogout = async (e) => {
  "use server";
  await signOut();
};