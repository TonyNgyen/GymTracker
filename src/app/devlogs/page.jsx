import React from 'react'
import { getDevLogs } from "@/lib/data"

async function DevLogsPage() {
  const devLogs = await getDevLogs();
  return (
    <div>
    {devLogs.map((devLog) => <div key={devLog.title}>{devLog.title}</div>)}
    </div>
  )
}

export default DevLogsPage