// import React from "react";
// import styles from "./profileExerciseList.module.css";
// import { Card } from "../ui/card";

// function ProfileExerciseList({ exercises }) {
//   return (
//     <div>
//       <Card>
//         <div className="w-full flex items-center justify-center">
//           <table className={`${styles.table}`}>
//             <thead>
//               <tr className="text-2xl">
//                 <th className={`text-left ${styles.exerciseHeader}`}>
//                   Exercise
//                 </th>
//                 <th className={`text-right ${styles.weightHeader}`}>Weight</th>
//               </tr>
//             </thead>

//             {Object.keys(exercises).map((exercise) => (
//               <tr className={`text-lg`} key={exercise}>
//                 <td className={`text-left ${styles.exerciseRow}`}>
//                   {exercises[exercise].name}
//                 </td>
//                 <td className={`text-right ${styles.weightRow}`}>
//                   {exercises[exercise].weight}
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default ProfileExerciseList;

// async function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

// export default async function DemoPage() {
//   const data = await getData();
//   const columns = [
//     {
//       accessorKey: "status",
//       header: "Exercise",
//     },
//     {
//       accessorKey: "email",
//       header: "Weight",
//     },
//   ]

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }

import React from "react";
import styles from "./profileExerciseList.module.css";
import { Card } from "../../ui/card";
import { DataTable } from "../../ui/data-table";

function ProfileExerciseList({ exercises }) {
  const data = Object.keys(exercises).map((exercise) => ({
    exercise: exercises[exercise].name,
    weight: exercises[exercise].weight,
  }));

  const columns = [
    {
      accessorKey: "exercise",
      header: () => <div className="text-left text-xl font-bold">Exercise</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium text-lg">
            {row.getValue("exercise")}
          </div>
        );
      },
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-right text-xl font-bold">Weight</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium text-lg">
            {row.getValue("weight")}
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default ProfileExerciseList;
