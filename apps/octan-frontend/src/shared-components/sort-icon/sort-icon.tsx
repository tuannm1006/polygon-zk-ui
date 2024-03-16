import { FC, useEffect, useState } from 'react';
import { DefaultFcProps, SORT_ORDER } from 'common';

export type SortIconProps = DefaultFcProps;

export const SortIcon: FC<SortIconProps> = ({ onClick, field, sortKey, order }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (field !== sortKey) {
      setIsHovered(false);
    }
  }, [sortKey]);

  const handleMouseEnteredLeft = () => {
    setIsHovered(!isHovered);
  };

  const renderSortIcon = () => {
    if (field !== sortKey || order === SORT_ORDER.NONE) {
      return (
        <div onMouseEnter={handleMouseEnteredLeft} onMouseLeave={handleMouseEnteredLeft}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.25703 8.39995L3.85703 10.8L1.45703 8.39995M1.45703 3.59995L3.85703 1.19995L6.25703 3.59995"
              stroke={isHovered ? '#1C1C1C' : '#CECECE'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    return (
      <div>
        {order === SORT_ORDER.ASC && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.83984 5.16667L6.21484 1M6.21484 1L10.5898 5.16667M6.21484 1L6.21484 11"
              stroke="#1C1C1C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {order === SORT_ORDER.DESC && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5898 6.83333L6.21484 11M6.21484 11L1.83984 6.83333M6.21484 11L6.21484 1"
              stroke="#1C1C1C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  };

  return <>{renderSortIcon()}</>;
};
