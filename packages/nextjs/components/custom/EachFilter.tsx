import React from 'react'

const EachFilter = ({ name }: { name: string }) => {
   return (
    <div className='each-filter'>
        <div className='each-filter-title'>
            {name}
        </div>

        <input type="text" className='each-filter-input' />
    </div>
  )
}

export default EachFilter