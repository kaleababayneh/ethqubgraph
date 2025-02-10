import React from 'react'
import Image from 'next/image'
import Tag from './Tag';


const EqubCard = (
    {
        equbTitle = 'Eqube',  
        //creationTime,  
        startingTime ="April 25,2025",  
        // cycleStartTime,  
        // lastTimeStamp,  
        poolAmount= 1,  
        // individualContribution,  
        currentCycle = 0,  
        totalCycles = 10,   
        cycleDuration =1,  
        numberOfMembers = 0, 
                
    }
) => {
  return (
    <div className='equb-card'>
        <div className="equb-card-side">
            <Image src='/altin.png' alt='equb-card-image' className="equb-card-image" width={100} height={100} />
        </div>

        <div className='equb-card-content'>
            <div className="equb-card-content-title">
               {equbTitle} &nbsp;&nbsp;&nbsp; {numberOfMembers}/{totalCycles}
            </div>
            <div className="equb-card-content-desc">
                <Tag text ={`${currentCycle}`+"/"+`${totalCycles}`}  backcolor ='#D0E2FF' textcolor='#0043CE'/>
                <Tag text= {`${currentCycle}`} backcolor ='#A7F0BA' textcolor='#0E6027'/>
                <Tag text={poolAmount +""} backcolor ='#9EF0F0' textcolor='#005D5D'/>
                <Tag text='Active - April 25,2025' backcolor ='#E8DAFF' textcolor='#6929C4'/>
            </div>
            <div className="equb-card-content-footer">
                Join Equb
            </div>
        </div>
    </div>
  )
}

export default EqubCard;