import { FC } from 'react';
import { DefaultFcProps } from 'common';
import { Box, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPopover = styled(Popover)({
  '& .MuiPopover-paper': {
    transform: 'translateY(18px)',
    padding: '16px',
    fontSize: '14px',
    color: '#23231E',
    // width: '376px',
    background: '#ffffff',
  },
});

export const ArrowPopover: FC<DefaultFcProps> = ({ id, open, anchorEl, onClose, children }) => {
  return (
    <StyledPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderRadius: '12px',
        },
      }}>
      <Box
        sx={{
          position: 'relative',
          mt: '10px',
          '&::before': {
            backgroundColor: 'white',
            content: '""',
            display: 'block',
            position: 'absolute',
            width: 12,
            height: 12,
            top: -6,
            transform: 'rotate(45deg)',
            left: 'calc(50% - 6px)',
          },
        }}
      />
      {children}
    </StyledPopover>
  );
};
