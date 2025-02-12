import React from 'react'
import Image from 'next/image'
import Tag from './Tag'

interface EqubImageCardProps {
  ipfsHash: string;
}

const EqubImageCard: React.FC<EqubImageCardProps> = ({ ipfsHash }) => {
  const imageUrl = `https://${ipfsHash}.ipfs.dweb.link`
  return (
    <div className="equb-image-card">
      <div className="equb-card-image-side">
        <img 
          src={imageUrl} 
          alt="Equb Image Card" 
          width={175} 
          height={175} 
          className="equb-image-card-image" 
        />
      </div>
      {/* Optionally render a Tag component */}
      {/* <Tag text="Some Tag" /> */}
    </div>
  )
}

export default EqubImageCard;