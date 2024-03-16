import { FC } from 'react';
import { DefaultFcProps } from 'common';

export const MenuIcon: FC<DefaultFcProps> = ({ className, onClick, actived }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 8L10 12L6 8"
          stroke={actived ? '#00AA6C' : '#B6B6B6'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
