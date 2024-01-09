"use server";

import { Workout } from "./models";
import { connectToDb } from "./utils";

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
