import React from 'react';

function Button({ text, onClick, className }) {
  return (
    <button 
      className={`default-button ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;