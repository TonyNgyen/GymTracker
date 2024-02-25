import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from "react";
import { getDevLogs } from "@/lib/data";
import styles from "./devlogs.module.css";

async function DevLogsPage() {
  const devLogs = await getDevLogs();
  return (
    <div className={styles.container}>
      {devLogs.map((devLog) => (
        <Card key={devLog.title}>
          <CardHeader>
            <div>
              <CardTitle>{devLog.title}</CardTitle>
              <CardDescription>{devLog.desc}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}


export default DevLogsPage;
