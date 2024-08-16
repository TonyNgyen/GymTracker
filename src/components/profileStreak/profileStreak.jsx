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
    <Card className="bg-cardBG">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="m-0 flex gap-3 items-center justify-center">
          Streak <FaFireFlameCurved className="text-orange-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>{streak}</CardContent>
    </Card>
  );
}

export default ProfileStreak;
