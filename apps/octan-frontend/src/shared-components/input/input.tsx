import { TextField, TextFieldProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

type InputProps = {
  id: string;
  label?: string;
  light?: boolean;
  required?: boolean;
} & TextFieldProps;

export const Input = ({ id, label, required = false, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-base font-medium mb-4 leading-[26px]">
          {label}
          {required ? (
            <span className="text-red-600 mx-1">
              <sup>*</sup>
            </span>
          ) : (
            ''
          )}
        </label>
      )}
      <StyledTextField id={id} variant="outlined" color="primary" fullWidth {...props} />
    </div>
  );
};

const StyledTextField = styled(TextField)(({ light, theme }: { light?: boolean; theme: Theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 4,
    background: '#fff',
    color: '#1C1C1C',
    paddingRight: 0,
  },

  '& .MuiInputAdornment-root': {
    height: 'calc(1.4375em + 16.5px * 2)',
    maxHeight: '100%',
  },
}));
