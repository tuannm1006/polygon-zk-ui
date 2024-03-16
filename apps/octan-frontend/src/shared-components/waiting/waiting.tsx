import clsx from 'clsx';
import classes from './waiting.module.scss';

export const Waiting = ({ text = 'Signing wallet...' }) => (
  <div
    className={clsx(
      'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[10000] flex justify-center items-center',
      classes.bg
    )}>
    <div className={clsx('flex flex-col justify-center items-center p-10', classes.panel)}>
      <div className="w-[100px] h-[75px] text-center">
        <span className="loader"></span>
      </div>
      <span className="mt-12 font-medium text-[24px] leading-[34px] text-black-1c">{text}</span>
    </div>
  </div>
);
