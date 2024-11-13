"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/lib/data";
import styles from "./profile.module.css";
import ProfileExerciseList from "@/components/profile/profileExerciseList/profileExerciseList";
import ProfileChart from "@/components/profile/profileChart/profileChart";
import ProfileWorkoutHistory from "@/components/profile/profileWorkoutHistory/profileWorkoutHistory";
import ProfileTotalWeight from "@/components/profile/profileTotalWeight/profileTotalWeight";
import ProfileStreak from "@/components/profile/profileStreak/profileStreak";
import ProfileCard from "@/components/profile/profileCard/profileCard";

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
    // <div className="flex flex-col items-center justify-center">
    //   <div
    //     className={`w-[90vw] flex flex-col gap-2 ${styles.container} lg:grid lg:grid-cols-3 lg:mx-auto lg:w-[70vw]`}
    //   >
    //     <div className="lg:col-span-1 flex flex-col gap-2">
    //       <ProfileCard user={user} />
    //       <div className="flex gap-2">
    //         <ProfileTotalWeight exercises={user.exercises} />
    //         <ProfileStreak streak={user.streak} />
    //       </div>
    //       <ProfileExerciseList exercises={user.exercises} />
    //     </div>
    //     <div className="lg:col-span-2 flex flex-col gap-2">
    //       <ProfileChart exercises={user.exercises} />
    //       <ProfileWorkoutHistory workoutHistory={user.workoutHistory} />
    //     </div>
    //   </div>
    // </div>
    <div className={`bg-red-900 flex ${styles.container}`}>
      <div className="h-full w-1/2 bg-blue-900">
        <div className="h-[30%] w-full bg-green-900">
          <ProfileCard user={user} />
        </div>
        <div className="h-[20%] w-full bg-purple-900 flex">
          <div className="w-1/2">
            <ProfileTotalWeight exercises={user.exercises} />
          </div>
          <div className="w-1/2">
            <ProfileStreak streak={user.streak} />
          </div>
        </div>
        <div className="bg-purple-900 h-1/2 w-full">
          <ProfileExerciseList exercises={user.exercises} />
        </div>
      </div>
      <div className="h-full w-1/2 bg-green-900">
        <div className="h-1/2 w-full bg-red-900">
          <ProfileChart exercises={user.exercises} />
        </div>
        <div className="h-1/2 w-full bg-yellow-900">
          <ProfileWorkoutHistory workoutHistory={user.workoutHistory} />
        </div>
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}

export default ProfilePage;
