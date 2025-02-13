import React from 'react'
import EqubImageCard from '~~/components/custom/EqubImageCard';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useActiveAccount } from "thirdweb/react";
import { SyncLoader } from 'react-spinners';


// startin time + currentcYLCE * CYCLE DURATION 

interface EqubDetailEachProps {
    equbDetails: string[];
}
  
const WalletProfileActive: React.FC<EqubDetailEachProps> = ({ equbDetails }) => {

    let activeAccount = useActiveAccount();
      //let { address: connectedAddress } = useAccount();
      let connectedAddress = activeAccount?.address;

      const expiredEqub = (starting: any, cycDuration: any, totalCyc: any) => {
        const now = new Date();
        const startingTime = new Date(Number(starting) * 1000);
        const cycleDuration = Number(cycDuration);
        const totalCycles = Number(totalCyc);
        const cycleTime = cycleDuration * totalCycles;
        const cycleTimeMs = cycleTime * 24 * 60 * 60 * 1000;
        const cycleEndTime = new Date(startingTime.getTime() + cycleTimeMs);
        console.log(cycleEndTime);
        return now > cycleEndTime;
    }


    const detailsData = equbDetails.map((address: string) => {
    const { data, isLoading, error } = useScaffoldReadContract({
        contractName: "EthqubFactory",
        functionName: "getEthqubDetails",
        args: [address],
        watch: true,
    });


    
    return { data, isLoading, error, address };
    });

  
  return (
    <>
    {detailsData.map((item, index) => {


            const thisItem = (item.data ? item.data[14] : 'Data is undefined');
            console.log(`${connectedAddress}`);
            console.log(thisItem);
            console.log(thisItem.includes(`${connectedAddress}`))

            const [
            equbTitle
            ,// creationTime, 
            ,startingTime
            ,// cycleStartTime, 
            ,// lastTimeStamp, 
            , poolAmount
            ,// individualContribution, 
            , currentCycle
            , totalCycles 
            , cycleDuration
            , numberOfMembers
            , ipfsHash
            ,// creator
            ,// currentMember
            ,members

            ] = item.data || [];
            if (thisItem.includes(`${connectedAddress}`) && !expiredEqub(startingTime, cycleDuration, totalCycles)) {
                return (
                    <a href={`/equbdetail/${item.address}`}>
                        <div key={index}>
                            <EqubImageCard ipfsHash={ipfsHash || ''} />
                        </div>
                    </a>
                );
            }
        })}
    </>
  )
}

export default WalletProfileActive;