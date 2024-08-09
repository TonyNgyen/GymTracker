"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/lib/data";
import styles from "./profile.module.css";
import ProfileExerciseList from "@/components/profileExerciseList/profileExerciseList";

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
    <div className={styles.container}>
      {user.username}
      <ProfileExerciseList exercises={user.exercises} />
    </div>
  ) : (
    <>Loading</>
  );
}

export default ProfilePage;
