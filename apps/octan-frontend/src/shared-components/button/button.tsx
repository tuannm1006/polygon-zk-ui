import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Button = styled(MuiButton)(({ theme }) => ({
  borderRadius: '24px',
  paddingBlock: '16px',
  justifyContent: 'flex-start',
  paddingInlineStart: theme.breakpoints.down('md') ? '48px' : '160px',
  borderColor: '#A8AEBA',
  color: '#A8AEBA',
  fontSize: theme.breakpoints.down('md') ? '14px' : '18px',
  textTransform: 'capitalize',

  '&:hover': {
    borderColor: '#A8AEBA',
  },
}));
