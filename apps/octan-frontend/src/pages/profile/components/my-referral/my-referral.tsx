import { TextField, CircularProgress, ClickAwayListener, Tooltip } from '@mui/material';
import { toJson } from '@octan/common';
import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useState, useEffect } from 'react';
import { ButtonCopyToClipboard, HtmlTooltip } from 'shared-components';
import { getApiConfig } from 'swagger';
import { copyToClipboard } from 'utils';

export const InformationIcon = ({ width = '16px', height = '16px', isReferral = false }) => {
  return (
    <HtmlTooltip
      title={
        <>
          {isReferral ? (
            <>
              Reward points are only calculated when the invited users mint SBTs: <br />
              - The 1st level: You receive 3 points. <br />
              - The 2nd level: Your receive 2 points. <br />- The 3th level: You receive 1 point.
            </>
          ) : (
            'Send referral link to your friends, invite them joinning Octan to receive rewards and exclusive benefits from Octan.'
          )}
        </>
      }>
      <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export const CopyIcon = ({ width = '17', height = '16' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.99922 9.79922L2.19922 9.79922C1.70216 9.79922 1.29922 9.39628 1.29922 8.89922L1.29922 2.79922C1.29922 1.69465 2.19465 0.799219 3.29922 0.799219L9.39922 0.79922C9.89627 0.79922 10.2992 1.20216 10.2992 1.69922L10.2992 3.49922M8.49922 15.1992L13.8992 15.1992C14.8933 15.1992 15.6992 14.3933 15.6992 13.3992L15.6992 7.99922C15.6992 7.00511 14.8933 6.19922 13.8992 6.19922L8.49922 6.19922C7.5051 6.19922 6.69922 7.00511 6.69922 7.99922L6.69922 13.3992C6.69922 14.3933 7.5051 15.1992 8.49922 15.1992Z"
        stroke="#F7F9FB"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export type MyReferralProps = DefaultFcProps;

interface IReferral {
  referralCode?: string;
  referrals?: number;
}

export const MyReferral: React.FC<MyReferralProps> = ({ className }) => {
  const [referralsDetail, setReferralsDetail] = useState<IReferral>({});

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (item: any) => {
    copyToClipboard(item || '');
    setOpen(true);
  };

  const appContext = useAppContext();

  const { userInfo, userAddress, hasSBT, loggedIn } = appContext;

  console.log('referralsDetail ::: ', referralsDetail);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    const getReferralsDetail = async () => {
      const { basePath, ...options } = getApiConfig();

      const result = await fetch(`${basePath}/referrals/details`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      setReferralsDetail(result);
    };

    if (userAddress) {
      getReferralsDetail();
    }
  }, [userAddress]);

  const CopyIconDisabled = () => {
    return (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.99922 9.79922L2.19922 9.79922C1.70216 9.79922 1.29922 9.39628 1.29922 8.89922L1.29922 2.79922C1.29922 1.69465 2.19465 0.799219 3.29922 0.799219L9.39922 0.79922C9.89627 0.79922 10.2992 1.20216 10.2992 1.69922L10.2992 3.49922M8.49922 15.1992L13.8992 15.1992C14.8933 15.1992 15.6992 14.3933 15.6992 13.3992L15.6992 7.99922C15.6992 7.00511 14.8933 6.19922 13.8992 6.19922L8.49922 6.19922C7.5051 6.19922 6.69922 7.00511 6.69922 7.99922L6.69922 13.3992C6.69922 14.3933 7.5051 15.1992 8.49922 15.1992Z"
          stroke="#a8aeba"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  function CopyIcon() {
    return (
      <svg width="17" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.99922 9.79922L2.19922 9.79922C1.70216 9.79922 1.29922 9.39628 1.29922 8.89922L1.29922 2.79922C1.29922 1.69465 2.19465 0.799219 3.29922 0.799219L9.39922 0.79922C9.89627 0.79922 10.2992 1.20216 10.2992 1.69922L10.2992 3.49922M8.49922 15.1992L13.8992 15.1992C14.8933 15.1992 15.6992 14.3933 15.6992 13.3992L15.6992 7.99922C15.6992 7.00511 14.8933 6.19922 13.8992 6.19922L8.49922 6.19922C7.5051 6.19922 6.69922 7.00511 6.69922 7.99922L6.69922 13.3992C6.69922 14.3933 7.5051 15.1992 8.49922 15.1992Z"
          stroke="#F7F9FB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={className}>
      <div className="flex w-full">
        <div className="flex flex-1 flex-col pr-6 font-bold text-black-1c gap-y-6 border-r-2 border-[#E9E9E9] border-solid">
          <div className="text-2xl font-medium">Referral to get point</div>
          {hasSBT ? (
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-[10px] items-center">
                <div className="text-xl font-medium text-center">
                  <p>Your referral link</p>
                </div>
                <InformationIcon />
              </div>
              <div className="flex">
                <div className="flex">
                  <div className="px-4 py-3 bg-[#F2F2F2] text-base text-[#B6B6B6]">
                    {`${location.origin}/1-id?ref=${userInfo?.referralCode}`}
                  </div>
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow={true}
                      placement="top"
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Copied">
                      <button
                        onClick={() => handleTooltipOpen(`${location.origin}/1-id?ref=${userInfo?.referralCode}`)}
                        className="flex items-center gap-x-2 pr-[20px] pl-[16px] py-[11px] h-[48px] bg-[#0DB774] rounded-sm">
                        <CopyIcon />
                        <div className="text-base font-bold text-white">
                          <p>Copy</p>
                        </div>
                      </button>
                    </Tooltip>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          ) : (
            <img src="/assets/images/referral.svg" alt="" className="" />
          )}
        </div>
        <div className="flex flex-col pl-6 gap-y-6 w-[256px]">
          <div className="flex w-full items-center gap-x-[10.4px] text-black-1c text-xl font-medium">
            <p>Reward points</p>
            <InformationIcon width="19.2px" height="19.2px" isReferral />
          </div>
          <div className="w-full md:w-full flex justify-center items-center p-6 bg-[#E7F5FF] rounded-xl align-middle h-full">
            <p className="font-bold linear-text-5 text-[40px] tracking-[-0.02em]">
              {loggedIn
                ? referralsDetail.referrals
                  ? new Intl.NumberFormat('en-US').format(referralsDetail.referrals || 0)
                  : '0'
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
