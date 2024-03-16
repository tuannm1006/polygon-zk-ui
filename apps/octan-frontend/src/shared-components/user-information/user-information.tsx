import React from 'react';
import clsx from 'clsx';
import { DefaultFcProps, SOCIALS } from 'common';
import { chainIds, DEFAULT_AVATAR_URL } from 'consts';
import { useAppContext } from 'contexts';
import { ReactNode, useState } from 'react';
import { ButtonConnect, ButtonV2, ConfirmModal, DialogTypes, HtmlTooltip, MintToken } from 'shared-components';
import { useReissueSbt, useRevokeSbt } from 'utils';
import { DiscordIcon, FacebookIcon, TwitterIcon, TelegramIcon } from '../../pages/profile/components/social-profile';
import { globalRsListNotHaveSBTMockup, chainListDesc, TimeIcon } from '../../pages/profile/components/sbts-management';
import { InformationIcon } from '../../pages/profile/components/account-setting';
import SbtsLocked from '../../asserts/images/1id/sbts-locked.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { showModalActions } from '../../app';
import { propOr } from 'ramda';
import { useUpdateRS } from '../../utils/hooks/use-reputation-score';

import classes from './user-information.module.scss';
import { ChainButton } from '../chain-button';
import { GlobalRS } from '../global-rs-button';

export const ArrowRight = ({ color = '#0DB774' }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.875 4.5L14.25 9M14.25 9L9.875 13.5M14.25 9L3.75 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EmailVerified = ({ isVerify = false }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill={isVerify ? '#FF8C21' : '#B6B6B6'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.9018 28.3425C32.1122 28.3422 32.3139 28.2585 32.4626 28.1098C32.6114 27.961 32.695 27.7593 32.6953 27.5489V12.56L20.5638 22.1936C20.4035 22.3211 20.2048 22.3906 19.9999 22.3906C19.7951 22.3906 19.5963 22.3211 19.436 22.1936L7.30469 12.56V27.5489C7.30491 27.7593 7.38859 27.961 7.53735 28.1098C7.68611 28.2586 7.88781 28.3423 8.0982 28.3425H31.9018ZM30.9159 11.6572L20 20.3257L9.08398 11.6572H30.9159Z"
        fill="white"
      />
    </svg>
  );
};

const CardUnverified = ({ isVerify = false }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#B6B6B6" />
      <path
        d="M29.3542 10.7959H10.6445C9.11031 10.7959 7.86328 12.0429 7.86328 13.5771V26.2188C7.86328 27.753 9.11031 29 10.6445 29H29.3542C30.8884 29 32.1354 27.753 32.1354 26.2188V13.5771C32.1354 12.0429 30.8884 10.7959 29.3542 10.7959ZM15.4483 14.8412C16.842 14.8412 17.9766 15.976 17.9766 17.3697C17.9766 18.7631 16.842 19.8979 15.4483 19.8979C14.0547 19.8979 12.92 18.7631 12.92 17.3697C12.92 15.976 14.0547 14.8412 15.4483 14.8412ZM19.9993 24.1962C19.9993 24.6149 19.6595 24.9547 19.2408 24.9547H11.6558C11.2371 24.9547 10.8973 24.6149 10.8973 24.1962V23.6905C10.8973 22.1563 12.1443 20.9092 13.6785 20.9092H17.2181C18.7523 20.9092 19.9993 22.1563 19.9993 23.6905V24.1962ZM28.3429 24.9547H22.7806C22.3619 24.9547 22.0221 24.6149 22.0221 24.1962C22.0221 23.7775 22.3619 23.4377 22.7806 23.4377H28.3429C28.7616 23.4377 29.1014 23.7775 29.1014 24.1962C29.1014 24.6149 28.7616 24.9547 28.3429 24.9547ZM28.3429 20.9092H22.7806C22.3619 20.9092 22.0221 20.5694 22.0221 20.1507C22.0221 19.732 22.3619 19.3922 22.7806 19.3922H28.3429C28.7616 19.3922 29.1014 19.732 29.1014 20.1507C29.1014 20.5694 28.7616 20.9092 28.3429 20.9092ZM28.3429 16.8639H22.7806C22.3619 16.8639 22.0221 16.5241 22.0221 16.1054C22.0221 15.6867 22.3619 15.3469 22.7806 15.3469H28.3429C28.7616 15.3469 29.1014 15.6867 29.1014 16.1054C29.1014 16.5241 28.7616 16.8639 28.3429 16.8639Z"
        fill="white"
      />
    </svg>
  );
};

const VerifyIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.80304 1.02478C7.90422 0.901735 8.09258 0.901735 8.19377 1.02477L9.82045 3.00282C10.0543 3.28714 10.4013 3.45425 10.7693 3.45979L13.3301 3.49829C13.4893 3.50068 13.6068 3.64795 13.5737 3.80377L13.0414 6.30885C12.9649 6.66893 13.0506 7.04443 13.2758 7.33564L14.8422 9.3617C14.9397 9.48772 14.8978 9.67136 14.7553 9.74263L12.4649 10.8884C12.1357 11.0531 11.8955 11.3542 11.8082 11.7118L11.2009 14.1997C11.1631 14.3545 10.9934 14.4362 10.8488 14.3693L8.525 13.2929C8.19098 13.1382 7.80582 13.1382 7.4718 13.2929L5.14797 14.3693C5.00342 14.4362 4.83372 14.3545 4.79594 14.1997L4.18859 11.7118C4.10129 11.3542 3.86115 11.0531 3.53193 10.8884L1.24151 9.74263C1.09904 9.67136 1.05712 9.48772 1.15456 9.3617L2.72105 7.33564C2.94621 7.04442 3.03191 6.66892 2.9554 6.30885L2.42313 3.80377C2.39002 3.64795 2.50746 3.50068 2.66674 3.49829L5.22746 3.45979C5.59553 3.45425 5.94254 3.28714 6.17636 3.00282L7.80304 1.02478Z"
        fill="url(#paint0_linear_2005_9681)"
        stroke="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9937 5.75504C11.142 5.9008 11.1441 6.13916 10.9983 6.28743L6.92719 10.4286C6.85642 10.5006 6.75969 10.5412 6.65873 10.5412C6.55777 10.5412 6.46104 10.5006 6.39026 10.4286L5.00254 9.01699C4.85677 8.86872 4.85881 8.63036 5.00708 8.4846C5.15535 8.33884 5.39371 8.34087 5.53947 8.48914L6.65873 9.62767L10.4614 5.75958C10.6071 5.61131 10.8455 5.60928 10.9937 5.75504Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2005_9681"
          x1="0.603225"
          y1="7.66278"
          x2="15.3953"
          y2="7.66278"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FF7C" />
          <stop offset="1" stopColor="#00C4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const InfomationCircle = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.9984 11.9999L11.9984 16.7999M11.9984 8.44209V8.3999M2.39844 11.9999C2.39844 6.69797 6.6965 2.3999 11.9984 2.3999C17.3004 2.3999 21.5984 6.69797 21.5984 11.9999C21.5984 17.3018 17.3004 21.5999 11.9984 21.5999C6.6965 21.5999 2.39844 17.3018 2.39844 11.9999Z"
        stroke="#4185EC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const StarGuestView = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M8.6212 2.03548C8.77612 1.72157 9.22374 1.72157 9.37867 2.03548L11.3842 6.09907C11.4457 6.22373 11.5646 6.31013 11.7022 6.33012L16.1866 6.98174C16.533 7.03208 16.6714 7.4578 16.4207 7.70214L13.1757 10.8652C13.0762 10.9622 13.0307 11.102 13.0542 11.239L13.8203 15.7054C13.8795 16.0504 13.5173 16.3135 13.2075 16.1506L9.19647 14.0419C9.07343 13.9772 8.92644 13.9772 8.8034 14.0419L4.79239 16.1506C4.48254 16.3135 4.12041 16.0504 4.17958 15.7054L4.94562 11.239C4.96912 11.102 4.92369 10.9622 4.82415 10.8652L1.57918 7.70214C1.32851 7.4578 1.46683 7.03208 1.81325 6.98174L6.29769 6.33012C6.43525 6.31013 6.55417 6.22373 6.61569 6.09907L8.6212 2.03548Z"
        stroke="#B6B6B6"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const LinechartGuestView = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1.80078 1.80005V16.2H16.2008M5.40078 10.8001L8.55078 7.65014L10.8008 9.90014L14.8509 5.85005"
        stroke="#B6B6B6"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const BadgeGift = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8.11793 14.436V5.12691M7.0346 4.56845C7.14984 4.59431 7.27129 4.56262 7.35426 4.47964C7.43723 4.39667 7.46888 4.27518 7.44307 4.15998C7.33963 3.73746 6.95861 2.32263 6.56736 1.93139C6.07992 1.44395 5.28659 1.44192 4.80156 1.92695C4.31657 2.41194 4.31853 3.20527 4.806 3.69275C5.20365 4.09039 6.61209 4.46503 7.0346 4.56845ZM8.21765 4.15995C8.19179 4.2752 8.22348 4.39664 8.30646 4.47961C8.38943 4.56258 8.51092 4.59423 8.62612 4.56842C9.04864 4.46498 10.4635 4.08396 10.8547 3.69271C11.3422 3.20527 11.3442 2.41194 10.8592 1.92691C10.3742 1.44192 9.58083 1.44388 9.09335 1.93135C8.6957 2.329 8.32107 3.73744 8.21765 4.15995ZM2.06702 8.38509H13.9361C14.1932 8.38509 14.4016 8.1767 14.4016 7.91964V5.59237C14.4016 5.3353 14.1932 5.12691 13.9361 5.12691H2.06702C1.80995 5.12691 1.60156 5.3353 1.60156 5.59237V7.91964C1.60156 8.1767 1.80995 8.38509 2.06702 8.38509ZM13.2379 8.38509V13.9705C13.2379 14.2276 13.0295 14.436 12.7725 14.436H3.23065C2.97359 14.436 2.7652 14.2276 2.7652 13.9705V8.38509H13.2379Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

type Icon = {
  icon: ReactNode;
  iconVerified: ReactNode;
  isVerified: boolean;
  title?: string;
  enabled?: boolean;
  tooltip?: string;
  verifiedTooltip?: string;
  url?: string;
  provider?: string;
};

const listIcons: Icon[] = [
  {
    provider: SOCIALS.email,
    icon: <EmailVerified />,
    iconVerified: <EmailVerified isVerify={true} />,
    isVerified: false,
    title: 'email',
    enabled: true,
    tooltip: 'Verify Email',
    verifiedTooltip: 'Email Verified',
    url: '/profile/account-setting',
  },
  {
    icon: <TelegramIcon />,
    iconVerified: <TelegramIcon isVerify={true} />,
    isVerified: false,
  },
  {
    icon: <DiscordIcon />,
    iconVerified: <DiscordIcon isVerify={true} />,
    isVerified: false,
  },
  {
    icon: <FacebookIcon />,
    iconVerified: <FacebookIcon isVerify={true} />,
    isVerified: false,
  },
  {
    icon: <TwitterIcon />,
    iconVerified: <TwitterIcon isVerify={true} />,
    isVerified: false,
  },
  {
    icon: <CardUnverified />,
    iconVerified: <CardUnverified isVerify={true} />,
    isVerified: false,
  },
];

export type UserInformationProps = DefaultFcProps & {
  loggedIn: boolean;
};

export const UserInformation: React.FC<UserInformationProps> = ({ className, loggedIn }) => {
  console.log('Test redirect user information');
  const appContext = useAppContext();
  const {
    sbts,
    userInfo,
    hasSBT,
    selectedChain,
    hasRevokedSbt,
    soulboundId,
    fetchUserWallets,
    fetchUserInfo,
    globalRS,
    fetchGlobalRS,
  } = appContext;
  fetchGlobalRS();
  console.log('Global RS: ', globalRS);
  const [avatar, setAvatar] = useState<string>(() => DEFAULT_AVATAR_URL);
  const combinedClassName = clsx(className, 'w-full lg:w-full flex flex-col lg:p-0 lg:items-center');

  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [showReissueConfirm, setShowReissueConfirm] = useState(false);
  const [isGuestView, setIsGuestView] = useState(false); //Dummy check guest view
  const [openMint, setOpenMint] = useState(false);
  const [selectCategory, setSelectCategory] = useState('Total Global RS');

  const handleChangeCategory = (category: string) => {
    setSelectCategory(category);
  };

  const handleOpenMint = () => setOpenMint(true);
  const handleCloseMint = () => setOpenMint(false);
  const navigate = useNavigate();
  const revokeSbt = useRevokeSbt();
  const reissueSbt = useReissueSbt();

  const toAccountMng = () => {
    navigate('/profile/account-setting');
  };

  const onRevoke = async () => {
    try {
      // setIsInprogress(true);

      const txHash = await revokeSbt(appContext);
      if (!!txHash) {
        setShowRevokeConfirm(false);
        toast.success('Revoke successful');
        await fetchUserWallets();
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        toast.error(`Something wrong ${data}`);
      }
    }
    // setIsOpenConfirmRevoke(false);
    // setIsInprogress(false);
  };

  const onRevokeCancel = () => {
    setShowRevokeConfirm(false);
  };

  const onRevokeConfirm = () => {
    void onRevoke();
  };

  const onReissueCancel = () => {
    setShowReissueConfirm(false);
  };

  const onReissueConfirm = () => {
    void onReissue();
  };

  const handleRevoke = () => {
    console.log('handleRevoke');
    setShowRevokeConfirm(true);
  };

  const handleReissue = () => {
    console.log('handle Reissue');
    setShowReissueConfirm(true);
  };

  const onReissue = async () => {
    try {
      // setIsInprogress(true);
      console.log('onReissue');

      const transactionHash = await reissueSbt(appContext);
      console.log('transactionHash ::: ', transactionHash);
      if (!!transactionHash) {
        toast.success('Reissue successful');
        await fetchUserWallets();
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        toast.error(`Something wrong ${data}`);
      }
    }
    // setIsInprogress(false);
  };

  const updateRS = useUpdateRS();

  const updateRSOnBsc = async () => {
    try {
      // setIsInprogress(true);

      const transactionHash = await updateRS(appContext);
      if (!!transactionHash) {
        console.log('transactionHash ::: ', transactionHash);
        toast.success('Update score successful');
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        toast.error(`Something wrong ${data}`);
      }
    }
    // setIsInprogress(false);
  };

  const handleUpdateRS = async () => {
    console.log('handleUpdateRS');
    await updateRSOnBsc();
  };

  const handleSocialIconClicked = (url?: string) => {
    url && navigate(url);
  };

  const isSocialVerified = (icon: Icon) => {
    if (icon.provider === SOCIALS.email) {
      return userInfo?.isVerifyEmail;
    }

    return false;
  };

  return (
    <div className={combinedClassName}>
      <div className="py-6 border-b-2 border-[#E9E9E9] border-solid w-full">
        <div className="flex">
          <div className="flex py-6 justify-center items-center w-1/6">
            <img className="rounded-full w-[112px] h-[112px] lg:w-24 lg:h-24" src={avatar} alt="user avatar" />
          </div>
          <div className="flex flex-col py-6 w-5/6 justify-between">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="font-medium text-2xl text-black-1c">
                  {userInfo?.username ? userInfo.username : 'Unknown'}
                </div>
              </div>
              {loggedIn && (
                <div className="flex gap-x-[9.75px]" onClick={toAccountMng}>
                  <button className="underline text-center text-[#0DB774]">Account management</button>
                  <ArrowRight color="#0DB774" />
                </div>
              )}
            </div>
            <div className="flex gap-x-4 items-center text-[#898989]">
              <div>Verified Proof</div>
              <div className="flex gap-x-4 items-center">
                {loggedIn &&
                  listIcons.map((icon, index) => (
                    <React.Fragment key={`verified-${index}}`}>
                      {icon.enabled ? (
                        <HtmlTooltip
                          title={isSocialVerified(icon) ? icon.verifiedTooltip : icon.tooltip}
                          arrow
                          placement="top">
                          <div className="flex relative" key={index} onClick={() => handleSocialIconClicked(icon.url)}>
                            {isSocialVerified(icon) ? icon.iconVerified : icon.icon}
                            {isSocialVerified(icon) && (
                              <div className="absolute -top-1 right-0">
                                <VerifyIcon />
                              </div>
                            )}
                          </div>
                        </HtmlTooltip>
                      ) : (
                        <HtmlTooltip title="Coming soon" arrow placement="top">
                          <div>{icon.icon}</div>
                        </HtmlTooltip>
                      )}
                    </React.Fragment>
                  ))}
                {!loggedIn &&
                  listIcons.map((icon, index) => (
                    <React.Fragment key={`verified-${index}}`}>{<div>{icon.icon}</div>}</React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-bold text-xl md:text-3xl text-black py-6 border-b-2 border-[#E9E9E9] border-solid w-full">
        <div className="text-xl text-black-1c">Soulbound token information</div>
        <div className={loggedIn ? 'py-6 flex gap-3 flex-wrap' : 'flex justify-center items-center'}>
          {loggedIn ? (
            chainListDesc.map((chain, index) => (
              <ChainButton
                key={index}
                src={chain.asset}
                title={chain.title}
                hasSBT={hasSBT}
                hasRevokedSbt={hasRevokedSbt}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-4">
              <img src={SbtsLocked} alt="" />
              <ButtonConnect
                className="py-[11px] !pr-4 !pl-5 gap-1.5 max-w-[172px] h-12 !tracking-normal"
                title="Connect wallet"
                arrow={true}
              />
            </div>
          )}
          {/* {loggedIn &&
            chainListDesc.map((chain, index) => <ChainButton key={index} src={chain.asset} title={chain.title} />)} */}
        </div>
      </div>
      <div className="w-full pt-6">
        <div className="mb-6">
          <div className="flex justify-between gap-3 items-center mb-3">
            <div className="flex gap-3">
              <label className="text-[#898989]">SBT ID:</label>
              <p className={loggedIn ? 'text-[#4185EC]' : 'text-[#898989]'}>
                {loggedIn && soulboundId ? soulboundId : '-'}
              </p>
              {hasRevokedSbt && <img src="/assets/images/user-information/revoked.svg" alt="Revoked" />}
            </div>
            {hasSBT && (
              <div className="text-[#B6B6B6] font-medium">
                <p className="underline underline-offset-1 cursor-pointer" onClick={handleRevoke}>
                  Revoke
                </p>

                <ConfirmModal
                  type={DialogTypes.None}
                  open={showRevokeConfirm}
                  handleClose={onRevokeCancel}
                  handleConfirm={onRevokeConfirm}>
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <img src="/assets/images/user-information/confirm-modal-warning.svg" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="w-[548px] text-center text-zinc-900 text-[24px] font-medium leading-loose">
                        Do you want to proceed with revoking the SBT?
                      </div>
                      <div className="w-[548px] text-center text-zinc-500 text-[18px] font-normal leading-7">
                        Revoke soulbound token (SBT) will remove the SBT from your account, releasing the associated
                        wallets used for scoring. You can remove these imported wallets and import them into another
                        account to accumulate points. Once revoked, the SBT can be re-issued later.
                      </div>
                    </div>
                  </div>
                </ConfirmModal>
              </div>
            )}
          </div>
        </div>

        {!hasRevokedSbt && (
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-[1px] flex-wrap">
              {hasSBT
                ? [
                    {
                      title: 'Global RS',
                      totalRs: `${globalRS}`,
                      totalDia: '-',
                      isActive: true,
                    },
                    {
                      title: 'DeFi RS',
                      totalRs: '-',
                      totalDia: '-',
                    },
                    {
                      title: 'NFT RS',
                      totalRs: '-',
                      totalDia: '-',
                    },
                    {
                      title: 'GameFi RS',
                      totalRs: '-',
                      totalDia: '-',
                    },
                    {
                      title: 'DAO RS',
                      totalRs: '-',
                      totalDia: '-',
                    },
                    {
                      title: 'SocialFi RS',
                      totalRs: '-',
                      totalDia: '-',
                    },
                  ].map((rs, index) => (
                    <GlobalRS
                      key={index}
                      title={rs.title}
                      totalRs={rs.totalRs}
                      totalDia={rs.totalDia}
                      isActive={rs.isActive}
                      handleChangeCategory={handleChangeCategory}
                      selectCategory={selectCategory}
                      loggedIn={loggedIn}
                      hasSBT={hasSBT}
                    />
                  ))
                : globalRsListNotHaveSBTMockup.map((rs, index) => (
                    <GlobalRS
                      key={index}
                      title={rs.title}
                      totalRs={rs.totalRs}
                      totalDia={rs.totalDia}
                      loggedIn={loggedIn}
                      hasSBT={hasSBT}
                    />
                  ))}
            </div>

            {loggedIn ? (
              soulboundId ? (
                // <div className="flex w-full md:w-full rounded-lg border p-3 border-[#E9E9E9] gap-6">
                //   <div className="flex justify-between items-center w-full">
                //     <div className="text-black-1c font-medium">{selectCategory}</div>
                //     <div className="flex items-center gap-6">
                //       <div className="flex flex-col gap-y-1 text-[#898989] text-sm">
                //         <p>Last updated: 10:00AM, 20 March 2023</p>
                //         <div className="flex gap-[9.6px]">
                //           <TimeIcon />
                //           <p>Next update available in: 07d : 28m :56s</p>
                //         </div>
                //       </div>
                //       <div className="h-5 w-[1px] bg-[#E9E9E9]"></div>
                //       <div className={classes['update-mint']}>
                //         <div className={classes['mint-fee']}>
                //           <div className={classes['p1']}>Update fee</div>
                //           <div className={classes['p2']}>1 BUSD</div>
                //         </div>
                //         <div className={classes['mint-badge']}>
                //           <div className={classes['mint-badge-wrapper']}>
                //             <BadgeGift />
                //             Free for now
                //           </div>
                //         </div>
                //       </div>
                //       <div>
                //         <button
                //           // onClick={handleUpdateRS}
                //           className="flex items-center justify-center gap-[10px] w-[164px] h-12 px-[11px] py-[20px] bg-[#F2F2F2] border-2 border-[#F2F2F2] border-solid rounded over">
                //           Update free now
                //         </button>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <></>
              ) : (
                <div className={classes['side-notification-wrapper']}>
                  <div className={classes['side-notification']}>
                    <InfomationCircle />
                    <p>{`You don’t have SBT on ${selectedChain?.name}`}</p>
                  </div>
                  <div className="w-[1px] h-5 bg-[#E9E9E9]"></div>
                  <div className={classes['side-mint']}>
                    {/* <div className={classes['mint-fee']}>
                      <div className={classes['p1']}>Mint fee</div>
                      <div className={classes['p2']}>1 BUSD</div>
                    </div>
                    <div className={classes['mint-badge']}>
                      <div className={classes['mint-badge-wrapper']}>
                        <BadgeGift />
                        <p className="pt-[3px]">Free for now</p>
                      </div>
                    </div> */}
                    <div
                      style={{
                        background: 'var(--gradient-14, linear-gradient(351deg, #f67265 9.99%, #ffe375 105.93%))',
                      }}
                      className="flex items-center h-6 px-[6px] py-1 gap-1 rounded-3xl text-xs font-normal text-white text-center">
                      <BadgeGift />
                      <div className="flex items-center text-center pt-0.5">
                        <p>Always Free!</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ButtonV2 onClick={() => handleOpenMint()} className="">
                      <span>Mint SBT</span>
                    </ButtonV2>
                  </div>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        )}
        {openMint && <MintToken open={openMint} handleClose={handleCloseMint} onConfirm={handleOpenMint} />}

        {hasRevokedSbt && (
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-[1px] flex-wrap">
              {globalRsListNotHaveSBTMockup.map((rs, index) => (
                <GlobalRS
                  key={index}
                  title={rs.title}
                  totalRs={rs.totalRs}
                  totalDia={rs.totalDia}
                  loggedIn={loggedIn}
                  hasSBT={hasSBT}
                />
              ))}
            </div>

            {loggedIn && hasRevokedSbt && (
              <div className={classes['side-notification-wrapper']}>
                <div className={classes['side-notification']}>
                  <InfomationCircle />
                  <p>{`Your SBT ID on ${selectedChain?.name} still belongs to you. Get it back!`}</p>
                </div>
                <div className="w-[1px] h-5 bg-[#E9E9E9]"></div>
                <div className={classes['side-mint']}>
                  {/* <div className={classes['mint-fee']}>
                    <div className={classes['p1']}>Mint fee</div>
                    <div className={classes['p2']}>1 BUSD</div>
                  </div> */}
                  <div className={classes['mint-badge']}>
                    {/* <div className={classes['mint-badge-wrapper']}>
                      <BadgeGift />
                      <p>Always Free</p>
                    </div> */}
                    <div
                      style={{
                        background: 'var(--gradient-14, linear-gradient(351deg, #f67265 9.99%, #ffe375 105.93%))',
                      }}
                      className="flex items-center h-6 px-[6px] py-1 gap-1 rounded-3xl text-xs font-normal text-white text-center">
                      <BadgeGift />
                      <div className="flex items-center text-center pt-0.5">
                        <p>Always Free!</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {hasSBT && (
                  <div>
                    <button className="flex items-center justify-center gap-[10px] w-[164px] h-12 px-[11px] py-[20px] bg-[#F2F2F2] border-2 border-[#F2F2F2] border-solid rounded over">
                      Update
                    </button>
                  </div>
                )} */}
                {hasRevokedSbt && (
                  <div>
                    <ButtonV2 className="" onClick={handleReissue}>
                      Re-issue
                    </ButtonV2>

                    <ConfirmModal
                      type={DialogTypes.None}
                      open={showReissueConfirm}
                      handleClose={onReissueCancel}
                      handleConfirm={onReissueConfirm}>
                      <div className="flex flex-col">
                        <div className="flex justify-center">
                          <img src="/assets/images/user-information/confirm-modal-warning.svg" />
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="w-[548px] text-center text-zinc-900 text-[24px] font-medium leading-loose">
                            Do you want to proceed with re-issuing the SBT?
                          </div>
                          <div className="w-[548px] text-center text-zinc-500 text-[18px] font-normal leading-7">
                            Re-issuing soulbound token (SBT) will help you retrieve a previously minted SBT. This SBT
                            will be attached to your primary wallet and will accumulate scores based on the total scores
                            of the remaining imported wallets.
                          </div>
                        </div>
                      </div>
                    </ConfirmModal>
                  </div>
                )}
                {/* <div>
                    <ButtonV2 onClick={() => handleOpenMint()} className="">
                      <span>Mint SBT free now</span>
                    </ButtonV2>
                  </div>
                  {openMint && <MintToken open={openMint} handleClose={handleCloseMint} onConfirm={handleOpenMint} />} */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
