import React from 'react';

interface TagProps {
    text: string;
    backcolor: string;
    textcolor: string;
  }
  
  const Tag = ({ text, backcolor, textcolor }: TagProps) => {
    return (
      <div className='desc-tag' style={{ backgroundColor: backcolor, color: textcolor }}>
        {text}
      </div>
    )
  }

  export default Tag;