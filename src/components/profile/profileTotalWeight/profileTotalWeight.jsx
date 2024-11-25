import React from "react";
import styles from "./profileWeight.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoBarbell } from "react-icons/io5";

function ProfileTotalWeight({ exercises }) {
  let totalWeight = 0;

  for (let key in exercises) {
    if (exercises.hasOwnProperty(key)) {
      totalWeight += parseInt(exercises[key].weight, 10);
    }
  }
  return (
    <Card className="bg-cardBG border-foreground border-2 h-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="m-0 flex gap-3 items-center">
          <span className="text-lg">Total Weight</span>
          <IoBarbell className="text-3xl text-main -rotate-45" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-center">{totalWeight}</p>
      </CardContent>
    </Card>
  );
}

export default ProfileTotalWeight;
