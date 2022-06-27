import React from 'react';

const SearchIcon = ({className}) => {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z"/>
        <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/>
      </g>
      <g>
        <rect fill="none" height="32" width="32"/>
      </g>
    </svg>
  );
};

export default SearchIcon;
