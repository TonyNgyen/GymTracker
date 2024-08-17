"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

  return (
    <Card className="bg-cardBG lg:h-[483px] border-foreground border-2">
      <CardHeader>
        <CardTitle className="flex items-center flex-col md:flex-row gap-2">
          Weight History for
          <Select onValueChange={(value) => setSelect(value)} className="">
            <SelectTrigger className="w-[280px] border-0 text-2xl p-0">
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
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full md:h-[350px]">
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
        </ChartContainer>
      </CardContent>
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
