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
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
      type: Map,
      default: {},
    },
    exercises: {
      type: Map,
      default: {},
    },
    workoutHistory: {
      type: Map,
      default: {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastWorkout: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
  dateCreated: {
    type: String,
  },
  dateLast: {
    type: String,
  },
  currentWorkout: {
    type: Number,
  },
  workouts: {},
  history: {},
});

const devlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Workout =
  mongoose.models?.Workout || mongoose.model("Workout", workoutSchema);
export const DevLog =
  mongoose.models?.DevLog || mongoose.model("DevLog", devlogSchema);

//https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7
//https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
