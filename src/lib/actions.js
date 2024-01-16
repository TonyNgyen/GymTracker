"use server";

import { Workout, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export const addWorkout = async (id, name, creator, workout) => {
  const session = await auth();
  connectToDb();
  try {
    const newWorkout = new Workout({
      id: id,
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
        },
      }
    );
    console.log("saved to db");
    revalidatePath("/workouts");
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
