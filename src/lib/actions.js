"use server";

import { Workout, User, DevLog } from "./models";
import { connectToDb } from "./mongo";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { makeid } from "./utils";

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
    console.log("saved to db");
    revalidatePath("/workouts");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const validateWorkoutId = async (previousState, formData) => {
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

export const addWorkout = async (name, workout, exercises) => {
  const session = await auth();
  connectToDb();
  try {
    const newWorkout = new Workout({
      id: makeid(),
      name: name,
      creator: session.user?.email,
      workouts: workout,
    });
    await newWorkout.save();
    await User.findOneAndUpdate(
      { email: session.user?.email },
      {
        $set: {
          [`workouts.${name}`]: newWorkout,
          exercises: exercises,
        },
      }
    );
    console.log("Added new workout");
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
    console.log("updated workout to db");
  } catch (error) {
    console.log(error);
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
    console.log("Added Exercises");
  } catch (error) {
    console.log("Failed to add exercises");
  }
};

export const updateExercises = async (exercises) => {
  console.log(exercises);
  const session = await auth();
  connectToDb();
  await User.findOneAndUpdate(
    { email: session.user?.email },
    {
      $set: { exercises: exercises },
    }
  );
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
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};
