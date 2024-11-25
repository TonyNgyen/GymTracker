"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/lib/data";
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
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex md:h-[calc(100vh-200px)] gap-2 flex-col md:flex-row md:w-full w-[90vw] md:p-4`}
      >
        <div className="h-full md:w-1/2 flex flex-col gap-2">
          <div className="h-1/2 w-full flex flex-col gap-2">
            <div className="h-[60%] w-full ">
              <ProfileCard user={user} />
            </div>
            <div className="h-[40%] w-full flex gap-2">
              <div className="w-1/2 ">
                <ProfileTotalWeight exercises={user.exercises} />
              </div>
              <div className="w-1/2 ">
                <ProfileStreak streak={user.streak} />
              </div>
            </div>
          </div>

          <div className="h-1/2 w-full  overflow-hidden">
            <ProfileExerciseList exercises={user.exercises} />
          </div>
        </div>
        <div className="h-full md:w-1/2 flex flex-col gap-2">
          <div className="md:h-1/2 w-full  overflow-hidden">
            <ProfileChart exercises={user.exercises} />
          </div>
          <div className="md:h-1/2 w-full overflow-hidden">
            <ProfileWorkoutHistory workoutHistory={user.workoutHistory} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}

export default ProfilePage;
