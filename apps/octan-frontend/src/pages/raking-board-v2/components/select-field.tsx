import { Select, MenuItem, OutlinedInput } from '@mui/material';
import { DefaultFcProps, IOption } from 'common';
import { FC } from 'react';

export type SelectFieldProps = DefaultFcProps;

const MenuProps = {
  PaperProps: {
    style: {
      background: '#151516',
      boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.24)',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '22px',
    },
  },
};

export const SelectField: FC<SelectFieldProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      className="w-full"
      value={value}
      onChange={onChange}
      inputProps={{ 'aria-label': 'Without label' }}
      input={<OutlinedInput className="h-full select-field-input" />}
      renderValue={(selected) => {
        if (!selected) {
          return <p className="text-white text-[18px] font-bold">{placeholder}</p>;
        }
        return selected;
      }}
      MenuProps={MenuProps}
      classes={{
        icon: 'text-white',
      }}>
      <MenuItem
        classes={{
          root: 'menu-item',
        }}
        disabled>
        {placeholder}
      </MenuItem>
      {options.map((option: IOption) => (
        <MenuItem
          key={`${option.code}`}
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
