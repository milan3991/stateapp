import React from 'react';
import './style.globalbutton.css';

const GlobalButton = ({ text, handleClick, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default GlobalButton;