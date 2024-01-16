import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About Description",
};

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About GymTracker</h2>
        <h1 className={styles.title}>
          You create the workouts. GymTracker helps track and elevate them.
        </h1>
        <p className={styles.desc}>
          GymTracker helps you reach your fitness goals by helping you track and
          monitor your performace. You input your workout and GymTracker
          remembers what workouts you are doing for the day as well as the
          previous weight you did to push you forward. <span className={styles.highlight}>Let's Improve
          Efficiently.</span>
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>Add</h1>
            <p>Unlimited Workouts</p>
          </div>
          <div className={styles.box}>
            <h1>Edit</h1>
            <p>Sets, Reps, and Weight</p>
          </div>
          <div className={styles.box}>
            <h1>Share</h1>
            <p>Progress with friends</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
}

export default AboutPage;
