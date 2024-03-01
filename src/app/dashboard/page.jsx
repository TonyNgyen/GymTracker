"use client"

import BarChart from "@/components/barChart/BarChart";
import React, { useState } from "react";
import { UserData } from "@/lib/fakeData";

function DashboardPage() {
  const [userData, setUserData] = useState({
    labels: UserData.result[1].weights.map((data) => data.date),
    datasets: [
      {
        label: "weight",
        data: UserData.result[0].weights.map((data) => data.weight),
      },
    ],
  });

  return (
    <div className="w-3/4">
      <BarChart chartData={userData} />
    </div>
  );
}

export default DashboardPage;
