import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const IconButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px',
  height: '42px',
  justifyContent: 'center',
  border: '1px solid #E9E9E9',
  //   paddingInlineStart: theme.breakpoints.down('md') ? '48px' : '160px',
  color: '#898989',
  background: '#FFFFFF',
  // fontSize: 'theme.breakpoints.down('md') ? '16px' : '18px','
  fontSize: '16px',
  fontFamily: 'Centra No2',
  textTransform: 'capitalize',
  lineHeight: '26px',
  '&:hover': {
    borderColor: '#A8AEBA',
    // background: '#0A8D5A',
  },
}));
