import { FC, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { DefaultFcProps } from 'common';

type AlertMessageProps = DefaultFcProps & {
  message: string;
  backgroundColor: string;
};

export const AlertMessage: React.FC<AlertMessageProps> = ({ message, backgroundColor }) => {
  const [show, setShow] = useState(true);
  //   useEffect(() => {
  //     const timeId = setTimeout(() => {
  //       setShow(false);
  //     }, 5000);

  //     return () => {
  //       clearTimeout(timeId);
  //     };
  //   }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert
      className={`flex w-full text-base text-black-1c items-center p-4 gap-3 border rounded shadow-[0_4px_8px_rgba(0,0,0,0.16)] ${backgroundColor}`}
      severity="success"
      onClose={() => {
        setShow(false);
      }}>
      {message}
    </Alert>
  );
};
