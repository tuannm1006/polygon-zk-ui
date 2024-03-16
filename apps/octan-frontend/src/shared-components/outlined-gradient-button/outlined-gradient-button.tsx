
import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { FC } from 'react';

import './outlined-gradient-button.scss';

export const OutlinedGradientButton: FC<DefaultFcProps & { disabled?: boolean }> = ({
  className,
  disabled,
  children,
  ...restOfProps
}) => {

  const combinedClassName = clsx(className, 'outlined-gradient-button');

  return (
    <button disabled={disabled} className={combinedClassName} {...restOfProps}>
      <span>{children}</span>
    </button>
  )
};
