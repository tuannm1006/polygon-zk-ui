import { useEffect, useRef, useState } from 'react';
import { DefaultFcProps } from 'common';
import { useNavigate } from 'react-router-dom';
import { WalletManagement } from '../../../pages/profile/components/wallet-management';
import { Modal, Box, Checkbox, FormControlLabel } from '@mui/material';
import { CloseIcon } from '../../../pages/profile/components/account-setting/components/upload-btn';
import { signToAddWallet, useAppContext } from 'contexts';
import classNames from 'classnames';
import { WalletList } from '../mint-token/components/WalletList';
import { filter, find } from 'lodash';
import { formatAddress, useEmit } from 'utils';
import { BadgeGift } from '../../../shared-components/user-information';
import { chainListDesc } from '../../../pages/profile/components/sbts-management';
import { ButtonV2 } from '../../../shared-components/button-v2';
import { showModalActions } from 'app';
import { DialogTypes } from '../../../shared-components/dialog';
import { getApi } from 'swagger';
import { propOr } from 'ramda';
import { toJson } from '@octan/common';

const InformationIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33203 8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C11.6806 1.33398 14.6654 4.31875 14.6654 8.00065C14.6654 11.6825 11.6806 14.6673 7.9987 14.6673C4.3168 14.6673 1.33203 11.6825 1.33203 8.00065ZM7.33203 5.33398C7.33203 4.96579 7.63051 4.66732 7.9987 4.66732C8.36689 4.66732 8.66536 4.96579 8.66536 5.33398C8.66536 5.70217 8.36689 6.00065 7.9987 6.00065C7.63051 6.00065 7.33203 5.70217 7.33203 5.33398ZM7.9987 7.33398C8.36689 7.33398 8.66536 7.63246 8.66536 8.00065V10.6673C8.66536 11.0355 8.36689 11.334 7.9987 11.334C7.63051 11.334 7.33203 11.0355 7.33203 10.6673V8.00065C7.33203 7.63246 7.63051 7.33398 7.9987 7.33398Z"
        fill="#4185EC"
      />
    </svg>
  );
};

type ChangeWalletProps = DefaultFcProps & {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

export const ChangeWalletPopup: React.FC<ChangeWalletProps> = ({ open, handleClose, onConfirm }) => {
  const windowHeight = useRef(window.innerHeight);
  const navigation = useNavigate();

  const {
    userAddress,
    userAddresses,
    hasSBT,
    globalRS,
    getChainKey,
    fetchComputedWallets,
    updateComputedWallets,
    setIsWaiting,
    computedWallet,
    userInfo,
  } = useAppContext();
  const [primaryWallet, setPrimaryWallet] = useState(userAddress || '');
  const [selectedWallets, setSelectedWallets] = useState<string[]>(computedWallet);
  const [checkboxAll, setCheckboxAll] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const emit = useEmit();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '16px',
    p: '40px',
    gap: '40px',
    minWidth: '960px',
    // windowHeight.current && maxHeight: '682px',
    maxHeight: `${windowHeight.current < 830 ? '682px' : 'fit-content'}`,
    overflow: 'auto',
  };

  useEffect(() => {
    if (selectedWallets.length === userAddresses.length) {
      setCheckboxAll(true);
    } else {
      setCheckboxAll(false);
    }
  }, [userAddresses, selectedWallets]);

  const compareArrays = (a: any, b: any) => {
    const arr1 = a.sort();
    const arr2 = b.sort();
    return arr1.length === arr2.length && arr1.every((element: any, index: any) => element === arr2[index]);
  };

  const handleChangeComputedWallet = async () => {
    try {
      if (selectedWallets.length <= 0) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Choose at least 1 wallet',
          subTitle: 'You need to choose at least 1 wallet to include in SBT.',
        });
      } else {
        setIsWaiting(true);
        const computedWallets = [primaryWallet];
        selectedWallets.map((item) => computedWallets.push(item));
        const { result } = await getApi()
          .signComputedWalletsPost({
            computedWallets,
            chainKey: getChainKey(),
          })
          .then(toJson);
        await updateComputedWallets(result);
        await getApi()
          .walletsAddComputedWalletPost({
            computedWallets,
            chainKey: getChainKey(),
          })
          .then(toJson);
        setSelectedWallets([]);
        fetchComputedWallets();
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Info,
          title: 'Successfully',
          subTitle: 'Your included wallet(s) in SBT has been updated!',
        });
        handleClose();
        setIsWaiting(false);
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        setIsWaiting(false);
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: propOr('Something wrong', 'message', data),
        });
      }
    }
  };

  const handleNavigateToSBTManagement = () => {
    handleClose();
    navigation('profile/sbts-management');
  };

  const onWalletSelected = (address: string) => {
    let newList = [];

    if (isWaletSelected(address)) {
      newList = filter(selectedWallets, (s) => s !== address);
    } else {
      newList = [...selectedWallets, ...[address]];
    }

    setSelectedWallets(newList);
  };

  const handleSelectAllWallets = () => {
    if (checkboxAll) {
      setSelectedWallets([userInfo?.primaryWallet || '']);
      setCheckboxAll(false);
    } else {
      setSelectedWallets(userAddresses);
      setCheckboxAll(true);
    }
  };

  const isWaletSelected = (address: string) => {
    return find(selectedWallets, (w) => w === address) !== undefined;
  };

  const renderWalletList = () => {
    return userAddresses.map((address, idx) => {
      return (
        <WalletList
          key={idx}
          address={address}
          primaryWallet={userInfo?.primaryWallet}
          onWalletSelected={onWalletSelected}
          isWaletSelected={isWaletSelected}
          hasSBT={hasSBT}
          globalRS={globalRS}
          idx={idx}
        />
      );
    });
  };

  return (
    <>
      {/* <WalletManagement className="w-full" isModal={true} /> */}
      <Modal
        sx={{ padding: '24px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <>
            <div className="w-full flex justify-between items-center">
              <p className="text-black-1c text-2xl font-medium">{'Change wallets included in SBT'}</p>
              <CloseIcon close={handleClose} />
            </div>
            <hr className="border-[#E9E9E9] h-[1px] w-full" />
            <div className="flex w-full items-start gap-6 choose-chain-wallet">
              <div className="flex w-full flex-col h-full items-start gap-6 bg-[#F8F8F8] p-6 rounded-xl">
                <div
                  className={classNames(
                    'flex w-full flex-col items-start gap-4',
                    primaryWallet === '' ? 'pointer-events-none' : ''
                  )}>
                  <p className="flex items-center font-medium text-xl text-black-1c">List of your wallet</p>
                  {(userAddress || '').length > 1 && (
                    <div className="">
                      <FormControlLabel
                        control={
                          <Checkbox className="w-6 h-6" checked={checkboxAll} onChange={handleSelectAllWallets} />
                        }
                        label="Select all"
                        sx={{ marginLeft: 0, color: '#1C1C1C', fontWeight: 400, fontSize: '16px' }}
                      />
                    </div>
                  )}
                  <div className="flex w-full items-start p-4 gap-4 rounded-lg border border-[#E9E9E9]">
                    <div className="flex flex-col w-full gap-3">{renderWalletList()}</div>
                  </div>
                </div>
              </div>
              <div className="h-full shrink">
                <div className="min-w-[296px] h-full self-stretch box-border flex flex-col items-start p-4 gap-4 bg-[#F8F8F8] rounded-xl border-[1px] border-[#E9E9E9]">
                  <p className="font-medium text-xl items-center text-black-1c">Summary</p>
                  <hr className="border-[#E9E9E9] h-[1px] w-full" />
                  <div className="w-full flex items-start justify-between gap-4">
                    <p className="text-base font-normal	flex items-center text-[#898989]">Chain</p>
                    <div className="flex justify-end gap-1">
                      <img src={chainListDesc[0].asset} className="w-[20px] h-[20px]" />
                      <div className="text-base font-normal text-center text-black-1c">BNB Chain</div>
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-between gap-4">
                    <p className="text-base font-normal	flex items-center text-[#898989]">Primary wallet</p>
                    <div className="flex justify-end gap-1">
                      <div className="text-base font-normal text-center text-black-1c">
                        {formatAddress(userAddress || '', 3, 4)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-between gap-4">
                    <p className="text-base font-normal	flex items-center text-[#898989]">Adding wallets</p>
                    <div className="flex justify-end gap-1">
                      <div className="text-base font-normal text-center text-black-1c">
                        {selectedWallets.length > 0
                          ? `${selectedWallets.length} wallets selected`
                          : '1 wallet selected'}
                      </div>
                    </div>
                  </div>
                  <hr className="border-[#E9E9E9] h-[1px] w-full" />

                  <div className="w-full flex items-start justify-between gap-4">
                    <p className="text-base font-normal	flex items-center text-[#898989]">Total Global RS</p>
                    <div className="flex justify-end gap-1">
                      <div className="text-base font-normal text-center linear-gradient-text">
                        {globalRS ? globalRS : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-[#E9E9E9] h-[1px] w-full" />
            <div className="flex w-full justify-end">
              <ButtonV2 disabled={compareArrays(selectedWallets, computedWallet)} onClick={handleChangeComputedWallet}>
                Update GRS on-chain
              </ButtonV2>
            </div>
          </>
        </Box>
      </Modal>
    </>
  );
};
