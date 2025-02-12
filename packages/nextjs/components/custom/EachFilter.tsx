"use client";
import React from 'react'

const EachFilter = ({ name, value, onChange }: { name: string, value : string,  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
   <div className='each-filter'>
      <div className='each-filter-title'>
        {name}
      </div>

      <input type="text" className='each-filter-input'  name={name}  value={value} onChange={onChange}/>
   </div>
  )
}

export default EachFilter