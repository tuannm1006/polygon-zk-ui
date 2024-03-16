import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const OctanInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0DB774',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    background: '#ffffff',
    color: '#B6B6B6',
    border: '1px solid #E9E9E9',
    borderRadius: 8,
    font: 'Centra No2',
    fontSize: '16px',
    padding: '8px',
    fontWeight: 400,
    '&:hover fieldset': {
      borderColor: '#0DB774',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0DB774',
    },
    '&.Mui-focused input': {
      color: '#1C1C1C',
    },
  },
});
