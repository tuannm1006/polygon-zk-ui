import { InputAdornment } from '@mui/material';
import { showModalActions } from 'app';
import { DefaultFcProps } from 'common';
import clsx from 'clsx';
import { useAppContext, useWeb3Context } from 'contexts';
import { isEmpty, isNil, propOr } from 'ramda';
import React, { useEffect, useMemo, useState } from 'react';
import {
  GradientButton,
  Input,
  HtmlTooltip,
  DialogTypes,
  Dialog,
  OutlinedGradientButton,
  CountdownClock,
  chainIds,
  DialogMintSuccess,
  ConfirmMintToken,
  ButtonV2,
  MintToken,
  InfomationCircle,
  BadgeGift,
  ConfirmModal,
} from 'shared-components';
import { getApi } from 'swagger';
import { getCurrentAddress, useEmit, useMintSbt, useRevokeSbt, useReissueSbt } from 'utils';
import classes from './sbts-management.module.scss';
import { useNavigate } from 'react-router-dom';
import { isNotEmpty } from '@octan/common';
import { InformationIcon } from '../account-setting';
import { useUpdateRS } from '../../../../utils/hooks/use-reputation-score';
import { ChainButton } from '../../../../shared-components/chain-button';
import { GlobalRS } from '../../../../shared-components/global-rs-button';
import toast from 'react-hot-toast';
export type SbtsManagementProps = DefaultFcProps;

export type chainDesc = {
  asset: string;
  title: string;
  hasSBT?: boolean;
};

export type globalRS = {
  title: string;
  totalRs: string;
  totalDia: string;
};

export const chainListDesc: chainDesc[] = [
  {
    asset: '/assets/images/networks/bsc.png',
    title: 'BNB chain',
    // hasSBT: true,
  },
  {
    asset: '/assets/images/networks/eth.png',
    title: 'Ethereum',
  },
  {
    asset: '/assets/images/networks/polygon.png',
    title: 'Polygon zkEVM',
    hasSBT: true,
  },
  {
    asset: '/assets/images/networks/tron.png',
    title: 'Tron',
  },
];

export const globalRsListMockup: globalRS[] = [
  {
    title: 'Global RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
  {
    title: 'Defi RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
  {
    title: 'NFT RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
  {
    title: 'Gamefi RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
  {
    title: 'DAO RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
  {
    title: 'Socialfi RS',
    totalRs: '10,090',
    totalDia: '1,208',
  },
];

export const globalRsListNotHaveSBTMockup: globalRS[] = [
  {
    title: 'Global RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
  {
    title: 'DeFi RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
  {
    title: 'NFT RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
  {
    title: 'GameFi RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
  {
    title: 'DAO RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
  {
    title: 'SocialFi RS',
    totalRs: 'N/A',
    totalDia: 'N/A',
  },
];

export const BadgeSBTIconActive = ({ isActive = false }) => {
  return isActive ? (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="18" rx="9" fill="url(#paint0_linear_1740_4452)" />
      <path
        d="M5.738 10.492C5.87 10.822 6.06433 11.0897 6.321 11.295C6.585 11.493 6.88567 11.592 7.223 11.592C7.49433 11.592 7.72533 11.526 7.916 11.394C8.114 11.262 8.213 11.0713 8.213 10.822C8.213 10.4627 7.94533 10.1877 7.41 9.997L6.486 9.667C5.92133 9.46167 5.474 9.183 5.144 8.831C4.814 8.479 4.649 8.02433 4.649 7.467C4.649 7.115 4.71133 6.79967 4.836 6.521C4.96067 6.235 5.13667 5.993 5.364 5.795C5.59133 5.58967 5.85533 5.432 6.156 5.322C6.464 5.212 6.80133 5.157 7.168 5.157C7.74 5.157 8.26067 5.30367 8.73 5.597C9.19933 5.89033 9.55133 6.29733 9.786 6.818L8.411 7.61C8.29367 7.35333 8.13233 7.137 7.927 6.961C7.729 6.77767 7.487 6.686 7.201 6.686C6.94433 6.686 6.73533 6.74833 6.574 6.873C6.42 6.99767 6.343 7.16267 6.343 7.368C6.343 7.55133 6.409 7.70167 6.541 7.819C6.673 7.93633 6.85633 8.039 7.091 8.127L8.092 8.512C8.71533 8.74667 9.17367 9.04367 9.467 9.403C9.76767 9.755 9.918 10.1913 9.918 10.712C9.918 11.1007 9.841 11.4453 9.687 11.746C9.54033 12.0467 9.34233 12.2997 9.093 12.505C8.84367 12.7103 8.554 12.868 8.224 12.978C7.90133 13.088 7.56033 13.143 7.201 13.143C6.87833 13.143 6.57033 13.099 6.277 13.011C5.98367 12.9303 5.71233 12.813 5.463 12.659C5.21367 12.4977 4.99 12.2997 4.792 12.065C4.594 11.8303 4.43633 11.559 4.319 11.251L5.738 10.492ZM11.0767 5.3H13.8927C14.2447 5.3 14.571 5.34767 14.8717 5.443C15.1724 5.53833 15.429 5.674 15.6417 5.85C15.8617 6.026 16.0304 6.24233 16.1477 6.499C16.2724 6.75567 16.3347 7.049 16.3347 7.379C16.3347 7.72367 16.254 8.02433 16.0927 8.281C15.9314 8.53767 15.7114 8.73933 15.4327 8.886C15.8727 9.04 16.21 9.27833 16.4447 9.601C16.6794 9.91633 16.7967 10.2977 16.7967 10.745C16.7967 11.097 16.7307 11.4123 16.5987 11.691C16.474 11.9697 16.2944 12.208 16.0597 12.406C15.825 12.5967 15.5354 12.7433 15.1907 12.846C14.8534 12.9487 14.4757 13 14.0577 13H11.0767V5.3ZM13.9587 11.614C14.3107 11.614 14.593 11.5333 14.8057 11.372C15.0184 11.2107 15.1247 10.9723 15.1247 10.657C15.1247 10.349 15.0184 10.1143 14.8057 9.953C14.593 9.78433 14.3107 9.7 13.9587 9.7H12.6937V11.614H13.9587ZM13.7277 8.369C14.0137 8.369 14.2484 8.29933 14.4317 8.16C14.6224 8.01333 14.7177 7.80067 14.7177 7.522C14.7177 7.24333 14.6224 7.03433 14.4317 6.895C14.2484 6.74833 14.0137 6.675 13.7277 6.675H12.6937V8.369H13.7277ZM17.1316 5.3H22.8516V6.84H20.8276V13H19.1666V6.84H17.1316V5.3Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1740_4452"
          x1="0.00314634"
          y1="8.99998"
          x2="28.0002"
          y2="8.99998"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FF7C" />
          <stop offset="1" stopColor="#00C4FF" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="18" rx="9" fill="#B6B6B6" />
      <path
        d="M5.738 10.492C5.87 10.822 6.06433 11.0897 6.321 11.295C6.585 11.493 6.88567 11.592 7.223 11.592C7.49433 11.592 7.72533 11.526 7.916 11.394C8.114 11.262 8.213 11.0713 8.213 10.822C8.213 10.4627 7.94533 10.1877 7.41 9.997L6.486 9.667C5.92133 9.46167 5.474 9.183 5.144 8.831C4.814 8.479 4.649 8.02433 4.649 7.467C4.649 7.115 4.71133 6.79967 4.836 6.521C4.96067 6.235 5.13667 5.993 5.364 5.795C5.59133 5.58967 5.85533 5.432 6.156 5.322C6.464 5.212 6.80133 5.157 7.168 5.157C7.74 5.157 8.26067 5.30367 8.73 5.597C9.19933 5.89033 9.55133 6.29733 9.786 6.818L8.411 7.61C8.29367 7.35333 8.13233 7.137 7.927 6.961C7.729 6.77767 7.487 6.686 7.201 6.686C6.94433 6.686 6.73533 6.74833 6.574 6.873C6.42 6.99767 6.343 7.16267 6.343 7.368C6.343 7.55133 6.409 7.70167 6.541 7.819C6.673 7.93633 6.85633 8.039 7.091 8.127L8.092 8.512C8.71533 8.74667 9.17367 9.04367 9.467 9.403C9.76767 9.755 9.918 10.1913 9.918 10.712C9.918 11.1007 9.841 11.4453 9.687 11.746C9.54033 12.0467 9.34233 12.2997 9.093 12.505C8.84367 12.7103 8.554 12.868 8.224 12.978C7.90133 13.088 7.56033 13.143 7.201 13.143C6.87833 13.143 6.57033 13.099 6.277 13.011C5.98367 12.9303 5.71233 12.813 5.463 12.659C5.21367 12.4977 4.99 12.2997 4.792 12.065C4.594 11.8303 4.43633 11.559 4.319 11.251L5.738 10.492ZM11.0767 5.3H13.8927C14.2447 5.3 14.571 5.34767 14.8717 5.443C15.1724 5.53833 15.429 5.674 15.6417 5.85C15.8617 6.026 16.0304 6.24233 16.1477 6.499C16.2724 6.75567 16.3347 7.049 16.3347 7.379C16.3347 7.72367 16.254 8.02433 16.0927 8.281C15.9314 8.53767 15.7114 8.73933 15.4327 8.886C15.8727 9.04 16.21 9.27833 16.4447 9.601C16.6794 9.91633 16.7967 10.2977 16.7967 10.745C16.7967 11.097 16.7307 11.4123 16.5987 11.691C16.474 11.9697 16.2944 12.208 16.0597 12.406C15.825 12.5967 15.5354 12.7433 15.1907 12.846C14.8534 12.9487 14.4757 13 14.0577 13H11.0767V5.3ZM13.9587 11.614C14.3107 11.614 14.593 11.5333 14.8057 11.372C15.0184 11.2107 15.1247 10.9723 15.1247 10.657C15.1247 10.349 15.0184 10.1143 14.8057 9.953C14.593 9.78433 14.3107 9.7 13.9587 9.7H12.6937V11.614H13.9587ZM13.7277 8.369C14.0137 8.369 14.2484 8.29933 14.4317 8.16C14.6224 8.01333 14.7177 7.80067 14.7177 7.522C14.7177 7.24333 14.6224 7.03433 14.4317 6.895C14.2484 6.74833 14.0137 6.675 13.7277 6.675H12.6937V8.369H13.7277ZM17.1316 5.3H22.8516V6.84H20.8276V13H19.1666V6.84H17.1316V5.3Z"
        fill="white"
      />
    </svg>
  );
};

export const BadgeSBTIconInactive = () => {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="18" rx="9" fill="#B6B6B6" />
      <path
        d="M5.738 10.492C5.87 10.822 6.06433 11.0897 6.321 11.295C6.585 11.493 6.88567 11.592 7.223 11.592C7.49433 11.592 7.72533 11.526 7.916 11.394C8.114 11.262 8.213 11.0713 8.213 10.822C8.213 10.4627 7.94533 10.1877 7.41 9.997L6.486 9.667C5.92133 9.46167 5.474 9.183 5.144 8.831C4.814 8.479 4.649 8.02433 4.649 7.467C4.649 7.115 4.71133 6.79967 4.836 6.521C4.96067 6.235 5.13667 5.993 5.364 5.795C5.59133 5.58967 5.85533 5.432 6.156 5.322C6.464 5.212 6.80133 5.157 7.168 5.157C7.74 5.157 8.26067 5.30367 8.73 5.597C9.19933 5.89033 9.55133 6.29733 9.786 6.818L8.411 7.61C8.29367 7.35333 8.13233 7.137 7.927 6.961C7.729 6.77767 7.487 6.686 7.201 6.686C6.94433 6.686 6.73533 6.74833 6.574 6.873C6.42 6.99767 6.343 7.16267 6.343 7.368C6.343 7.55133 6.409 7.70167 6.541 7.819C6.673 7.93633 6.85633 8.039 7.091 8.127L8.092 8.512C8.71533 8.74667 9.17367 9.04367 9.467 9.403C9.76767 9.755 9.918 10.1913 9.918 10.712C9.918 11.1007 9.841 11.4453 9.687 11.746C9.54033 12.0467 9.34233 12.2997 9.093 12.505C8.84367 12.7103 8.554 12.868 8.224 12.978C7.90133 13.088 7.56033 13.143 7.201 13.143C6.87833 13.143 6.57033 13.099 6.277 13.011C5.98367 12.9303 5.71233 12.813 5.463 12.659C5.21367 12.4977 4.99 12.2997 4.792 12.065C4.594 11.8303 4.43633 11.559 4.319 11.251L5.738 10.492ZM11.0767 5.3H13.8927C14.2447 5.3 14.571 5.34767 14.8717 5.443C15.1724 5.53833 15.429 5.674 15.6417 5.85C15.8617 6.026 16.0304 6.24233 16.1477 6.499C16.2724 6.75567 16.3347 7.049 16.3347 7.379C16.3347 7.72367 16.254 8.02433 16.0927 8.281C15.9314 8.53767 15.7114 8.73933 15.4327 8.886C15.8727 9.04 16.21 9.27833 16.4447 9.601C16.6794 9.91633 16.7967 10.2977 16.7967 10.745C16.7967 11.097 16.7307 11.4123 16.5987 11.691C16.474 11.9697 16.2944 12.208 16.0597 12.406C15.825 12.5967 15.5354 12.7433 15.1907 12.846C14.8534 12.9487 14.4757 13 14.0577 13H11.0767V5.3ZM13.9587 11.614C14.3107 11.614 14.593 11.5333 14.8057 11.372C15.0184 11.2107 15.1247 10.9723 15.1247 10.657C15.1247 10.349 15.0184 10.1143 14.8057 9.953C14.593 9.78433 14.3107 9.7 13.9587 9.7H12.6937V11.614H13.9587ZM13.7277 8.369C14.0137 8.369 14.2484 8.29933 14.4317 8.16C14.6224 8.01333 14.7177 7.80067 14.7177 7.522C14.7177 7.24333 14.6224 7.03433 14.4317 6.895C14.2484 6.74833 14.0137 6.675 13.7277 6.675H12.6937V8.369H13.7277ZM17.1316 5.3H22.8516V6.84H20.8276V13H19.1666V6.84H17.1316V5.3Z"
        fill="white"
      />
    </svg>
  );
};

export const DiagramIcon = () => {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.4529 16.5725V2.42578C10.4529 1.8735 10.0052 1.42578 9.45294 1.42578H6.4044C5.85212 1.42578 5.4044 1.8735 5.4044 2.42578V16.5725M10.4529 16.5725L10.4516 8.13927C10.4515 7.58693 10.8993 7.13912 11.4516 7.13912H14.5C15.0523 7.13912 15.5 7.58683 15.5 8.13911V15.5725C15.5 16.1247 15.0523 16.5725 14.5 16.5725H10.4529ZM10.4529 16.5725H5.4044M5.4044 16.5725V12.5724C5.4044 12.0202 4.95669 11.5724 4.4044 11.5724H1.5C0.947715 11.5724 0.5 12.0202 0.5 12.5724V15.5725C0.5 16.1247 0.947715 16.5725 1.5 16.5725H5.4044Z"
        stroke="#B6B6B6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TimeIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0853 10.5483C10.6093 10.7229 11.1756 10.4398 11.3502 9.91584C11.5249 9.39189 11.2417 8.82557 10.7178 8.65092L10.0853 10.5483ZM8.00156 8.79961H7.00156C7.00156 9.23004 7.27699 9.61218 7.68533 9.74829L8.00156 8.79961ZM9.00156 5.45445C9.00156 4.90216 8.55385 4.45445 8.00156 4.45445C7.44928 4.45445 7.00156 4.90216 7.00156 5.45445H9.00156ZM10.7178 8.65092L8.31779 7.85092L7.68533 9.74829L10.0853 10.5483L10.7178 8.65092ZM9.00156 8.79961V5.45445H7.00156V8.79961H9.00156ZM13.4016 7.99961C13.4016 10.9819 10.9839 13.3996 8.00156 13.3996V15.3996C12.0885 15.3996 15.4016 12.0865 15.4016 7.99961H13.4016ZM8.00156 13.3996C5.01922 13.3996 2.60156 10.9819 2.60156 7.99961H0.601562C0.601562 12.0865 3.91465 15.3996 8.00156 15.3996V13.3996ZM2.60156 7.99961C2.60156 5.01727 5.01922 2.59961 8.00156 2.59961V0.599609C3.91465 0.599609 0.601562 3.9127 0.601562 7.99961H2.60156ZM8.00156 2.59961C10.9839 2.59961 13.4016 5.01727 13.4016 7.99961H15.4016C15.4016 3.9127 12.0885 0.599609 8.00156 0.599609V2.59961Z"
        fill="#898989"
      />
    </svg>
  );
};

export const SbtsManagement: React.FC<SbtsManagementProps> = ({ className }) => {
  const [isInprogress, setIsInprogress] = useState(false);
  const [isOpenConfirmRevoke, setIsOpenConfirmRevoke] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [primaryWallet, setPrimaryWallet] = useState('');
  const [nextPrimaryWallet, setNextPrimaryWallet] = useState('');

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [textOfButton, setTextOfButton] = useState('');

  const [openMintToken, setOpenMintToken] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const [openMint, setOpenMint] = useState(false);
  const handleOpenMint = () => setOpenMint(true);
  const handleCloseMint = () => setOpenMint(false);

  const appContext = useAppContext();
  const {
    userInfo,
    userAddress,
    userAddresses,
    fetchUserWallets,
    fetchUserInfo,
    signOut,
    selectedChain,
    hasSBT,
    reputationScore,
    setReputationScore,
    nextUpdateReputationScore,
    hasRevokedSbt,
    soulboundId,
    globalRS,
    loggedIn,
  } = appContext;
  const { connectWalletWithBe } = useWeb3Context();

  const [isReissue, setIsReissue] = useState(false);
  const [isOpenDialogSelectWallet, setIsOpenDialogSelectWallet] = useState(false);
  const [isOpenDialogMessage, setIsOpenDialogMessage] = useState(false);

  const emit = useEmit();
  const revokeSbt = useRevokeSbt();
  const mintSbt = useMintSbt();

  const updateRS = useUpdateRS();
  const [selectCategory, setSelectCategory] = useState('Total Global RS');
  const handleChangeCategory = (category: string) => {
    setSelectCategory(category);
  };
  const navigate = useNavigate();

  const reissueSbt = useReissueSbt();

  const verifiedEmail = useMemo(() => !!userInfo?.isVerifyEmail, [userInfo]);

  const [showReissueConfirm, setShowReissueConfirm] = useState(false);

  const onReissueCancel = () => {
    setShowReissueConfirm(false);
  };

  const onReissueConfirm = () => {
    void onReissue();
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

  const mintOnBsc = async () => {
    try {
      if (hasSBT) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: 'You minted already',
        });
        return;
      }
      setIsInprogress(true);

      const transactionHash = await mintSbt(appContext);
      if (!!transactionHash) {
        setTxHash(transactionHash);
        setIsOpenSuccess(true);
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
    setIsInprogress(false);
  };

  const mint = () => {
    if (!selectedChain) return;
    switch (selectedChain.id) {
      case chainIds.polygon_zk:
        mintOnBsc();
        break;
    }
  };

  const onMintNowClick = (isReIssue: boolean) => () => {
    if (verifiedEmail) {
      setIsReissue(isReIssue);
      setOpenMintToken(true);
    } else {
      if (isEmpty(userInfo)) {
        setTitle('Update profile');
        setSubTitle('You need to Update your profile!');
        setTextOfButton('Go to Profile ->');
      } else {
        setTitle('Verify Email');
        setSubTitle('You need to verify your email!');
        setTextOfButton('Go to Verify ->');
      }
      setIsOpenDialogMessage(true);
    }
  };

  const onChangePrimaryWallet = async () => {
    const currentAddress = await getCurrentAddress();

    if (currentAddress !== userInfo?.primaryWallet) {
      setIsOpenConfirm(true);
    } else {
      setNextPrimaryWallet(otherAddresses[0]);
      setIsOpenDialogSelectWallet(true);
    }
  };

  const onConfirm = async () => {
    try {
      setIsOpenDialogSelectWallet(false);
      await getApi().walletsChangePrimaryWalletPost({
        walletAddress: nextPrimaryWallet,
      });
      emit({
        action: showModalActions.showWarning,
        type: DialogTypes.Info,
        title: 'Successfully',
        subTitle: 'Primary wallet was changed.',
      });
      fetchUserWallets();
      fetchUserInfo();
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

  const onOpenRevokePopup = async () => {
    const currentAddress = await getCurrentAddress();

    if (currentAddress !== userInfo?.primaryWallet) {
      emit({
        action: showModalActions.showWarning,
        type: DialogTypes.Error,
        title: 'Error',
        subTitle: 'SBT (Soul Bound Token) can only be revoked when connecting by primary wallet',
      });
    } else {
      setIsOpenConfirmRevoke(true);
    }
  };

  const onRevoke = async () => {
    try {
      setIsInprogress(true);

      const txHash = await revokeSbt(appContext);
      if (!!txHash) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Info,
          title: 'Successfully',
          subTitle: 'SBT (Soul Bound Token) was revoked.',
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
    setIsOpenConfirmRevoke(false);
    setIsInprogress(false);
  };

  const gotoProfile = () => {
    navigate('/profile/account-setting');
  };

  const otherAddresses = useMemo(
    () => userAddresses.filter((wallet) => wallet !== primaryWallet),
    [userAddresses, primaryWallet]
  );

  useEffect(() => {
    fetchUserWallets();
  }, []);

  useEffect(() => {
    setPrimaryWallet(userInfo?.primaryWallet || '');
  }, [userInfo?.primaryWallet]);

  const handleRevoke = () => {
    console.log('handleRevoke');
    onRevoke();
  };

  const updateRSOnBsc = async () => {
    try {
      setIsInprogress(true);

      const transactionHash = await updateRS(appContext);
      if (!!transactionHash) {
        console.log('transactionHash ::: ', transactionHash);
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
    setIsInprogress(false);
  };

  const handleUpdateRS = () => {
    console.log('handleUpdateRS');
    updateRSOnBsc();
  };

  return (
    <>
      <div className={className}>
        <div className="flex flex-col font-bold text-xl md:text-3xl text-black border-b-2 border-[#E9E9E9] border-solid">
          <div className="w-[906px] text-zinc-900 text-2xl font-medium leading-[30px]">Soulbound token information</div>
          <div className="py-6 flex flex-wrap gap-3">
            {/* {chainListDesc
              .filter((chain) => chain.title !== 'BNB Chain')
              .map((chain) => (
                <ChainButton src={chain.asset} title={chain.title} />
              ))} */}
            {chainListDesc.map((chain, index) => (
              <ChainButton
                key={index}
                src={chain.asset}
                title={chain.title}
                hasSBT={hasSBT}
                hasRevokedSbt={hasRevokedSbt}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-6 md:mt-6 gap-y-20">
          <div className="w-full">
            <div className="mb-6">
              <div className="flex justify-between gap-3 items-center mb-3">
                <div className="flex gap-3">
                  <label className="text-[#898989]">SBT ID:</label>
                  <p className="text-[#4185EC]">{soulboundId ? soulboundId : '-'}</p>
                  {hasRevokedSbt && <img src="/assets/images/user-information/revoked.svg" alt="Revoked" />}
                </div>
                {hasSBT && (
                  <div className="text-[#B6B6B6] font-medium cursor-pointer" onClick={handleRevoke}>
                    <p className="underline underline-offset-1">Revoke</p>
                  </div>
                )}
              </div>
            </div>

            {loggedIn && !hasRevokedSbt && (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-wrap justify-between">
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
                          hasSBT={hasSBT}
                        />
                      ))}
                </div>

                {loggedIn ? (
                  soulboundId ? (
                    // <div className="flex w-full md:w-full rounded-lg border p-3 border-[#E9E9E9] gap-6">
                    //   <div className="flex justify-between items-center w-4/5 border-r-2 border-r-[#E9E9E9] pr-6">
                    //     <div className="text-black-1c font-medium">{selectCategory}</div>
                    //     <div className="flex flex-col gap-y-1 text-[#898989] text-sm">
                    //       <p>Last updated: 10:00AM, 20 March 2023</p>
                    //       <div className="flex gap-[9.6px]">
                    //         <TimeIcon />
                    //         <p>Next update available in: 07d : 28m :56s</p>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div>
                    //     <button
                    //       onClick={handleUpdateRS}
                    //       className="flex items-center justify-center gap-[10px] w-[164px] h-12 px-[11px] py-[20px] bg-[#F2F2F2] border-2 border-[#F2F2F2] border-solid rounded over">
                    //       Update
                    //     </button>
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
                      {openMint && (
                        <MintToken open={openMint} handleClose={handleCloseMint} onConfirm={handleOpenMint} />
                      )}
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
            )}

            {hasRevokedSbt && (
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-2 flex-wrap">
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

                {loggedIn && (
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
                      {/* <div className={classes['mint-badge']}>
                        <div className={classes['mint-badge-wrapper']}>
                          <BadgeGift />
                          Free for now
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
                    {hasSBT && (
                      <div>
                        <button className="flex items-center justify-center gap-[10px] w-[164px] h-12 px-[11px] py-[20px] bg-[#F2F2F2] border-2 border-[#F2F2F2] border-solid rounded over">
                          Update
                        </button>
                      </div>
                    )}
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
                                Re-issuing soulbound token (SBT) will help you retrieve a previously minted SBT. This
                                SBT will be attached to your primary wallet and will accumulate scores based on the
                                total scores of the remaining imported wallets.
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
      </div>
      {isOpenDialogMessage && (
        <Dialog
          type={DialogTypes.Warning}
          open={isOpenDialogMessage}
          handleClose={() => setIsOpenDialogMessage(false)}
          title={title}
          subTitle={subTitle}>
          <GradientButton fullWidth onClick={gotoProfile}>
            {textOfButton}
          </GradientButton>
        </Dialog>
      )}
      {isOpenSuccess && (
        <DialogMintSuccess txHash={txHash} open={isOpenSuccess} handleClose={() => setIsOpenSuccess(false)} />
      )}
      {openMintToken && (
        <ConfirmMintToken
          open={openMintToken}
          handleClose={() => setOpenMintToken(false)}
          onConfirm={() => {
            setOpenMintToken(false);
            mint();
          }}
        />
      )}
    </>
  );
};
