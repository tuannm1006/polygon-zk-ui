import React, { useEffect, useState } from 'react';
import { copyToClipboard } from 'utils';
import { ButtonV2, Dialog, DialogTypes, HtmlTooltip } from 'shared-components';
import { TrashIcon } from '../wallet-management';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { useAppContext } from 'contexts';
import { DefaultFcProps } from 'common';

export type WalletListProps = DefaultFcProps & {
  key?: number;
  item: string;
  index: number;
  handleDeleteWalletImported: any;
  handleOpenDelete?: any;
  handleCloseDelete?: any;
  openDeleteWallet?: boolean;
};

export const WalletListComponent: React.FC<WalletListProps> = ({ item, index, handleDeleteWalletImported }) => {
  const [open, setOpen] = useState(false);
  const [openDeleteWallet, setOpenDeleteWallet] = useState(false);
  const appContext = useAppContext();
  const { userInfo, hasSBT, globalRS, computedWallet } = appContext;
  // const isDeleteDisabled = index === 0;

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (item: any) => {
    copyToClipboard(item || '');
    setOpen(true);
  };

  // const handleOpenDelete = () => {
  //   setOpenDeleteWallet(true);
  // };

  const handleCloseDelete = () => {
    setOpenDeleteWallet(false);
  };

  // const handleDeleteWallet = (adddress: string) => {
  //   const isComputed = computedWallet.find((item) => item === adddress);
  //   if (isComputed) {
  //     handleOpenDelete();
  //   } else {
  //     handleDeleteWalletImported(adddress);
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  function CopyIcon(item: any) {
    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          placement="top"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Copied">
          <svg
            onClick={() => handleTooltipOpen(item.item)}
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.00156 14.3996L3.60156 14.3996C2.93882 14.3996 2.40156 13.8624 2.40156 13.1996L2.40156 4.39961C2.40156 3.29504 3.29699 2.39961 4.40156 2.39961L13.2016 2.39961C13.8643 2.39961 14.4016 2.93687 14.4016 3.59961L14.4016 5.99961M12.0016 21.5996L19.2016 21.5996C20.527 21.5996 21.6016 20.5251 21.6016 19.1996L21.6016 11.9996C21.6016 10.6741 20.527 9.59961 19.2016 9.59961L12.0016 9.59961C10.6761 9.59961 9.60156 10.6741 9.60156 11.9996L9.60156 19.1996C9.60156 20.5251 10.6761 21.5996 12.0016 21.5996Z"
              stroke="#B6B6B6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Tooltip>
      </ClickAwayListener>
    );
  }

  return (
    <div
      key={index}
      className="w-full h-[72px] flex items-center p-4 bg-white rounded-lg border-2 border-[#E9E9E9] mb-3">
      <div className="flex w-full items-center border-r-2 border-[#E9E9E9] border-solid">
        <div className="flex gap-[8px] w-10/12">
          <div className="font-bold">{index + 1}.</div>
          <div className="text-ellipsis text-[#4185EC]">
            {item}
            {/* {userInfo?.primaryWallet === item ? ' (Primary)' : ''} */}
          </div>
        </div>
        {userInfo?.primaryWallet === item && hasSBT && (
          <div className="flex items-center gap-[8px] ml-auto mr-4">
            <div>
              <HtmlTooltip title="BNB chain" arrow={true} placement="bottom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#F3BA2F" />
                  <path
                    d="M13.6677 17.9483V19.9655L11.9091 21L10.2022 19.9655V17.9483L11.9091 18.9828L13.6677 17.9483ZM4.25391 10.9655L5.9608 12V15.4655L8.90908 17.2241V19.2414L4.25391 16.5V10.9655ZM19.5642 10.9655V16.5L14.8574 19.2414V17.2241L17.8056 15.4655V12L19.5642 10.9655ZM14.8574 8.22414L16.616 9.25862V11.2759L13.6677 13.0345V16.5517L11.9608 17.5862L10.2539 16.5517V13.0345L7.20218 11.2759V9.25862L8.9608 8.22414L11.9091 9.98276L14.8574 8.22414ZM7.20218 12.7241L8.90908 13.7586V15.7759L7.20218 14.7414V12.7241ZM16.616 12.7241V14.7414L14.9091 15.7759V13.7586L16.616 12.7241ZM5.9608 6.46552L7.71942 7.5L5.9608 8.53448V10.5517L4.25391 9.51724V7.5L5.9608 6.46552ZM17.8573 6.46552L19.616 7.5V9.51724L17.8573 10.5517V8.53448L16.1505 7.5L17.8573 6.46552ZM11.9091 6.46552L13.6677 7.5L11.9091 8.53448L10.2022 7.5L11.9091 6.46552ZM11.9091 3L16.616 5.74138L14.9091 6.77586L11.9608 5.01724L8.9608 6.77586L7.25391 5.74138L11.9091 3Z"
                    fill="white"
                  />
                </svg>
              </HtmlTooltip>
            </div>
            <InformationIconToolTip />
          </div>
        )}
      </div>
      <div className="flex gap-[20px] p-4">
        <CopyIcon
          item={item}
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
          open={open}
        />
        {/* {isDeleteDisabled && (
          <HtmlTooltip title="Primary wallet so cannot delete" arrow placement="bottom">
            <svg
              className={'cursor-pointer'}
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.39844 5.3998H20.5984M8.59844 17.3998V10.1998M13.3984 17.3998V10.1998M15.7984 22.1998H6.19844C4.87295 22.1998 3.79844 21.1253 3.79844 19.7998V6.5998C3.79844 5.93706 4.3357 5.3998 4.99844 5.3998H16.9984C17.6612 5.3998 18.1984 5.93706 18.1984 6.5998V19.7998C18.1984 21.1253 17.1239 22.1998 15.7984 22.1998ZM8.59844 5.3998H13.3984C14.0612 5.3998 14.5984 4.86255 14.5984 4.1998V2.9998C14.5984 2.33706 14.0612 1.7998 13.3984 1.7998H8.59844C7.9357 1.7998 7.39844 2.33706 7.39844 2.9998V4.1998C7.39844 4.86255 7.9357 5.3998 8.59844 5.3998Z"
                stroke={isDeleteDisabled ? '#E9E9E9' : '#B6B6B6'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </HtmlTooltip>
        )}
        {!isDeleteDisabled && (
          <div onClick={() => handleDeleteWallet(item)}>
            <TrashIcon disabled={isDeleteDisabled} />
          </div>
        )} */}
      </div>
      <Dialog
        type={DialogTypes.None}
        open={openDeleteWallet || false}
        handleClose={handleCloseDelete}
        title="Delete wallet">
        <div className="connect-wallet-modal mt-5 w-[310px] max-[361px]:w-[280px] sm:w-[410px]">
          <div className="flex flex-col items-center justify-center ">
            <div className="separate-line w-full mt-6" />
            <div className="title mt-6">
              This wallet is computed for SBT. Your reputation scores could be decreased. Are you sure to remove it?
            </div>
          </div>

          <div className="flex gap-6 items-center justify-center mt-6">
            <ButtonV2 onClick={handleCloseDelete}>No</ButtonV2>
            <ButtonV2 onClick={() => handleDeleteWalletImported(item)}>Yes</ButtonV2>
            {/* <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleCloseDelete}>
              No
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleDeleteWalletImported(item)}>
              Yes
            </button> */}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export const InformationIconToolTip = () => {
  return (
    <HtmlTooltip
      title={
        <>
          Primary wallet is the wallet used to mint Octan Soulbound Token (SBT) and is binded to that SBT. SBT
          administration can only be performed using the primary wallet.
        </>
      }>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.9984 11.0004L10.9984 15.8004M10.9984 7.44258V7.40039M1.39844 11.0004C1.39844 5.69846 5.6965 1.40039 10.9984 1.40039C16.3004 1.40039 20.5984 5.69846 20.5984 11.0004C20.5984 16.3023 16.3004 20.6004 10.9984 20.6004C5.6965 20.6004 1.39844 16.3023 1.39844 11.0004Z"
          stroke="#B6B6B6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </HtmlTooltip>
  );
};
