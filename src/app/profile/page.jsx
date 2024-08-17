"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/lib/data";
import styles from "./profile.module.css";
import ProfileExerciseList from "@/components/profileExerciseList/profileExerciseList";
import ProfileChart from "@/components/profileChart/profileChart";
import ProfileWorkoutHistory from "@/components/profileWorkoutHistory/profileWorkoutHistory";
import ProfileTotalWeight from "@/components/profileTotalWeight/profileTotalWeight";
import ProfileStreak from "@/components/profileStreak/profileStreak";
import ProfileCard from "@/components/profileCard/profileCard";

function ProfilePage() {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchUser = await getUser();
        setUser(fetchUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return user != undefined ? (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-[90vw] flex flex-col gap-2 ${styles.container} lg:grid lg:grid-cols-3 lg:mx-auto lg:w-[70vw]`}
      >
        <div className="lg:col-span-1 flex flex-col gap-2">
          <ProfileCard user={user} />
          <div className="flex gap-2">
            <ProfileTotalWeight exercises={user.exercises} />
            <ProfileStreak streak={user.streak} />
          </div>
          <ProfileExerciseList exercises={user.exercises} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-2">
          <ProfileChart exercises={user.exercises} />
          <ProfileWorkoutHistory workoutHistory={user.workoutHistory} />
        </div>
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}

export default ProfilePage;
