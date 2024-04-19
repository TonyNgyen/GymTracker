import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-9xl mb-20 text-center">Not <span className="text-main">Found</span></h2>
      <h3 className="text-3xl mb-10 text-center">Sorry, the page you are looking for does not exist.</h3>
      <Button asChild>
        <Link href={"/"}>Return Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
