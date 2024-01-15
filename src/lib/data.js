import { auth } from "./auth";
import { User, Workout } from "./models";
import { connectToDb } from "./utils";

export const getWorkouts = async () => {
  const session = await auth();
  const userEmail = session.user?.email;
  connectToDb();
  try {
    const user = await User.findOne({ email: userEmail });
    return Object.fromEntries(user.workouts)
  } catch (error) {
    console.log(error);
  }
};
