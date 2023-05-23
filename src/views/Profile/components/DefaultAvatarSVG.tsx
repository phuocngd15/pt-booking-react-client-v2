import React from 'react';

export default function AvatarDefault({ avatar, width, height }) {
  if (avatar)
    return (
      <img
        src={avatar}
        alt="chosen"
        className="flex-none w-300 h-300 border-solid border-2 border-sky-500 rounded-full object-cover"
        style={{ width: '300px' }}
      />
    );
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="User / User_01">
        <path
          id="Vector"
          d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
