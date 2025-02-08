// "use client";
// import React from "react";

// interface EqubDetailEachEveryProps {
//   equbDetail: {
//     data: any;
//     isLoading: boolean;
//     error: any;
//     address: any;
//   };
// }

// const EqubDetailEachEvery: React.FC<EqubDetailEachEveryProps> = ({ equbDetail}) => {
//   const { data, isLoading, error, address } = equbDetail;

//   if (isLoading)
//     return (
//       <p>
//         Loading details for <strong>{address}</strong>...
//       </p>
//     );

//   if (error)
//     return (
//       <p>
//         Error loading details for <strong>{address}</strong>: {error.message}
//       </p>
//     );

//   if (!data)
//     return (
//       <p>
//         No details available for <strong>{address}</strong>
//       </p>
//     );

 
//   const title = data[0];
//   const creationTime = data[1];
//   const startingTime = data[2];
//   const cycleStartTime = data[3];
//   const lastTimeStamp = data[4];
//   const poolAmount = data[5];
//   const individualContribution = data[6];
//   const currentCycle = data[7];
//   const totalCycles = data[8];
//   const cycleDuration = data[9];
//   const numberOfMembers = data[10];

//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         margin: "10px",
//         padding: "10px",
//         borderRadius: "4px",
//       }}
//     >
//       <p>
//         <strong>Address:</strong> {address}
//       </p>
//       <p>
//         <strong>Title:</strong> {title}
//       </p>

//      <p>
//        <strong>Creation Time:</strong>{" "}
//         {new Date(Number(creationTime) * 1000).toLocaleString()}
//       </p>
//       <p>
//         <strong>Starting Time:</strong>{" "}
//         {startingTime ?   new Date(Number(startingTime) * 1000).toLocaleString() : "Not Started"}
//       </p>
//       <p>
//         <strong>Cycle Start Time:</strong>{" "}
//         {cycleStartTime ?   new Date(Number(cycleStartTime) * 1000).toLocaleString() : "Not Started"}
//       </p>
//       <p>
//         <strong>Last Time Stamp:</strong>{" "}
//         {new Date(Number(lastTimeStamp) * 1000).toLocaleString()}
//       </p> 
//       <p>
//         <strong>Pool Amount:</strong> {poolAmount?.toString()}
//       </p>
//       <p>
//         <strong>Individual Contribution:</strong>{" "}
//         {individualContribution?.toString()}
//       </p>
//       <p>
//         <strong>Current Cycle:</strong> {currentCycle?.toString()}
//       </p>
//       <p>
//         <strong>Total Cycles:</strong> {totalCycles?.toString()}
//       </p>
//       <p>
//         <strong>Cycle Duration:</strong> {cycleDuration?.toString()}
//       </p>
//       <p>
//         <strong>Number of Members:</strong> {numberOfMembers?.toString()}
//       </p>
//     </div>
//   );
// };

// export default EqubDetailEachEvery;
