import React from "react";
import AutoUpdate from "@/components/autoUpdate/autoUpdate";
import { getExercises } from "@/lib/data";

async function autoUpdatePage() {
  const exercises = await getExercises();

  return <AutoUpdate exercises={exercises} />;
}

export default autoUpdatePage;
