import React from 'react'
import Image from 'next/image'
import Tag from './Tag';


const EqubCard = (
    {
        // equbTit,
        // equbRating,
        // equbType,
        // equbAmount,
        // equbStatus
    }
) => {
  return (
    <div className='equb-card'>
        <div className="equb-card-side">
            <Image src='/altin.png' alt='equb-card-image' className="equb-card-image" width={100} height={100} />
        </div>

        <div className='equb-card-content'>
            <div className="equb-card-content-title">
                Equb Name 1 &nbsp;&nbsp;&nbsp; 10/10
            </div>
            <div className="equb-card-content-desc">
                <Tag text='8/15' backcolor ='#D0E2FF' textcolor='#0043CE'/>
                <Tag text='Weekly' backcolor ='#A7F0BA' textcolor='#0E6027'/>
                <Tag text='1 ETH' backcolor ='#9EF0F0' textcolor='#005D5D'/>
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