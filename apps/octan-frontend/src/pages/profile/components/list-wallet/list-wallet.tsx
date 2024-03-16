import { ClickAwayListener, InputAdornment, Tooltip } from '@mui/material';
import { showModalActions } from 'app';
import { DefaultFcProps } from 'common';
import { signToAddWallet, useAppContext, useWeb3Context } from 'contexts';
import { propOr } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { GradientButton, Input, HtmlTooltip, DialogTypes, Dialog, ChangeWalletPopup } from 'shared-components';
import { getApi } from 'swagger';
import { copyToClipboard, getCurrentAddress, logError, requestPermissions, useChangeSbt, useEmit } from 'utils';
import { styled } from '@mui/material/styles';

export type WalletManagementProps = DefaultFcProps;

export const ImportButton = styled(GradientButton)({
  '&:disabled': {
    cursor: 'not-allowed',
    color: '#B6B6B6',
    background: '#F2F2F2',
    border: '1px solid #F2F2F2',
  },
});

function WalletListComponent(props: any) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (item: any) => {
    copyToClipboard(item || '');
    setOpen(true);
  };

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
      key={props.index}
      className="w-full h-[72px] flex items-center p-4 bg-white rounded-lg border-2 border-[#E9E9E9]">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-[8px] w-10/12">
          <div className="font-bold">{props.index + 1}.</div>
          <div className="text-ellipsis text-[#4185EC]">
            {props.item}
            {/* {props.userInfo?.primaryWallet === props.item ? ' (Primary)' : ''} */}
          </div>
        </div>
      </div>
      {props.userInfo?.primaryWallet === props.item && props.hasSBT && (
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
      <div className="flex gap-[20px] p-4 items-center">
        <div className="flex items-center gap-[8px] pr-4 border-r-2 border-[#E9E9E9] border-solid">
          <div className="flex flex-col">
            <span className="text-[#898989] text-xs ">RS</span>
            <span className="linear-text text-lg font-bold">{props.globalRS ? props.globalRS : '0'}</span>
          </div>
        </div>
        <CopyIcon
          item={props.item}
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
          open={open}
        />
      </div>
    </div>
  );
}

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

export const ListWallet: React.FC<WalletManagementProps> = ({ className }) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [primaryWallet, setPrimaryWallet] = useState('');
  const [nextPrimaryWallet, setNextPrimaryWallet] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const appContext = useAppContext();
  const [openChangeWallet, setopenChangeWallet] = useState(false);
  const handleOpenChangeWallet = () => setopenChangeWallet(true);
  const handleCloseChangeWallet = () => setopenChangeWallet(false);

  const {
    hasSBT,
    setIsWaiting,
    getChainKey,
    userInfo,
    userAddresses,
    fetchUserWallets,
    fetchUserInfo,
    signOut,
    globalRS,
    fetchComputedWallets,
    computedWallet,
  } = appContext;
  const { connectWalletWithBe } = useWeb3Context();
  const [isOpen, setIsOpen] = useState(false);

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

      if (currentAddress !== walletAddress) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Connect new wallet',
          subTitle: 'You need to change your Metamask to the wallet you want to import to complete.',
        });
      } else {
        await getApi().walletsAddWalletPost({
          walletAddress,
          chainKey: getChainKey(),
          signature: await signToAddWallet(walletAddress),
        });
        setNewAddress('');
        fetchUserWallets();
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Info,
          title: 'Successfully',
          subTitle: 'New wallet was imported.',
        });
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

  const InformationIcon = () => {
    return (
      // <HtmlTooltip
      //   title={
      //     <>The account's total global RS of all calculated wallets will be periodically recorded on-chain by Octan.</>
      //   }>
      <svg width="16px" height="16px" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.9984 11.0004L10.9984 15.8004M10.9984 7.44258V7.40039M1.39844 11.0004C1.39844 5.69846 5.6965 1.40039 10.9984 1.40039C16.3004 1.40039 20.5984 5.69846 20.5984 11.0004C20.5984 16.3023 16.3004 20.6004 10.9984 20.6004C5.6965 20.6004 1.39844 16.3023 1.39844 11.0004Z"
          stroke="#B6B6B6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      // </HtmlTooltip>
    );
  };

  function ChangeIcon() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.16953 15.1675H2.56952C1.57541 15.1675 0.769525 14.3616 0.769531 13.3675L0.769601 2.56757C0.769607 1.57346 1.57549 0.767578 2.5696 0.767578H10.6698C11.6639 0.767578 12.4698 1.57347 12.4698 2.56758V6.16758M3.91981 4.36758H9.31981M3.91981 7.06758H9.31981M3.91981 9.76758H6.61981M8.86968 12.6858L12.6881 8.86747L15.2336 11.4131L11.4153 15.2314H8.86968V12.6858Z"
          stroke="#B6B6B6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  useEffect(() => {
    fetchUserWallets();
    fetchComputedWallets();
  }, []);

  useEffect(() => {
    setPrimaryWallet(userInfo?.primaryWallet || '');
  }, [userInfo?.primaryWallet]);

  return (
    <>
      <div className={className}>
        <div className="border-solid">
          <p className="font-medium text-xl text-black-1c">Primary wallet</p>
          <div className="mt-[16px]">
            <WalletListComponent
              index={0}
              item={primaryWallet}
              hasSBT={hasSBT}
              userInfo={userInfo}
              globalRs={globalRS}
            />
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-y-20">
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-2">
                  <label className="text-black-1c text-xl font-medium">{`Wallets included in SBT (${computedWallet.length} wallets)`}</label>
                  {/* <div className="flex items-center text-xs text-center text-[#5B5B5B] bg-[#CECECE] px-[8px] py-[3px] gap-x-1.5 rounded-3xl">
                    Unsync
                    <InformationIcon />
                  </div> */}
                </div>

                <div
                  onClick={() => handleOpenChangeWallet()}
                  className={`flex py-[11px] items-center justify-center gap-x-2`}>
                  <ChangeIcon />
                  <HtmlTooltip
                    title="Change your wallet(s) that you want included in your SBT"
                    arrow={true}
                    placement="bottom">
                    <div className="flex items-center font-bold text-[#B6B6B6] underline underline-offset-1 cursor-pointer">
                      Change
                    </div>
                  </HtmlTooltip>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-[16px]">
                {computedWallet.map((item, index) => (
                  <WalletListComponent
                    item={item}
                    index={index}
                    hasSBT={hasSBT}
                    userInfo={userInfo}
                    globalRs={globalRS}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openChangeWallet && (
        <ChangeWalletPopup
          open={openChangeWallet}
          handleClose={handleCloseChangeWallet}
          onConfirm={handleOpenChangeWallet}
        />
      )}
    </>
  );
};
