"use client";

import { Button } from "@/components/ui/button";
import WorkoutTimer from "@/components/workoutTimer/workoutTimer";
import React, { useState } from "react";
import { useLocalStorage } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { getUser } from "@/lib/data";

function DebugAndTestPage() {
  return (
    <div>
      <Button onClick={() => getUser()}>Test</Button>
    </div>
  );
}

export default DebugAndTestPage;
