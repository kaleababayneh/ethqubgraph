import React from 'react';

const EachDetail = ({ name, value, type = 'text' }: { name: string, value: string, type?: string }) => {
  if (name == "Last Withdrawal Time" && value != "Has not started yet") type = 'datetime-local';
  return (
    <div className='each-detail-input'>
      <div className='each-detail-input-title'>
        {name}
      </div>
      <input type={type} className='each-detail-input-input' value={value} disabled/>
    </div>
  );
};

export default EachDetail;