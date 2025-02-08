import React from 'react';

const EachInput = ({ name, value, onChange }: { name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className='each-input'>
      <div className='each-input-title'>
        {name}
      </div>
      <input type="text" className='each-input-input' value={value} onChange={onChange} />
    </div>
  );
};

export default EachInput;