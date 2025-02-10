import React from 'react';

const EachInput = ({ name, value, onChange, readOnly, type }: { name: string, value: string, type: string, readOnly: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className='each-input'>
      <div className='each-input-title'>
        {name}
      </div>
      <input type={type} className='each-input-input' value={value} onChange={onChange} disabled={readOnly}/>
    </div>
  );
};

export default EachInput;