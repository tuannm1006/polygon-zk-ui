import {
  mdiAutorenew,
  mdiChevronDown,
  mdiLinkVariantOff
} from "@mdi/js";
import { IconButton, Popover } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DefaultFcProps } from "common";
import { FC, useState } from "react";
import { formatAddress, logError, requestPermissions } from "utils";
import Icon from '@mdi/react';
import { ButtonCopyToClipboard } from "shared-components";
import { useAppContext, useWeb3Context } from "contexts";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '8px',
  background: '#111',
  color: '#767676',
  padding: '12px 14px',
  fontSize: theme.breakpoints.down('md') ? '14px' : '18px',
  textTransform: 'capitalize',

  '&:hover': {
    background: '#23231E',
  },
}));

const StyledPopover = styled(Popover)({
  '& .MuiPopover-paper': {
    transform: 'translateY(18px)',
    padding: '16px',
    fontSize: '14px',
    color: '#FCFCFD',
    width: '340px',
    background: '#23231E',
    border: '1px solid #494949',
    borderRadius: '16px'
  }
})

export type ChainMenuProps = DefaultFcProps;

export const ChainMenu: FC<ChainMenuProps> = (props) => {
  const {
    userAddress = '',
    selectedChain,
    signOut,
    setIsWaiting,
  } = useAppContext()
  const {
    connectWalletWithBe,
  } = useWeb3Context()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'chain-popover' : undefined;

  const onDisconnect = () => {
    handleClose()
    signOut();
  }

  const changeWallet = async () => {
    try {
      setIsWaiting(true)
      await requestPermissions()
      onDisconnect()
      await connectWalletWithBe()
    } catch (error) {
      logError('changeWallet')(error);
    }
    finally {
      setIsWaiting(false)
    }
  }

  return (
    <div>
      <StyledButton
        onClick={handleClick}
        className="flex gap-2 h-[34px] md:h-auto"
      >
        <span>{formatAddress(userAddress || '', 5)}</span><Icon path={mdiChevronDown} size={1} color="#767676" />
      </StyledButton>
      {open && <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-[16px] rounded border border-solid border-[#494949]">
            <div className="flex flex-row gap-4 w-full items-center">
              <div className="rounded w-[40px] h-[40px] flex justify-center items-center" style={{
                backgroundColor: 'rgba(255, 142, 38, 0.1)'
              }}>
                <img src="/assets/images/icons/metamask.svg" alt="metamask logo" />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="text-[#8A939B]">{selectedChain?.name}</div>
                <div>{formatAddress(userAddress, 4)}</div>
              </div>
              <ButtonCopyToClipboard val={userAddress} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <img src="/assets/images/icons/eth.svg" alt="eth logo" />
                <span>0 ETH</span>
              </div>
              <div className="flex gap-2">
                <img src="/assets/images/icons/bnb.svg" alt="bnb logo" />
                <span>0 BNB</span>
              </div>
            </div>
            <div className="flex gap-2 items-center cursor-pointer hidden" onClick={changeWallet}>
              <span className="rounded-full w-[32px] h-[32px] bg-[#8A939B] opacity-40 flex justify-center items-center">
                <Icon path={mdiAutorenew} size={.7} color="#fff" />
              </span>
              <span>Change Wallet</span>
            </div>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={onDisconnect}
          >
            <span className="rounded-full w-[32px] h-[32px] bg-[#8A939B] opacity-40 flex justify-center items-center">
              <Icon path={mdiLinkVariantOff} size={.7} color="#fff" />
            </span>
            <span>Disconnect</span>
          </div>
        </div>
      </StyledPopover>}
    </div >
  );
}