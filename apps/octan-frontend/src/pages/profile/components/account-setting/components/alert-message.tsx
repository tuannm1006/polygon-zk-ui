import { FC, useEffect, useState } from 'react';
import { Alert } from '@mui/material';

const AlertMessage = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert
      className="flex w-full text-base text-black-1c items-center p-4 gap-3 bg-[#F7FFEC] border border-[#00AA6C] rounded shadow-[0_4px_8px_rgba(0,0,0,0.16)]"
      severity="success"
      onClose={() => {
        setShow(false);
      }}>
      Delete photo successful. Your avatar will back to default
    </Alert>
  );
};

export default AlertMessage;
