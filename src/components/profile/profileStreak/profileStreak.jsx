import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaFireFlameCurved } from "react-icons/fa6";

function ProfileStreak({ streak }) {
  return (
    <Card className="bg-cardBG border-exerciseBorder border-2 h-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="m-0 flex gap-3">
          Streak <FaFireFlameCurved className="text-orange-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-center">{streak.currentStreak}</p>
      </CardContent>
    </Card>
  );
}

export default ProfileStreak;
