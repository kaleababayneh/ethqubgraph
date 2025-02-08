import React from 'react';

const EachDetail = ({ name, value }: { name: string, value: string}) => {
  return (
    <div className='each-detail-input'>
      <div className='each-detail-input-title'>
        {name}
      </div>
      <input type="text" className='each-detail-input-input' value={value} disabled/>
    </div>
  );
};

export default EachDetail;