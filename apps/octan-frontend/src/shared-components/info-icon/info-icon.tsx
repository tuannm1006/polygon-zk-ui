import { FC, useState } from 'react';
import { DefaultFcProps } from 'common';
import { HtmlTooltip } from 'shared-components';

export type InfoIconProps = DefaultFcProps;

export const InfoIcon: FC<InfoIconProps> = ({ title, placement, arrow }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnteredLeft = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div onMouseEnter={handleMouseEnteredLeft} onMouseLeave={handleMouseEnteredLeft}>
      <HtmlTooltip title={title} arrow={arrow} placement={placement}>
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.49961 8.0001L8.49961 11.2001M8.49961 5.62822V5.6001M2.09961 8.0001C2.09961 4.46547 4.96499 1.6001 8.49961 1.6001C12.0342 1.6001 14.8996 4.46548 14.8996 8.0001C14.8996 11.5347 12.0342 14.4001 8.49961 14.4001C4.96499 14.4001 2.09961 11.5347 2.09961 8.0001Z"
            stroke={isHovered ? '#1C1C1C' : '#CECECE'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </HtmlTooltip>
    </div>
  );
};
