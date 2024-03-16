import clsx from 'clsx';
import { DefaultFcProps } from 'common';

import classes from './panel.module.scss'

export type PanelProps = DefaultFcProps & {
  onClick?: () => void,
};

export const Panel: React.FC<PanelProps> = ({
  className,
  children,
  onClick
}) => {
  return (
    <div className={clsx(classes.panelContainer, className)} onClick={onClick}>
      {children}
    </div>
  );
}