
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GradientButton = styled(MuiButton)({
  borderRadius: '24px',
  height: '48px',
  padding: '8px 40px',
  color: '#fff',
  fontSize: '18px',
  textAlign: 'center',
  background: 'linear-gradient(90deg, #00FE7E 0%, #00C4FE 100%)',
  textTransform: 'capitalize',
  fontWeight: 700,
  '&:disabled': {
    cursor: 'not-allowed',
    color: '#51585E',
    background: '#1A1C21',
    border: '1px solid #323232',
  },
});
