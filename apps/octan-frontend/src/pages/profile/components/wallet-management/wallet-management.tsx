import { InputAdornment } from '@mui/material';
import { showModalActions } from 'app';
import { DefaultFcProps } from 'common';
import { signToAddWallet, useAppContext, useWeb3Context } from 'contexts';
import { isEmpty, propOr } from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  GradientButton,
  Input,
  HtmlTooltip,
  DialogTypes,
  Dialog,
  ButtonV2,
  ButtonCopyToClipboard,
  ConfirmModal,
  Button,
} from 'shared-components';
import { getApi } from 'swagger';
import { copyToClipboard, getCurrentAddress, logError, requestPermissions, useChangeSbt, useEmit } from 'utils';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isAddress } from 'ethers/lib/utils';
import { find } from 'lodash';
import toast from 'react-hot-toast';
import { WalletListComponent } from '../wallet-list-component';

export type WalletManagementProps = DefaultFcProps & {
  isModal: boolean;
  onStepDone?: (stepId: string) => void;
  stepId?: string;
};

export const ImportButton = styled(GradientButton)({
  '&:disabled': {
    cursor: 'not-allowed',
    color: '#B6B6B6',
    background: '#F2F2F2',
    border: '1px solid #F2F2F2',
  },
});

export const InformationIconToolTip = () => {
  return (
    <HtmlTooltip
      title={
        <>
          Add wallet to ownership list. Therein, you can select wallets to calculate reputation scores associated with
          soulbound token (SBT).
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

export const TrashIcon = ({ disabled = false }) => {
  return (
    <svg
      className={'cursor-pointer'}
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.39844 5.3998H20.5984M8.59844 17.3998V10.1998M13.3984 17.3998V10.1998M15.7984 22.1998H6.19844C4.87295 22.1998 3.79844 21.1253 3.79844 19.7998V6.5998C3.79844 5.93706 4.3357 5.3998 4.99844 5.3998H16.9984C17.6612 5.3998 18.1984 5.93706 18.1984 6.5998V19.7998C18.1984 21.1253 17.1239 22.1998 15.7984 22.1998ZM8.59844 5.3998H13.3984C14.0612 5.3998 14.5984 4.86255 14.5984 4.1998V2.9998C14.5984 2.33706 14.0612 1.7998 13.3984 1.7998H8.59844C7.9357 1.7998 7.39844 2.33706 7.39844 2.9998V4.1998C7.39844 4.86255 7.9357 5.3998 8.59844 5.3998Z"
        stroke={disabled ? '#E9E9E9' : '#B6B6B6'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WalletManagement: React.FC<WalletManagementProps> = ({
  className,
  isModal,
  stepId = 'import-wallet',
  onStepDone,
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [primaryWallet, setPrimaryWallet] = useState('');
  const [nextPrimaryWallet, setNextPrimaryWallet] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const appContext = useAppContext();
  const {
    setIsWaiting,
    getChainKey,
    userInfo,
    userAddresses,
    fetchUserWallets,
    fetchUserInfo,
    signOut,
    globalRS,
    hasSBT,
    computedWallet,
  } = appContext;
  const { connectWalletWithBe } = useWeb3Context();
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [openDeleteWallet, setOpenDeleteWallet] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

  const handleOpenDelete = () => {
    setOpenDeleteWallet(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteWallet(false);
  };

  const handleTooltipClose = () => {
    setShowAlert(false);
  };

  const handleConfirm = () => {
    onStepDone?.(stepId);
    setShowAlert(false);
  };

  const emit = useEmit();
  const changeSbt = useChangeSbt();

  const onChangePrimaryWallet = async () => {
    const currentAddress = await getCurrentAddress();
    setCurrentAddress(currentAddress);
    if (currentAddress !== userInfo?.primaryWallet) {
      setIsOpenConfirm(true);
    } else {
      setNextPrimaryWallet(otherAddresses[0]);
      setIsOpen(true);
    }
  };

  const onVerify = async () => {
    try {
      const walletAddress = newAddress.toLowerCase();
      const currentAddress = await getCurrentAddress();

      if (currentAddress.toLowerCase() !== walletAddress) {
        setErrMsg('You need to change your Metamask to the wallet you want to import to complete.');
      } else {
        await getApi().walletsAddWalletPost({
          walletAddress,
          chainKey: getChainKey(),
          signature: await signToAddWallet(walletAddress),
        });
        setNewAddress('');
        fetchUserWallets();
        toast.success('Import wallet successful');
      }
    } catch (error: any) {
      if (error.json) {
        const err = await error.json();
        toast.error(err.message);
      }
    }
  };

  const deleteWallet = async (address: string) => {
    try {
      const walletAddress = address;
      await getApi().walletsDeleteWalletPost({
        walletAddress,
      });
      fetchUserWallets();
      toast.success('Delete wallet successful');
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        toast.error(data.message);
      }
    }
  };

  const handleDeleteWalletImported = (address: string) => {
    deleteWallet(address);
  };

  // const handleDeleteWalletImported = async (address: string) => {
  //   console.log(computedWallet.find((item) => item === address));
  //   try {
  //     const walletAddress = address;
  //     const isComputedWallet = computedWallet.find((item) => item === address);

  //     // if (isComputedWallet) {
  //     //   emit({
  //     //     action: showModalActions.showWarning,
  //     //     type: DialogTypes.Info,
  //     //     title: 'Connect new wallet',
  //     //     subTitle: 'You need to change your Metamask to the wallet you want to import to complete.',
  //     //   });
  //     // }
  //     // await getApi().walletsDeleteWalletPost({
  //     //   walletAddress,
  //     // });
  //     // fetchUserWallets();
  //     // toast.success('Delete wallet successful');
  //   } catch (error: any) {
  //     if (error.json) {
  //       const data = await error.json();
  //       toast.error(data.message);
  //     }
  //   }
  // };

  const onConfirm = async () => {
    try {
      setIsOpen(false);
      const txHash = await changeSbt(appContext, nextPrimaryWallet);

      if (!!txHash) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Info,
          title: 'Successfully',
          subTitle: 'Primary wallet was changed.',
        });
        fetchUserWallets();
        fetchUserInfo();
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: propOr('Something wrong', 'message', data),
        });
      }
    }
  };

  const otherAddresses = useMemo(
    () => userAddresses.filter((wallet) => wallet !== primaryWallet),
    [userAddresses, primaryWallet]
  );

  const onConnect = async () => {
    try {
      setIsWaiting(true);
      await requestPermissions();
      signOut();
      await connectWalletWithBe();
      setIsOpenConfirm(false);
    } catch (error) {
      logError('changeWallet')(error);
    } finally {
      setIsWaiting(false);
    }
  };

  const isAddressImported = (address: string): boolean => {
    return find(userAddresses, (ua) => ua.toLowerCase() === address.toLowerCase()) !== undefined;
  };

  useEffect(() => {
    fetchUserWallets();
  }, []);

  useEffect(() => {
    setPrimaryWallet(userInfo?.primaryWallet || '');
  }, [userInfo?.primaryWallet]);

  const handleNewAddressChanged = async (address: string) => {
    setNewAddress(address);

    if (!address || address.length == 0) {
      setErrMsg('');
      return;
    }

    if (!isAddress(address)) {
      setErrMsg(`Invalid format`);
      return;
    }

    if (isAddressImported(address)) {
      setErrMsg(`This wallet have already imported.`);
      return;
    }

    const walletAddress = address.toLowerCase();
    const currentAddress = await getCurrentAddress();

    if (currentAddress.toLowerCase() !== walletAddress) {
      setErrMsg('You need to change your Metamask to the wallet you want to import to complete.');
      return;
    }

    setErrMsg('');
  };

  const onContinueBtnClicked = () => {
    if (userAddresses.length === 1) {
      setShowAlert(true);
    }
    if (userAddresses.length > 1) onStepDone?.(stepId);
  };

  return (
    <>
      <div className={className}>
        {!isModal && (
          <div className="text-2xl text-zinc-900 font-medium leading-[34px] pb-6 border-b-2 border-[#E9E9E9] border-solid">
            Wallets
          </div>
        )}
        <div className={isModal ? 'flex flex-col' : 'flex flex-col md:mt-6 gap-y-20'}>
          <div className="w-full gap-6">
            <div className="mb-6">
              <div className="flex gap-2 items-center mb-3">
                <label className="text-black-1c text-xl font-medium leading-[30px]">Import your wallet</label>
                <InformationIconToolTip />
              </div>
              <div className="my-6 pb-[14px] border-b-2 border-[#E9E9E9] border-solid">
                <div className="flex justify-between gap-6">
                  <div className="flex-col flex-grow">
                    <div>
                      <input
                        id="newWallet"
                        placeholder="Enter your wallet address"
                        value={newAddress}
                        onChange={(event) => handleNewAddressChanged(event.target.value)}
                        className="bg-white h-[48px] w-full px-[16px] py-[11px] border rounded border-[#B6B6B6]"
                      />
                    </div>
                    <div className="flex flex-row mt-2 items-center">
                      {errMsg.length > 0 && (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.33203 8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C11.6806 1.33398 14.6654 4.31875 14.6654 8.00065C14.6654 11.6825 11.6806 14.6673 7.9987 14.6673C4.3168 14.6673 1.33203 11.6825 1.33203 8.00065ZM7.9987 4.66732C8.36689 4.66732 8.66536 4.96579 8.66536 5.33398V8.00065C8.66536 8.36884 8.36689 8.66732 7.9987 8.66732C7.63051 8.66732 7.33203 8.36884 7.33203 8.00065V5.33398C7.33203 4.96579 7.63051 4.66732 7.9987 4.66732ZM7.33203 10.6673C7.33203 10.2991 7.63051 10.0007 7.9987 10.0007C8.36689 10.0007 8.66536 10.2991 8.66536 10.6673C8.66536 11.0355 8.36689 11.334 7.9987 11.334C7.63051 11.334 7.33203 11.0355 7.33203 10.6673Z"
                              fill="#FF4747"
                            />
                          </svg>
                          <div className="text-[#FF4747] ml-2">{errMsg}</div>
                        </>
                      )}
                    </div>
                  </div>
                  <ButtonV2
                    disabled={isEmpty(newAddress) || errMsg.length > 0}
                    onClick={onVerify}
                    // sx={{ height: '48px' }}
                    className="w-[160px] h-[48px]">
                    Import
                  </ButtonV2>
                </div>
              </div>
              <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <p className="text-black-1c text-xl mb-2 mt-2 leading-[30px] font-medium">List of your wallets</p>
                </AccordionSummary>
                <AccordionDetails>
                  {userAddresses.map((item, index) => (
                    <WalletListComponent
                      key={index}
                      item={item}
                      index={index}
                      handleDeleteWalletImported={handleDeleteWalletImported}
                      handleOpenDelete={handleOpenDelete}
                      handleCloseDelete={handleCloseDelete}
                      openDeleteWallet={openDeleteWallet}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        {isModal && (
          <>
            <hr className="border-[#E9E9E9] h-[1px] w-full" />
            <div className="flex flex-col items-end w-full mt-6">
              <ButtonV2 className="w-[200px] h-[48px]" onClick={onContinueBtnClicked}>
                Continue
              </ButtonV2>
            </div>
          </>
        )}
        {showAlert && (
          <ConfirmModal
            type={DialogTypes.None}
            open={showAlert}
            handleClose={handleTooltipClose}
            handleConfirm={handleConfirm}
            buttonGreen="No"
            buttonRed="Yes">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <img src="/assets/images/user-information/confirm-modal-warning.svg" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-[548px] text-center text-zinc-900 text-[24px] font-medium leading-loose">
                  You have only 1 wallet for updating reputation scores. Are you sure to continues?
                </div>
              </div>
            </div>
          </ConfirmModal>
          // <Dialog open={showAlert} handleClose={handleTooltipClose}>
          //   <div className="flex flex-col gap-10">
          //     <div className="flex flex-col">
          //       <div className="flex justify-center">
          //         <img src="/assets/images/user-information/confirm-modal-warning.svg" />
          //       </div>
          //       <div className="flex flex-col gap-3">
          //         <div className="w-[548px] text-center text-zinc-900 text-[24px] font-medium leading-loose">
          //           You have only 1 wallet for computing reputation scores. Are you sure to continues?
          //         </div>
          //       </div>
          //     </div>

          //     <div className="flex justify-center gap-6">
          //       <Button
          //         onClick={handleTooltipClose}
          //         className="flex grow-0"
          //         variant="outlined"
          //         sx={{ height: '48px', width: '100%' }}>
          //         No
          //       </Button>
          //       <ButtonV2 onClick={handleConfirm} className="" sx={{ width: '100%', background: '#FF4747' }}>
          //         Yes
          //       </ButtonV2>{' '}
          //     </div>
          //   </div>
          // </Dialog>
        )}
        ;
      </div>
    </>
  );
};
