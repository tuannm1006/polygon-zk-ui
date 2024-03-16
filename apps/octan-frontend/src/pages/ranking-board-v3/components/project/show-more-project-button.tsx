import { FC, useRef, useState } from 'react';
import { DefaultFcProps } from 'common';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import { Divider } from '@mui/material';
import { ArrowPopper, Arrow } from 'shared-components';

const MAX_CHAINS_PER_COL = 8;

const sliceIntoChunks = (arr: any, chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
};

export const ShowMoreProjectIcon: FC<DefaultFcProps> = ({ chains }) => {
  const [isHovered, setIsHovered] = useState(false);

  const anchorRef = useRef(null);
  const [arrowRef, setArrowRef] = useState(null);

  const handleMouseEnteredLeft = () => {
    setIsHovered(!isHovered);
  };

  const handleArrowRef = (node: any) => {
    setArrowRef(node);
  };

  const renderChains = () => {
    const chunks = sliceIntoChunks(chains, MAX_CHAINS_PER_COL);
    return chunks.map((chunk: any, i: number) => {
      return (
        <>
          <div>
            {chunk.map((c: any) => {
              return (
                <div className="flex flex-row mt-3">
                  <img width="16px" height="16px" src={`/assets/images/networks/${c.chainId}.svg`} />
                  <span className="ml-2 leading-5 font-normal text-xs">{c.name}</span>
                </div>
              );
            })}
          </div>
          <div>
            {i !== chunks.length - 1 && (
              <Divider
                orientation="vertical"
                variant="middle"
                textAlign="center"
                sx={{ marginLeft: '12px', marginRight: '12px', marginTop: '14px', height: '234px' }}
              />
            )}
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="cursor-pointer" onMouseEnter={handleMouseEnteredLeft} onMouseLeave={handleMouseEnteredLeft}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="8" fill="#F2F2F2" />
          <path
            d="M5.59922 8.00005C5.59922 8.66279 5.06196 9.20005 4.39922 9.20005C3.73648 9.20005 3.19922 8.66279 3.19922 8.00005C3.19922 7.33731 3.73648 6.80005 4.39922 6.80005C5.06196 6.80005 5.59922 7.33731 5.59922 8.00005Z"
            stroke={isHovered ? '#1C1C1C' : '#B6B6B6'}
          />
          <path
            d="M9.19922 8.00005C9.19922 8.66279 8.66196 9.20005 7.99922 9.20005C7.33648 9.20005 6.79922 8.66279 6.79922 8.00005C6.79922 7.33731 7.33648 6.80005 7.99922 6.80005C8.66196 6.80005 9.19922 7.33731 9.19922 8.00005Z"
            stroke={isHovered ? '#1C1C1C' : '#B6B6B6'}
          />
          <path
            d="M12.7992 8.00005C12.7992 8.66279 12.262 9.20005 11.5992 9.20005C10.9365 9.20005 10.3992 8.66279 10.3992 8.00005C10.3992 7.33731 10.9365 6.80005 11.5992 6.80005C12.262 6.80005 12.7992 7.33731 12.7992 8.00005Z"
            stroke={isHovered ? '#1C1C1C' : '#B6B6B6'}
          />
        </svg>
      </div>
      <div ref={anchorRef} className="ml-2" />
      <ArrowPopper
        className={'z-10'}
        open={isHovered}
        anchorEl={anchorRef.current}
        transition
        placement="right"
        modifiers={[
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div>
              <Arrow ref={handleArrowRef} className="MuiPopper-arrow" />
              <Paper className="pt-0.5 pb-3 px-3 gap-3 bg-white rounded">
                <div className="flex">
                  <div className="flex flex-row">{renderChains()}</div>
                </div>
              </Paper>
            </div>
          </Fade>
        )}
      </ArrowPopper>
    </>
  );
};
