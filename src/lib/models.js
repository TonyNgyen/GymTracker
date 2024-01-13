import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    workouts: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "No Name",
  },
  creator: {
    type: String,
    required: true,
    default: "No Creator",
  },
  workouts: {},
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Workout =
  mongoose.models?.Workout || mongoose.model("Workout", workoutSchema);
