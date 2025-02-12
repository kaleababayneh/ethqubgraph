import React from 'react'
import Image from 'next/image'
import Tag from './Tag';


const EqubImageCard = (
    {
        ipfsHash = 'Eqube',
    }
) => {
  return (
    <div className='equb-image-card'>
        <div className="equb-card-image-side">
        <img src={"https://"+ipfsHash + ".ipfs.dweb.link"} alt='equb-image-card-image' className="equb-image-card-image" width={175} height={175} />
        </div>
    </div>
  )
}

export default EqubImageCard;