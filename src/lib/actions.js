"use server";

import { Workout, User, DevLog } from "./models";
import { connectToDb } from "./mongo";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { makeid } from "./utils";
import { format } from "date-fns";

export const addLog = async (prevState, formData) => {
  const { title, desc, slug, username, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newDevLog = new DevLog({
      title,
      desc,
      slug,
      username,
      img,
    });

    await newDevLog.save();
    revalidatePath("/workouts");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const validateWorkoutName = async (previousState, formData) => {
  const { title } = Object.fromEntries(formData);
  if (title == "") {
    return { error: "Please fill in required fields" };
  }
  try {
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const validateWorkoutDays = async (prevState, formData) => {
  const { numOfDays } = Object.fromEntries(formData);
  if (numOfDays == "") {
    return { error: "Please fill in required fields" };
  }
  if (numOfDays < 1) {
    return { error: "Please put in a proper input" };
  }

  try {
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const addWorkout = async (name, workout, exercises, startDate) => {
  const session = await auth();
  connectToDb();
  try {
    const id = makeid();
    const newWorkout = new Workout({
      id: id,
      name: name,
      creator: session.user?.email,
      dateCreated: startDate,
      dateLast: startDate,
      currentWorkout: 1,
      workouts: workout,
    });
    await newWorkout.save();
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: {
          [`workouts.${id}`]: newWorkout,
          exercises: exercises,
        },
      }
    );
    revalidatePath("/workouts");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateWorkout = async (id, name, workout, day) => {
  const session = await auth();
  connectToDb();
  try {
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: {
          [`workouts.${name}.workouts.${day}.workouts`]: workout,
        },
      }
    );

    await Workout.findOneAndUpdate(
      { id: id },
      {
        $set: {
          [`workouts.${day}.workouts`]: workout,
        },
      }
    );
    revalidatePath("/workouts");
  } catch (error) {
    console.log(error);
  }
};

export const saveWorkoutHistory = async (workout, time) => {
  let workoutHistory = { exercises: workout, time: time + 1 };
  const session = await auth();
  connectToDb();
  try {
    const date = format(new Date(), "P");
    await User.findOneAndUpdate(
      {
        email: session.user?.email,
      },
      {
        $set: {
          [`workoutHistory.${date}`]: workoutHistory,
        },
      }
    );
    console.log("Saved Workout History");
  } catch (error) {
    console.log("Error for Saved Workout History");
  }
};

export const addExercises = async (exercises) => {
  const session = await auth();
  connectToDb();
  try {
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: { exercises: exercises },
      }
    );
  } catch (error) {
    console.log("Failed to add exercises");
  }
};

export const updateExercises = async (exercises) => {
  const session = await auth();
  connectToDb();
  await User.findOneAndUpdate(
    { email: session.user?.email },
    {
      $set: { exercises: exercises },
    }
  );
};

export const updateSpecificExercise = async (exercise, weight) => {
  try {
    const session = await auth();
    connectToDb();
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: { [`exercises.${exercise}.weight`]: weight },
      }
    );
    console.log("Successfully updated specific exercise!");
  } catch (error) {
    console.log("Unsuccessfully updated specific exercise!");
  }
};

export const changeCurrentWorkout = async (workout, day) => {
  try {
    const session = await auth();
    connectToDb();
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: {
          [`workouts.${workout}.currentWorkout`]: day,
        },
      },
      { new: false }
    );
    console.log("Successfully updated current workout!");
    revalidatePath("/workouts");
  } catch (error) {
    console.log("Unsuccessfully updated current workout!");
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

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }
  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      exercises: [],
    });

    await newUser.save();
    console.log("saved to db");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid Credentials" };
    }
    throw error;
  }
};
