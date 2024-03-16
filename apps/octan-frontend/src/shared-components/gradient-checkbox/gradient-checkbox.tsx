import styled from '@emotion/styled';
import { DefaultFcProps } from 'common';

type CheckboxProps = DefaultFcProps & {
  id: string;
  label?: string;
  checked?: boolean;
};

export const GradientCheckbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <StyledCheckbox
        id={id}
        type="checkbox"
        className="appearance-none"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="text-white font-medium pl-10">
        {label}
      </label>
    </div>
  );
};

const StyledCheckbox = styled.input`
  position: relative;
  width: 24px;
  height: 24px;
  display: none;

  &:checked + label::after {
    background: #00fe7e;
  }

  & + label {
    z-index: 3;
    cursor: pointer;
    display: block;
    position: relative;

    &::before {
      z-index: 2;
      top: 0px;
      left: 3px;
      width: 24px;
      height: 24px;
      background: linear-gradient(90deg, #00fe7e 0%, #00c4fe 100%);
      display: block;
      content: '';
      position: absolute;
      border-radius: 4px;
    }

    &::after {
      z-index: 2;
      top: 2px;
      left: 4px;
      width: 21px;
      height: 21px;
      background: #111214;
      display: block;
      content: '';
      position: absolute;
      border-radius: 3px;
    }
  }
`;
