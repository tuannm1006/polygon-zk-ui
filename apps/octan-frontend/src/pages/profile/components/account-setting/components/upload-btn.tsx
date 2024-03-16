import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { any, is } from 'ramda';
import { DEFAULT_AVATAR_URL } from 'consts';
import AlertMessage from './alert-message';
import OctanAvatar from './octan-avatar';
import { LIST_DEFAULT_AVATAR } from 'consts';
const UploadIcon = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="38" height="38" rx="19" fill="white" />
      <path
        d="M19.0492 11.3514H13.0492C11.061 11.3514 9.44922 12.9632 9.44922 14.9514V26.9515C9.44922 28.9398 11.061 30.5515 13.0492 30.5515H25.0492C27.0374 30.5515 28.6492 28.9398 28.6492 26.9515L28.6492 20.9515M15.4492 24.5514L19.8152 23.6717C20.047 23.625 20.2598 23.5109 20.4269 23.3437L30.2006 13.5646C30.6692 13.0958 30.6689 12.3358 30.1999 11.8673L28.1295 9.79923C27.6607 9.33097 26.9011 9.33129 26.4327 9.79995L16.658 19.58C16.4912 19.7469 16.3773 19.9593 16.3305 20.1906L15.4492 24.5514Z"
        stroke="#1C1C1C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="1" y="1" width="38" height="38" rx="19" stroke="#E9E9E9" strokeWidth="2" />
    </svg>
  );
};

export const CloseIcon: FC<any> = ({ close }) => {
  return (
    <svg
      className="cursor-pointer"
      onClick={close}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M18 18L6 6" stroke="#B6B6B6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const BackArrow = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.4016 16.7998L9.60156 11.9998L14.4016 7.19981"
        stroke="#1C1C1C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const UploadButton: FC<any> = ({ placeholder, disabled, onChange, onDeleteAvatar }) => {
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openDefaultAvatar, setOpenDefaultAvatar] = useState(false);
  const [avatar, setAvatar] = useState<string>(() => DEFAULT_AVATAR_URL);
  const [isDelete, SetIsDelete] = useState(false);
  const [octanAvatar, setOctanAvatar] = useState(false);
  const handleOpenEditAvatar = () => setOpenEditAvatar(true);
  const handleCloseEditAvatar = () => setOpenEditAvatar(false);
  const handleOpenDefaultAvatar = () => setOpenDefaultAvatar(true);
  const handleCloseDefaultAvatar = () => setOpenDefaultAvatar(false);
  const [file, setFile] = useState<
    | {
        picturePreview: any;
        pictureAsFile: any;
      }
    | undefined
  >(undefined);

  const onDelete = () => {
    setAvatar(DEFAULT_AVATAR_URL);
    setFile(undefined);
    onDeleteAvatar(DEFAULT_AVATAR_URL);
    SetIsDelete(true);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      SetIsDelete(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [avatar, file]);

  return (
    <div className="flex flex-col items-center relative">
      <label className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-full bg-gray-300 mb-4 relative overflow-hidden">
        <img src={file?.picturePreview || avatar} alt="avatar" className="object-cover object-center w-full" />
      </label>
      {/* <label onClick={handleOpenEditAvatar} className="cursor-pointer absolute bottom-0 right-0">
        <UploadIcon />
      </label> */}
      <Modal
        open={openEditAvatar}
        onClose={handleCloseEditAvatar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex gap-4 items-center">
              <BackArrow />
              <p className="text-black-1c text-2xl">Edit avatar</p>
            </div>
            <CloseIcon close={handleCloseEditAvatar} />
          </div>
          <div className="flex w-full">{isDelete && <AlertMessage />}</div>
          <img
            src={file?.picturePreview || placeholder}
            alt="avatar"
            className="object-cover object-center w-[280x] h-[280px]"
          />
          <hr className="border-[#E9E9E9] h-[1px] w-full" />
          <div className="flex w-full justify-between items-start gap-6">
            <div className="flex items-start gap-6 h-[50px]">
              <div className="flex flex-col items-center gap-1 h-[50px]">
                <img src="/assets/images/user-information/crop-image.svg" alt="crop image" />
                <p className="text-sm text-black-1c">Crop image</p>
              </div>
              <div className="flex flex-col items-center gap-1 h-[50px]">
                <label htmlFor="upload-avatar" className="cursor-pointer">
                  <img src="/assets/images/user-information/upload-image.svg" alt="upload photo" />
                </label>
                <p className="text-sm text-black-1c">Upload photo</p>
              </div>
              <div className="flex flex-col items-center gap-1 h-[50px]">
                <label htmlFor="octan-avatar" className="cursor-pointer">
                  <img src="/assets/images/user-information/octan-default-ava.svg" alt="octan avatar" />
                </label>
                <p className="text-sm text-black-1c">Octan avatar</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 h-[50px]">
              <label htmlFor="delete-avatar" className="cursor-pointer">
                <img className="cursor-pointer" src="/assets/images/user-information/trash-01.svg" alt="trash" />
              </label>
              <p className="text-sm text-[#898989]">Delete</p>
            </div>
          </div>
          <input disabled={disabled} hidden id="octan-avatar" onClick={() => handleOpenDefaultAvatar()} />
          <input
            disabled={disabled}
            hidden
            id="delete-avatar"
            onClick={() => {
              // if (avatar === DEFAULT_AVATAR_URL) {
              //   return;
              // }
              onDelete();
            }}
          />
          <input
            disabled={disabled}
            type="file"
            hidden
            id="upload-avatar"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              onChange(file);
              setFile({
                picturePreview: URL.createObjectURL(file),
                pictureAsFile: file,
              });
            }}
          />
        </Box>
      </Modal>
      {openDefaultAvatar && (
        <Modal
          open={openDefaultAvatar}
          onClose={handleCloseDefaultAvatar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex gap-4">
                <BackArrow />
                <p className="text-black-1c text-2xl">Octan avatar</p>
              </div>
              <CloseIcon close={handleCloseDefaultAvatar} />
            </div>
            <div className="flex items-start gap-6 flex-wrap">
              {LIST_DEFAULT_AVATAR.map((item) => (
                <img src={item} className="w-[119px] h-[119px] rounded-[80px] border-[3px] border-[#0DB774]" />
              ))}
            </div>
            <hr className="border-[#E9E9E9] h-[1px] w-full" />
            <button className="flex justify-center px-5 py-[11px] gap-[10px] h-12 w-[200px] rounded-2 bg-[#0DB774]">
              <p className="font-medium text-base text-white text-center">Save</p>
            </button>
          </Box>
        </Modal>
      )}
    </div>
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

const StyledLabel = styled.label`
  background: linear-gradient(90deg, #00fe7e 0%, #00c4fe 100%);
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  padding: 8px 12px;
  cursor: pointer;
`;

export default UploadButton;
