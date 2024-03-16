import { FC, memo, useEffect, useState } from 'react';
import { DefaultFcProps, RANKING_API_ENDPOINTS } from 'common';
import { DialogTypes, chainIds } from 'shared-components';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { formatStringToNumber, useEmit } from 'utils';
import { toJson } from '@octan/common';
import { showModalActions } from 'app';
import { useWeb3Context, useAppContext } from 'contexts';
import toast from 'react-hot-toast';
import classNames from 'classnames';

export const SbtOwnersCurrentRankRow: FC<DefaultFcProps> = memo(({ username = '' }) => {
  const [topAddress, setTopAddress] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { connectWalletWithBe } = useWeb3Context();
  const { selectedChainId, setIsWaiting, loggedIn, userInfo, sbts } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const emit = useEmit();

  useEffect(() => {
    const getSbtCurrentRankRowData = async () => {
      setIsFetching(true);
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          page: 1,
          take: 10,
          keyword: username.length > 0 ? username : userInfo?.username,
          chain_key: 'BSC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        const { data } = await fetch(
          `${rankingBasePath}/${RANKING_API_ENDPOINTS.rankingBase}/${RANKING_API_ENDPOINTS.sbtOwners}${
            query ? `?${query}` : ''
          }`,
          {
            ...options,
            method: 'GET',
          }
        ).then(toJson);

        setTopAddress(data);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    };

    if (username.length > 0 || (userInfo && userInfo.email)) {
      void getSbtCurrentRankRowData();
    } else {
      setTopAddress([]);
    }
  }, [username, loggedIn]);

  const onConnectWallet = async () => {
    try {
      if (selectedChainId === chainIds.none) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: 'You need to select network first.',
        });
      } else {
        setIsWaiting(true);
        await connectWalletWithBe();
        setIsWaiting(false);
        toast.success('Connect Metamask successful');
      }
    } catch (error) {
      setIsWaiting(false);
      toast.error('Connect Metamask unsuccessful');
      console.log('error', error);
    }
  };

  const renderNoDataCurrentRankRow = () => {
    const su = username.toLowerCase();
    if (isFetching || topAddress.length > 0) {
      return <></>;
    }

    if (su.length > 0) {
      if (topAddress.length == 0) {
        return (
          <tr className="tbrow-notexisted">
            <td colSpan={7}>
              <div className="flex flex-row items-center">
                <svg
                  className="ml-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.0004 12.9708V8.13245M12.0004 16.557V16.5995M18.0483 20.6292H5.95247C4.30023 20.6292 2.90591 19.5249 2.46722 18.0142C2.27996 17.3693 2.51005 16.6976 2.862 16.1257L8.90992 5.09773C10.3269 2.79514 13.6739 2.79514 15.0909 5.09773L21.1388 16.1257C21.4907 16.6976 21.7208 17.3693 21.5336 18.0142C21.0949 19.5249 19.7005 20.6292 18.0483 20.6292Z"
                    stroke="#FF4747"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">The entered username does not exist.</span>
              </div>
            </td>
            <td colSpan={4}></td>
          </tr>
        );
      }
    }

    if (!loggedIn) {
      return (
        <tr className="tbrow-connect">
          <td colSpan={5}>
            <div className="flex flex-row items-center">
              <svg
                className="ml-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.326 6.42113L16.697 9.18608C16.8 9.39408 16.999 9.53813 17.23 9.57213L20.394 10.0301C20.974 10.1141 21.206 10.8261 20.785 11.2341L18.4969 13.4541C18.3299 13.6161 18.253 13.8501 18.293 14.0791L18.816 17.1171C18.922 17.7331 18.274 18.2031 17.719 17.9131L14.974 16.4771C14.768 16.3691 14.522 16.3691 14.317 16.4771L11.574 17.9121C11.018 18.2031 10.369 17.7321 10.476 17.1151L10.999 14.0801C11.039 13.8511 10.962 13.6171 10.795 13.4551L8.50696 11.2351C8.08696 10.8271 8.31795 10.1151 8.89795 10.0311L12.062 9.5731C12.292 9.5401 12.491 9.39612 12.595 9.18712L13.9659 6.4221C14.2459 5.8601 15.048 5.86013 15.326 6.42113ZM7.75 17.0001C7.75 16.5861 7.414 16.2501 7 16.2501H3C2.586 16.2501 2.25 16.5861 2.25 17.0001C2.25 17.4141 2.586 17.7501 3 17.7501H7C7.414 17.7501 7.75 17.4141 7.75 17.0001ZM5 12.7501H3C2.586 12.7501 2.25 12.4141 2.25 12.0001C2.25 11.5861 2.586 11.2501 3 11.2501H5C5.414 11.2501 5.75 11.5861 5.75 12.0001C5.75 12.4141 5.414 12.7501 5 12.7501ZM7 7.7501H3C2.586 7.7501 2.25 7.4141 2.25 7.0001C2.25 6.5861 2.586 6.2501 3 6.2501H7C7.414 6.2501 7.75 6.5861 7.75 7.0001C7.75 7.4141 7.414 7.7501 7 7.7501Z"
                  fill="#FF7E21"
                />
              </svg>
              <span className="ml-2">Connect to metamask to view your current rank.</span>
              <a href="#" className="ml-2 text-[#4185EC]" onClick={onConnectWallet}>
                Connect Wallet
              </a>
            </div>
          </td>
          <td colSpan={6}></td>
        </tr>
      );
    }

    if ((userInfo && !userInfo.username) || sbts.length == 0) {
      return (
        <tr className="sbtrow-nosbt">
          <td colSpan={10}>
            <div className="flex flex-row items-center pl-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.8239 2.40039L16.6542 7.3466L21.6004 9.17686L16.6542 11.0071L14.8239 15.9533L12.9937 11.0071L8.04745 9.17686L12.9937 7.3466L14.8239 2.40039Z"
                  stroke="url(#paint0_linear_2053_22720)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.35333 13.6945L7.95216 16.0486L10.3063 17.6475L7.95216 19.2463L6.35333 21.6004L4.75451 19.2463L2.40039 17.6475L4.75451 16.0486L6.35333 13.6945Z"
                  stroke="url(#paint1_linear_2053_22720)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2053_22720"
                    x1="13.6942"
                    y1="20.9686"
                    x2="10.4436"
                    y2="-0.151803"
                    gradientUnits="userSpaceOnUse">
                    <stop offset="0.0169" stopColor="#F67265" />
                    <stop offset="1" stopColor="#FFE375" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_2053_22720"
                    x1="13.6942"
                    y1="20.9686"
                    x2="10.4436"
                    y2="-0.151803"
                    gradientUnits="userSpaceOnUse">
                    <stop offset="0.0169" stopColor="#F67265" />
                    <stop offset="1" stopColor="#FFE375" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="ml-2 text-white">Mint sbt to check your Reputation.</span>
              <a href="#" className="ml-2 mint-sbt-now">
                Mint SBT now
              </a>
            </div>
          </td>
        </tr>
      );
    }
  };

  const handleMouse = () => {
    setIsHovered(!isHovered);
  };

  const hoverStyles = (): string => {
    return isHovered ? 'bg-hover' : 'sbtrow-hightlight';
  };

  return (
    <>
      {renderNoDataCurrentRankRow()}

      {!isFetching &&
        topAddress?.map((item: any) => {
          return (
            <tr key={item.username} onMouseEnter={() => handleMouse()} onMouseLeave={() => handleMouse()}>
              <td className={hoverStyles()}>
                <span>{item.rank}</span>
              </td>
              <td className={hoverStyles()}>
                <div className="flex flex-row gap-3">
                  <img src={item.avatar} className="rounded-[100px] w-6 h-6" />
                  <span className="link mr-[4px] mt-[0px]">{item.username}</span>
                </div>
              </td>
              <td className={classNames('text-center', hoverStyles())}>
                <span className="linear-text">{formatStringToNumber(item.user_reputation_score, 3)}</span>
              </td>
              <td className={classNames('text-center', hoverStyles())}>{item.connection}</td>
              <td className={classNames('text-center', hoverStyles())}>{item.connection_grs}</td>
              <td className={classNames('text-center', hoverStyles())}>
                {formatStringToNumber(item.user_total_transactions, 3)}
              </td>
              <td className={classNames('text-center', hoverStyles())}>
                {formatStringToNumber(item.user_total_gas_spent, 3)}
              </td>
              <td className={classNames('text-center', hoverStyles())}>
                {formatStringToNumber(item.user_total_degree, 3)}
              </td>
              <td className={classNames('text-center', hoverStyles())}>
                <span className="text-[#FF7E21]">-</span>
              </td>
              <td className={classNames('text-center', hoverStyles())}></td>
            </tr>
          );
        })}
    </>
  );
});
