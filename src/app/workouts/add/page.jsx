import React from "react";
import AutoUpdate from "@/components/autoUpdate/autoUpdate";
import { getExercises } from "@/lib/data";

async function addPage() {
  let exercises = await getExercises();

  return <AutoUpdate exercises={exercises} />;
}

export default addPage;
