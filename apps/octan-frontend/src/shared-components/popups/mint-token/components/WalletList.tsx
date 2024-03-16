import { Checkbox, ClickAwayListener, Tooltip } from '@mui/material';
import { DefaultFcProps } from 'common';
import { chainListDesc } from '../../../../pages/profile/components/sbts-management';
import React, { useEffect, useState } from 'react';
import { copyToClipboard, formatAddress } from 'utils';
import { HtmlTooltip } from 'shared-components';

type ChainAndWalletListProps = DefaultFcProps & {
  address: string;
  primaryWallet?: string;
  onWalletSelected: any;
  isWaletSelected: any;
  hasSBT: boolean;
  globalRS: any;
  idx: any;
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

export const WalletList: React.FC<ChainAndWalletListProps> = ({
  address,
  primaryWallet,
  onWalletSelected,
  isWaletSelected,
  hasSBT,
  globalRS,
  idx,
}) => {
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
  });

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
    <div>
      <div
        key={address}
        className="flex flex-row w-full items-center justify-between rounded-lg border-solid	border-[1px] border-[#E9E9E9] p-4">
        <div className="flex gap-4 items-center">
          <div className="items-center">
            {address === primaryWallet ? (
              <Checkbox className="w-6 h-6" disabled checked onChange={() => onWalletSelected(address)} />
            ) : (
              <Checkbox
                className="w-6 h-6"
                checked={isWaletSelected(address)}
                onChange={() => onWalletSelected(address)}
              />
            )}
          </div>
          <div className="flex w-full items-center gap-2">
            <p className="text-[#1C1C1C]">{`${idx + 1}.`}</p>
            <p className="text-[#4185EC] text-[18x] leading-[28px] tracking-[-0.01em]">
              {formatAddress(address || '', 6)}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {address === primaryWallet && (
            <div className="flex gap-2 ml-4 mr-4 justify-center items-start">
              <HtmlTooltip title="Polygon zkEVM" arrow={true} placement="bottom">
                <img src={chainListDesc[2].asset} className="w-6 h-6 rounded-[40px]" />
              </HtmlTooltip>
              <InformationIconToolTip />
            </div>
          )}
          <div className="flex flex-col items-center">
            <span className="text-[#898989] text-xs font-medium">GRS</span>
            <span className="linear-text-3 text-lg font-bold">{globalRS ? globalRS : 0}</span>
          </div>
          <hr className="w-6 border-[#E9E9E9] rotate-90" />
          <CopyIcon
            item={address}
            handleTooltipOpen={handleTooltipOpen}
            handleTooltipClose={handleTooltipClose}
            open={open}
          />
        </div>
      </div>
    </div>
  );
};
