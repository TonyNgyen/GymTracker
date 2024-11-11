"use client";

import { Button } from "@/components/ui/button";
import { incrementStreak } from "@/lib/actions";
import React from "react";

function DebugAndTestPage() {
  return (
    <div>
      <Button onClick={() => incrementStreak()}>Test</Button>
    </div>
  );
}

export default DebugAndTestPage;
