import Link from "next/link";
import React from "react";

function WorkoutsPage() {
  return (
    <div>
      <Link
        href="/workouts/add"
        className="py-2 px-4 bg-white text-black rounded-full"
      >
        Add Workout
      </Link>
    </div>
  );
}

export default WorkoutsPage;
