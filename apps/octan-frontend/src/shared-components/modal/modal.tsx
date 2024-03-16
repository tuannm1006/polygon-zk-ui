import { Box as MuiBox, IconButton as MuiIconButton, Modal as MuiModal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DefaultFcProps } from 'common';

const IconButton = styled(MuiIconButton)({
  position: 'absolute',
  top: 16,
  right: 16,
});

const Box = styled(MuiBox)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0px -1px 12px rgba(255, 255, 255, 0.25)',
  borderRadius: 16,
  padding: '24px',
  background: '#FFFFFF',
});

type ModalProps = DefaultFcProps & {
  title?: string;
  open: boolean;
  handleClose: () => void;
  hasClose?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ title, open, handleClose, hasClose = true, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box>
        <div className="absolute left-[24px] top-[18px] font-medium leading-[34px] text-2xl text-black-1c">{title}</div>
        {hasClose && (
          <div className="flex">
            <IconButton onClick={handleClose}>
              <i className="octan-icon octan-icon--close"></i>
            </IconButton>
          </div>
        )}

        {children}
      </Box>
    </MuiModal>
  );
};
