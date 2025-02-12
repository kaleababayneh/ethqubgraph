import React from 'react'
import Image from 'next/image'
import Tag from './Tag';

const TOKEN_DECIMAL = 1e18;

const EqubCard = (
    {
        equbTitle = 'Eqube'
        ,  //creationTime,  
        startingTime = 0,  
        // cycleStartTime,  
        // lastTimeStamp,  
        poolAmount= 1,  
        // individualContribution,  
        currentCycle = 0,  
        totalCycles = 10,   
        cycleDuration =1,  
        numberOfMembers = 0, 
        ipfsHash = ""
                
    }
    )=>{

        const formatDateTimeLocal = (dateString: any) => {
            const date = new Date(Number(dateString) * 1000);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

            return ` ${date.toLocaleDateString(undefined, options)}`;
        };


   
  return (
    <div className='equb-card'>
        <div className="equb-card-side">
        <img src={"https://"+ipfsHash + ".ipfs.dweb.link"}  alt='equb-card-image' className="equb-card-image" width={100} height={100} />
        </div>

        <div className='equb-card-content'>
            <div className="equb-card-content-title">
               {equbTitle} &nbsp;&nbsp;&nbsp; {numberOfMembers}/{totalCycles}
            </div>
            <div className="equb-card-content-desc">
                {/* <Tag text ={`${currentCycle}`+"/"+`${totalCycles}`}  backcolor ='#D0E2FF' textcolor='#0043CE'/> */}
                <Tag text= {`Every ${cycleDuration} days`} backcolor ='#A7F0BA' textcolor='#0E6027'/>
                <Tag text={(Number(poolAmount)/TOKEN_DECIMAL).toFixed() +" ETH"} backcolor ='#9EF0F0' textcolor='#005D5D'/>
                <Tag text=
                {`Active - ${formatDateTimeLocal(startingTime)}`} backcolor ='#E8DAFF' textcolor='#6929C4'/>
            </div>
            <div className="equb-card-content-footer">
                Join Equb
            </div>
        </div>
    </div>
  )
}

export default EqubCard;