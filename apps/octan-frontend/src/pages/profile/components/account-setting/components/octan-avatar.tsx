import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { DEFAULT_AVATAR_URL } from 'consts';
import AlertMessage from './alert-message';
import { BackArrow, CloseIcon } from './upload-btn';

const OctanAvatar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex gap-4">
            <BackArrow />
            <p className="text-black-1c text-2xl">Edit avatar</p>
          </div>
          <CloseIcon close={handleClose} />
          <p className="font-medium text-2xl text-center text-black-1c ">Minting SBT...</p>
        </div>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  width: '628px',
  bgcolor: '#FFFFFF',
  borderRadius: '16px',
  p: '40px',
  gap: '40px',
};

export default OctanAvatar;
