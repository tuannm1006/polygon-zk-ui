import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
  FormControlLabel,
  ClickAwayListener,
  Tooltip,
} from '@mui/material';
import { DefaultFcProps, NETWORKS } from 'common';
import { copyToClipboard, formatAddress } from 'utils';
import { chainListDesc } from '../../../../pages/profile/components/sbts-management';
import { useState } from 'react';
import { BadgeGift, ButtonV2, NetworksList, SelectField } from 'shared-components';
import { useAppContext } from 'contexts';
import { find, filter } from 'lodash';
import classNames from 'classnames';
import { WalletList } from './WalletList';
import './ChainAndWallet.scss';
import { ChainButton } from '../../../../shared-components/chain-button';

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

type ChainAndWalletProps = DefaultFcProps & {
  userAddress: string;
  onStepDone?: (stepId: string, primaryWallet: string, computedWallets: string[]) => void;
  stepId?: string;
};

export const ChainAndWallet: React.FC<ChainAndWalletProps> = ({
  userAddress,
  stepId = 'choose-chain-wallet',
  onStepDone,
}) => {
  const [personalAccount, setPersonalAccount] = useState(userAddress || '');
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [primaryWallet, setPrimaryWallet] = useState(userAddress);
  const [network, setNetwork] = useState(NETWORKS.BSC);
  const [primaryWalletErr, setPrimaryWalletErr] = useState('');
  const [checkboxAll, setCheckboxAll] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    setIsWaiting,
    getChainKey,
    userInfo,
    userAddresses,
    fetchUserWallets,
    fetchUserInfo,
    signOut,
    hasSBT,
    globalRS,
  } = useAppContext();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (item: any) => {
    copyToClipboard(item || '');
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPersonalAccount(event.target.value as string);
  };

  const onSubmit = () => {
    if (primaryWallet.length === 0) {
      setPrimaryWalletErr('Select 1 Primary wallet to continue.');
      return;
    }
    setPrimaryWalletErr('');

    onStepDone?.(stepId, primaryWallet, [...selectedWallets, ...[primaryWallet]]);
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

  const isWaletSelected = (address: string) => {
    return find(selectedWallets, (w) => w === address) !== undefined;
  };

  const handleSelectAllWallets = () => {
    if (checkboxAll) {
      setSelectedWallets([]);
      setCheckboxAll(false);
    } else {
      setSelectedWallets([]);
      const filteredWallets = filter(userAddresses, (ua) => ua !== primaryWallet);
      setSelectedWallets(filteredWallets);
      setCheckboxAll(true);
    }
    // setCheckboxAll(!checkboxAll);
    // if (checkboxAll) {
    //   console.log(checkboxAll);
    //   const filteredWallets = filter(userAddresses, (ua) => ua !== primaryWallet);
    //   setSelectedWallets(filteredWallets);
    // } else {
    //   setSelectedWallets([]);
    // }
  };

  const renderWalletList = () => {
    return userAddresses.map((address, idx) => {
      return (
        <WalletList
          address={address}
          primaryWallet={primaryWallet}
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
      <div className="flex justify-center items-start gap-6 choose-chain-wallet">
        <div className="flex flex-col h-full items-start gap-6">
          <div className="flex flex-col items-start gap-4">
            <p className="font-medium text-lg	flex items-center text-black-1c">1. Choose chain to mint SBT</p>
            <div className="flex items-start gap-4 flex-wrap">
              {chainListDesc.map((chain, index) => (
                <ChainButton
                  key={index}
                  src={chain.asset}
                  title={chain.title}
                  hasSBT={hasSBT}
                  // hasRevokedSbt={hasRevokedSbt}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 items-start">
            <p className="flex items-center font-medium text-lg text-black-1c">
              2. Choose primary wallet to manage this SBT
            </p>
            <div className="flex flex-col w-full">
              <FormControl className="!w-full" sx={{}}>
                {/* <Select className="!bg-[#F2F2F2] !text-[#B6B6B6]" value={personalAccount} onChange={handleChange}>
                  {userAddresses.map((address) => (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  ))}
                </Select> */}
                <SelectField
                  options={userAddresses.map((ua) => {
                    return {
                      label: ua,
                      code: ua,
                    };
                  })}
                  value={primaryWallet}
                  onChange={(e: any) => {
                    setPrimaryWallet(e.target.value);
                  }}
                  placeholder="Choose wallet"
                />
              </FormControl>
              <div className="flex flex-row items-center mt-4">
                {primaryWallet.length > 0 && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.33203 7.9987C1.33203 4.3168 4.3168 1.33203 7.9987 1.33203C11.6806 1.33203 14.6654 4.3168 14.6654 7.9987C14.6654 11.6806 11.6806 14.6654 7.9987 14.6654C4.3168 14.6654 1.33203 11.6806 1.33203 7.9987ZM7.33203 5.33203C7.33203 4.96384 7.63051 4.66536 7.9987 4.66536C8.36689 4.66536 8.66536 4.96384 8.66536 5.33203C8.66536 5.70022 8.36689 5.9987 7.9987 5.9987C7.63051 5.9987 7.33203 5.70022 7.33203 5.33203ZM7.9987 7.33203C8.36689 7.33203 8.66536 7.63051 8.66536 7.9987V10.6654C8.66536 11.0336 8.36689 11.332 7.9987 11.332C7.63051 11.332 7.33203 11.0336 7.33203 10.6654V7.9987C7.33203 7.63051 7.63051 7.33203 7.9987 7.33203Z"
                        fill="#4185EC"
                      />
                    </svg>
                    <div className="text-[#4185EC] ml-2">Primary wallet cannot change after mint SBT.</div>
                  </>
                )}
                {/* {primaryWallet.length > 0 ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.33203 8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C11.6806 1.33398 14.6654 4.31875 14.6654 8.00065C14.6654 11.6825 11.6806 14.6673 7.9987 14.6673C4.3168 14.6673 1.33203 11.6825 1.33203 8.00065ZM7.9987 4.66732C8.36689 4.66732 8.66536 4.96579 8.66536 5.33398V8.00065C8.66536 8.36884 8.36689 8.66732 7.9987 8.66732C7.63051 8.66732 7.33203 8.36884 7.33203 8.00065V5.33398C7.33203 4.96579 7.63051 4.66732 7.9987 4.66732ZM7.33203 10.6673C7.33203 10.2991 7.63051 10.0007 7.9987 10.0007C8.36689 10.0007 8.66536 10.2991 8.66536 10.6673C8.66536 11.0355 8.36689 11.334 7.9987 11.334C7.63051 11.334 7.33203 11.0355 7.33203 10.6673Z"
                        fill="#FF4747"
                      />
                    </svg>
                    <div className="text-[#FF4747] ml-2">{primaryWallet}</div>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.33203 7.9987C1.33203 4.3168 4.3168 1.33203 7.9987 1.33203C11.6806 1.33203 14.6654 4.3168 14.6654 7.9987C14.6654 11.6806 11.6806 14.6654 7.9987 14.6654C4.3168 14.6654 1.33203 11.6806 1.33203 7.9987ZM7.33203 5.33203C7.33203 4.96384 7.63051 4.66536 7.9987 4.66536C8.36689 4.66536 8.66536 4.96384 8.66536 5.33203C8.66536 5.70022 8.36689 5.9987 7.9987 5.9987C7.63051 5.9987 7.33203 5.70022 7.33203 5.33203ZM7.9987 7.33203C8.36689 7.33203 8.66536 7.63051 8.66536 7.9987V10.6654C8.66536 11.0336 8.36689 11.332 7.9987 11.332C7.63051 11.332 7.33203 11.0336 7.33203 10.6654V7.9987C7.33203 7.63051 7.63051 7.33203 7.9987 7.33203Z"
                        fill="#4185EC"
                      />
                    </svg>
                    <div className="text-[#4185EC] ml-2">Primary wallet cannot change after mint SBT.</div>
                  </>
                )} */}
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'flex w-full flex-col items-start gap-4',
              primaryWallet === '' ? 'pointer-events-none' : ''
            )}>
            <p className="flex items-center font-medium text-lg text-black-1c">
              3. Select wallets to add scores in Total Global RS in this SBT
            </p>
            {userAddress.length > 1 && (
              <div className="">
                <FormControlLabel
                  control={<Checkbox className="w-6 h-6" onChange={handleSelectAllWallets} />}
                  label="Select all"
                />
              </div>
            )}
            <div className="flex w-full items-start p-4 gap-4 rounded-lg border border-[#E9E9E9]">
              <div className="flex flex-col w-full gap-3">{renderWalletList()}</div>
            </div>
            {selectedWallets.length === 0 && (
              <div className="flex h-[22px] items-center gap-2">
                <InformationIcon />
                <span className="flex items-center text-sm text-center font-normal pt-1	text-[#4185EC]">
                  You have only 1 wallet for updating reputation scores.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className=" min-w-[296px] h-full box-border flex flex-col items-start p-4 gap-4 bg-[#F8F8F8] rounded-xl border-[1px] border-[#E9E9E9]">
          <p className="font-medium text-lg items-center text-black-1c">Summary</p>
          <hr className="border-[#E9E9E9] h-[1px] w-full" />
          <div className="w-full flex items-start justify-between gap-4">
            <p className="text-base font-normal	flex items-center text-[#898989]">Chain</p>
            <div className="flex justify-end gap-1">
              <img src={chainListDesc[2].asset} className="w-[20px] h-[20px]" />
              <div className="text-base font-normal text-center text-black-1c">Polygon zkEVM</div>
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
                {selectedWallets.length > 0 ? `${selectedWallets.length + 1} wallets selected` : '1 wallet selected'}
              </div>
            </div>
          </div>
          <div className="w-full flex items-start justify-between gap-4">
            <p className="text-base font-normal	flex items-center text-[#898989]">Total Global RS</p>
            <div className="flex justify-end gap-1">
              <div className="text-base font-normal text-center linear-gradient-text">{globalRS ? globalRS : 0}</div>
            </div>
          </div>
          <hr className="border-[#E9E9E9] h-[1px] w-full" />
          {/* <div className="w-full flex items-start justify-between gap-4">
            <p className="text-base font-normal	flex items-center text-[#898989]">Mint fee</p>
            <div className="flex justify-end gap-1">
              <div className="text-xl font-bold text-center text-black-1c">1 BUSD</div>
            </div>
          </div> */}
          <div className="flex justify-between items-baseline gap-4 self-stretch">
            <div className="flex w-full justify-between items-start gap-1">
              <div className="text-base font-normal text-[#898989]">Mint fee</div>
              <div className="flex py-[2px] px-2 items-center gap-1 rounded-3xl linear-background">
                <BadgeGift />
                <div className="text-xs font-medium text-white">
                  <p className="pt-[3px]">Always Free!</p>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col justify-center items-end">
              <div className="text-xl font-bold text-right text-[#0DB774]">Free</div>
              <div className="text-underline">1 BUSD</div>
            </div> */}
          </div>
        </div>
      </div>
      <hr className="border-[#E9E9E9] h-[1px] w-full" />
      <div className="flex justify-end items-center w-full gap-6 ">
        <p className="font-sm text-sm	text-right text-black-1c">
          By clicking Continue & mint SBT, you agree to Octan’s{' '}
          <a href="" target="_blank" className="text-[#4185EC]">
            Terms
          </a>{' '}
          and{' '}
          <a href="" target="_blank" className="text-[#4185EC]">
            Privacy policy
          </a>
          .
        </p>
        <ButtonV2 className="w-[200px] h-12" onClick={onSubmit}>
          Continue & mint SBT
        </ButtonV2>
      </div>
    </>
  );
};
