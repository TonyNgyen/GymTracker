"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProfileChart({ exercises }) {
  const [exerciseHistory, setExerciseHistory] = useState();
  const [select, setSelect] = useState(Object.keys(exercises)[0]);

  useEffect(() => {
    if (Object.keys(exercises).length == 0) {
      return;
    }
    let conversion = Object.keys(exercises[select].history).map((date) => ({
      date: date,
      weight: exercises[select].history[date],
    }));
    setExerciseHistory(conversion);
  }, [select]);

  const chartConfig = {
    desktop: {
      label: "Weight",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center bg-secondary p-2 rounded-md border-2 border-foreground">
          <p className="text-xl">{`${label}`}</p>
          <p className="text-lg">{payload[0].value}</p>
        </div>
      );
    }

    return null;
  };

  const [chartColor, setChartColor] = useState(() =>
    localStorage.getItem("theme") === "dark" ? "#bcdcf5" : "#1e7bc8"
  );

  useEffect(() => {
    // Poll every second to detect `localStorage` theme change
    const interval = setInterval(() => {
      const theme = localStorage.getItem("theme");
      const newChartColor = theme === "dark" ? "#bcdcf5" : "#1e7bc8";
      setChartColor(newChartColor);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Card className="bg-cardBG border-foreground border-2 h-full">
      {Object.keys(exercises).length == 0 ? (
        <>
          <CardHeader>
            <CardTitle className="flex items-center flex-col md:flex-row gap-2">
              Weight History
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-2/3 justify-center items-center text-xl font-semibold">
            No exercises to display history for.
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex items-center flex-col md:flex-row gap-2">
              Weight History for
              <Select onValueChange={(value) => setSelect(value)} className="">
                <SelectTrigger className="w-[280px] border-0 text-2xl p-0 bg-cardBG">
                  <SelectValue placeholder={exercises[select].name} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exercises).map((id) => (
                    <SelectItem value={id} key={id}>
                      {exercises[id].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardTitle>
            {/* <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription> */}
          </CardHeader>
          <CardContent className="h-[80%]">
            {/* <ChartContainer width={700} height="80%" config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={exerciseHistory}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 5)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Area
                  dataKey="weight"
                  type="step"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer> */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={exerciseHistory}
                margin={{
                  top: 5,
                  right: 30,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                  contentStyle={{ background: "black" }}
                  content={<CustomTooltip />}
                />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke={chartColor} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </>
      )}

      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default ProfileChart;
