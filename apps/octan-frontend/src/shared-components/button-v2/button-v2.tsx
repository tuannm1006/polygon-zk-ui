import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ButtonV2 = styled(MuiButton)(({ theme }) => ({
  borderRadius: '2px',
  padding: '11px 20px',
  justifyContent: 'center',
  //   paddingInlineStart: theme.breakpoints.down('md') ? '48px' : '160px',
  borderColor: '#A8AEBA',
  color: '#FFFFFF',
  background: '#0DB774',
  fontSize: theme.breakpoints.down('md') ? '16px' : '18px',
  fontFamily: 'Centra No2',
  textTransform: 'none',
  lineHeight: '26px',
  '&:hover': {
    borderColor: '#A8AEBA',
    background: '#0A8D5A',
  },

  '&:disabled': {
    background: '#F2F2F2',
  },
}));
