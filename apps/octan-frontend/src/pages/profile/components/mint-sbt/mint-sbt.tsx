import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useMemo } from 'react';
import { useMintSbt } from 'utils';
import { Modal, Button, Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type MintSBTProps = DefaultFcProps;

export const MintSBT: React.FC<MintSBTProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const appContext = useAppContext();
  const {
    userInfo,
    userAddress,
    hasRevokedSbt,
    loggedIn,
    hasSBT,
    selectedChain,
    reputationScore,
    nextUpdateReputationScore,
  } = appContext;

  const navigate = useNavigate();
  const mintSbt = useMintSbt();

  const navigateToProfile = () => navigate('/profile/account-setting');

  const verifiedEmail = useMemo(() => !!userInfo?.isVerifyEmail, [userInfo]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
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
