import React from "react";

function ProfileExerciseList({ exercises }) {
  console.log(exercises);
  return (
    <div className="bg-cardBG rounded-xl">
      <div className="w-full flex items-center justify-center">
        <table className="border border-foreground border-separate rounded-xl w-full p-4">
          <tr className="border border-foreground text-2xl font-bold">
            <th className="text-left">Exercise</th>
            <th className="text-right">Weight</th>
          </tr>
          {Object.keys(exercises).map((exercise) => (
            <tr className="text-lg">
              <td className="">{exercises[exercise].name}</td>
              <td className="text-right">{exercises[exercise].weight}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default ProfileExerciseList;
