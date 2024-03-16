import { DefaultFcProps } from 'common';
import React from 'react';
import { Dialog, DialogTypes } from '../dialog';
import { ButtonV2 } from '../button-v2';
import { Button } from '@mui/material';

type ConfirmModalProps = DefaultFcProps & {
  type?: string;
  title?: string;
  subTitle?: string;
  open: boolean;
  buttonGreen?: string;
  buttonRed?: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  className,
  type = DialogTypes.Success,
  title,
  subTitle,
  open,
  children,
  buttonGreen,
  buttonRed,
  handleClose,
  handleConfirm,
}) => {
  const onCancel = () => {
    handleClose && handleClose();
  };

  const onConfirm = () => {
    handleConfirm && handleConfirm();
  };

  return (
    <Dialog className={className} type={type} title={title} subTitle={subTitle} open={open} handleClose={handleClose}>
      <div className="flex flex-col gap-10">
        {children}

        <div className="flex justify-center gap-6">
          <Button onClick={onCancel} className="flex grow-0" variant="outlined" sx={{ height: '48px', width: '100%' }}>
            {buttonGreen ? buttonGreen : 'Cancel'}
          </Button>
          <ButtonV2 onClick={onConfirm} className={`${buttonRed ? '!bg-[#FF4747]' : ''}`} sx={{ width: '100%' }}>
            {buttonRed ? buttonRed : 'Confirm'}
          </ButtonV2>{' '}
        </div>
      </div>
    </Dialog>
  );
};
