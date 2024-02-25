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
