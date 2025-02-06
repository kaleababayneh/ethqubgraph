import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page


// import React, { useEffect, useState } from 'react';
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

// const EqubPage = ({ params }: { params: { id: string } }) => {
//   const [equbDetails, setEqubDetails] = useState<any>(null);

//   const { data: totalCounter } = useScaffoldReadContract(    
//     contractName: "EthqubFactory",
//     functionName: "ethqubGet",
//     args: [params.id]
//   });

//   useEffect(() => {
//     const fetchEqubDetails = async () => {
//       try {
     
//         setEqubDetails(details);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchEqubDetails();
//   }, [params.id]);

//   if (!equbDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='equb-page'>
//       <h1>Equb Details</h1>
//       <p><strong>Creator:</strong> {equbDetails.creator}</p>
//       <p><strong>Title:</strong> {equbDetails.equbTitle}</p>
//       <p><strong>Pool Amount:</strong> {equbDetails.poolAmount.toString()}</p>
//       <p><strong>Total Cycles:</strong> {equbDetails.totalCycles.toString()}</p>
//       <p><strong>Cycle Duration:</strong> {equbDetails.cycleDuration.toString()}</p>
//       <p><strong>Price Feed Address:</strong> {equbDetails.priceFeedAddress}</p>
//     </div>
//   );
// };

// export default EqubPage;