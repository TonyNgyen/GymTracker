import React from "react";
import { getDevLogs } from "@/lib/data";
import styles from "./devlogs.module.css"

async function DevLogsPage() {
  const devLogs = await getDevLogs();
  return (
    <div className={styles.container}>
      {devLogs.map((devLog) => (
        <div key={devLog.title} className={styles.devlogContainer}>
          <h1 className={styles.devlogTitle}>{devLog.title}</h1>
          <h2 className={styles.devlogDesc}>{devLog.desc}</h2>
        </div>
      ))}
    </div>
  );
}

export default DevLogsPage;
