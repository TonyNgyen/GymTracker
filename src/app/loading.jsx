import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="animate-spin flex items-center justify-center">
      <AiOutlineLoading3Quarters className="h-1/5 w-1/5 text-main" />
    </div>
  );
}

export default Loading;
