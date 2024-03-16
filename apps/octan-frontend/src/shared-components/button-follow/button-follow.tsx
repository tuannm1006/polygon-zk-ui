import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BtnFollow = styled(MuiButton)(({ theme }) => ({
  border: '1px solid #B6B6B6',
  borderRadius: '34px',
  padding: '3px 12px',
  justifyContent: 'center',
  color: '#B6B6B6',
  fontSize: '14px',
  fontFamily: 'Centra No2',
  textTransform: 'none',

  '&:hover': {
    borderColor: '#B6B6B6',
    // background: '#0A8D5A',
    // color: '#ffffff',
  },
}));
