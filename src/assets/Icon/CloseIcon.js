import React from 'react';

const CloseIcon = ({className, onClick}) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g id="cross">
        <path
          fill="none"
          strokeWidth="3px"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7 7 18 18M7 25 25 7"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
