import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BtnVerify = styled(MuiButton)(({ theme }) => ({
  border: '1px solid #B6B6B6',
  borderRadius: '0',
  padding: '11px 39px',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '14px',
  fontFamily: 'Centra No2',
  textTransform: 'none',
  background: '#0DB774',
  '&:hover': {
    // borderColor: '#B6B6B6',
    // background: '#0DB774',
    color: '#B6B6B6',
  },
}));
