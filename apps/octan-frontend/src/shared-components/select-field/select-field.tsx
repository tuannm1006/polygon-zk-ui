import { Select, MenuItem, OutlinedInput, SvgIcon } from '@mui/material';
import { DefaultFcProps, IOption } from 'common';
import { FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export type SelectFieldProps = DefaultFcProps;

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: '8px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '26px',
    },
  },
};
export const SelectField: FC<SelectFieldProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      sx={{
        boxShadow: 'none',
        fontSize: '14px',
        // '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #0DB774',
        },
        '&:hover': {
          '&& fieldset': {
            border: '1px solid #0DB774',
          },
        },
      }}
      className="h-full w-full select-field-input "
      value={value}
      onChange={onChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      // input={<OutlinedInput className="h-full text-[14px] font-normal" />}
      IconComponent={ExpandMoreIcon}
      renderValue={(selected) => {
        if (!selected) {
          return <p className="text-black-1c text-[14px] font-normal mt-[2px]">{placeholder}</p>;
        }
        return <p className="text-black-1c text-[14px] leading-[22px] font-normal mt-[2px]">{selected}</p>;
      }}
      MenuProps={{
        ...{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        },
        ...MenuProps,
      }}
      classes={{
        icon: 'text-black',
      }}>
      <MenuItem
        value=""
        classes={{
          root: 'menu-item',
        }}
        disabled>
        {placeholder}
      </MenuItem>
      {options.map((option: IOption) => (
        <MenuItem
          key={`${option.code}`}
          //   sx={{ width: '120px' }}
          value={option.code}
          classes={{
            root: 'menu-item',
          }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
