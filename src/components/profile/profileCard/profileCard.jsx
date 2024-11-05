import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { FaUserCircle } from "react-icons/fa";

function ProfileCard({ user }) {
  const date = format(user.createdAt, "LLLL yyyy");
  return (
    <Card className="flex items-center justify-center px-6 py-4 gap-8 bg-cardBG border-foreground border-2">
      <div className="p-0 flex justify-center items-center">
        <div className="w-32 h-32 flex justify-center items-center">
          <FaUserCircle className="w-full h-full" />
        </div>
      </div>
      <div className="w-1/2">
        <CardHeader className="flex flex-col p-0 m-0">
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardFooter className="m-0 p-0">
          <p>Card Footer</p>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProfileCard;
