import React from 'react'
import Image from 'next/image'
import Tag from './Tag';


const EqubImageCard = (
    {
        equbImage = 'Eqube',
    }
) => {
  return (
    <div className='equb-image-card'>
        <div className="equb-card-image-side">
            <Image src='/altin.png' alt='equb-image-card-image' className="equb-image-card-image" width={150} height={150} />
        </div>
    </div>
  )
}

export default EqubImageCard;