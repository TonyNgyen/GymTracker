import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>Tony</div>
        <Link href={"/devlogs"} className={styles.devLogs}>DevLogs</Link>
      </div>
      <div className={styles.text}>Tony GymTracker © All rights reserved.</div>
    </div>
  );
}

export default Footer;
