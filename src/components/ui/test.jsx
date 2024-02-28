import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Test({ workouts, day }) {
  console.log(workouts);
  const [select, setSelect] = useState(Object.keys(workouts)[0]);
  const workoutForDay = workouts[select].workouts[day];
  return (
    <div>
      {select}
      <Select onValueChange={(value) => setSelect(value)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={select} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(workouts).map((name) => (
            <SelectItem value={name}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
