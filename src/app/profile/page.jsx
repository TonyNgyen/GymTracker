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
      <div className={`w-[90vw] flex flex-col gap-2 ${styles.container}`}>
        <ProfileCard user={user} />
        <div className="flex w-full gap-2">
          <ProfileTotalWeight exercises={user.exercises} />
          <ProfileStreak streak={user.streak} />
        </div>

        <ProfileExerciseList exercises={user.exercises} />
        <ProfileChart exercises={user.exercises} />
        <ProfileWorkoutHistory workoutHistory={user.workoutHistory} />
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}

export default ProfilePage;
