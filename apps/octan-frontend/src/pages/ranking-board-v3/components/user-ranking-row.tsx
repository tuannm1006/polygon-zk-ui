import { FC, memo, useEffect, useState } from 'react';
import { DefaultFcProps, RANKING_API_ENDPOINTS } from 'common';
import { BtnFollow, DialogTypes, HtmlTooltip, chainIds } from 'shared-components';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { formatAddress, formatBigRanking, formatStringToNumber, formatTotalVolume, useEmit } from 'utils';
import { toJson } from '@octan/common';
import { showModalActions } from 'app';
import { useWeb3Context, useAppContext } from 'contexts';
import toast from 'react-hot-toast';
import classNames from 'classnames';

interface Favorite {
  address: string;
}

export const CurrentRankRow: FC<DefaultFcProps> = memo(({ userAddress, filter, searchObj, network, onDataLoaded }) => {
  const [topAddress, setTopAddress] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { connectWalletWithBe } = useWeb3Context();
  const { selectedChainId, setIsWaiting } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const emit = useEmit();

  useEffect(() => {
    const getAddressRanking = async () => {
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          // page: 1,
          take: filter.pageSize,
          address: filter.textSearch || userAddress,
          chain_key: network,
          sort: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sort : 'reputation_score',
          order: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sortValue?.toUpperCase() : 'DESC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        setIsFetching(true);
        // const { data, meta } = await fetch(
        //   `${rankingBasePath}/${RANKING_API_ENDPOINTS.rankingBase}/${RANKING_API_ENDPOINTS.addresses}${
        //     query ? `?${query}` : ''
        //   }`,
        //   {
        //     ...options,
        //     method: 'GET',
        //   }
        // ).then(toJson);
        const { data, meta } = await fetch(`${rankingBasePath}/rankings/addresses?${query ? `${query}` : ''}`, {
          ...options,
          method: 'GET',
        }).then(toJson);
        onDataLoaded && onDataLoaded(meta);
        setTopAddress(data);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    };

    if (userAddress || filter.textSearch) {
      getAddressRanking();
    } else {
      setTopAddress([]);
    }
  }, [userAddress, filter.textSearch, network]);

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

  const renderNoDataCurrentRankRow = (ua: any, sa: any) => {
    if (isFetching || sa.length > 0) {
      return <></>;
    }

    if (ua.length === 0) {
      if (sa.length === 0 && filter.textSearch.length === 0) {
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
      } else if (sa.length === 0 && filter.textSearch.length > 0) {
        return (
          <tr className="tbrow-notexisted">
            <td colSpan={9}>
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

                <span className="ml-2">
                  The entered address does not exist. It seems that the address has had no transaction within one year
                  recently.
                </span>
              </div>
            </td>
            <td colSpan={1}></td>
          </tr>
        );
      } else
        return (
          <tr className="tbrow-notexisted">
            <td colSpan={9}>
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

                <span className="ml-2">
                  The entered address does not exist. It seems that the address has had no transaction within one year
                  recently 1.
                </span>
              </div>
            </td>
            <td colSpan={1}></td>
          </tr>
        );
    }

    if (ua.length > 0) {
      console.log(ua === filter.textSearch.toString());
      if (
        (sa.length === 0 && filter.textSearch.length === 0) ||
        (filter.textSearch.length > 0 && ua === filter.textSearch)
      ) {
        return (
          <tr className="tbrow-nodata">
            <td colSpan={9}>
              <div className="flex flex-row items-center">
                <svg
                  className="ml-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.0004 12L12.0004 16.8M12.0004 8.44221V8.40002M2.40039 12C2.40039 6.69809 6.69846 2.40002 12.0004 2.40002C17.3023 2.40002 21.6004 6.69809 21.6004 12C21.6004 17.302 17.3023 21.6 12.0004 21.6C6.69846 21.6 2.40039 17.302 2.40039 12Z"
                    stroke="#4185EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">
                  The connected wallet does not exist in our database. It seems that the address has no transaction
                  within our calculating range.
                </span>
              </div>
            </td>
            <td colSpan={1}></td>
          </tr>
        );
      } else if (sa.length === 0 && filter.textSearch.length > 0 && ua !== filter.textSearch) {
        return (
          <tr className="tbrow-nodata">
            <td colSpan={9}>
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

                <span className="ml-2">
                  The entered address does not exist in our database. It seems that the address has had no transaction
                  within our calculating range.
                </span>
              </div>
            </td>
            <td colSpan={1}></td>
          </tr>
        );
      }
      // if (sa.length === 0 && ua === sa) {
      //   return (
      //     <tr className="tbrow-nodata">
      //       <td colSpan={7}>
      //         <div className="flex flex-row items-center">
      //           <svg
      //             className="ml-6"
      //             width="24"
      //             height="24"
      //             viewBox="0 0 24 24"
      //             fill="none"
      //             xmlns="http://www.w3.org/2000/svg">
      //             <path
      //               d="M12.0004 12L12.0004 16.8M12.0004 8.44221V8.40002M2.40039 12C2.40039 6.69809 6.69846 2.40002 12.0004 2.40002C17.3023 2.40002 21.6004 6.69809 21.6004 12C21.6004 17.302 17.3023 21.6 12.0004 21.6C6.69846 21.6 2.40039 17.302 2.40039 12Z"
      //               stroke="#4185EC"
      //               strokeWidth="2"
      //               strokeLinecap="round"
      //               strokeLinejoin="round"
      //             />
      //           </svg>

      //           <span className="ml-2">
      //             Your connected wallet seems that the address has had no transaction within one year recently.
      //           </span>
      //         </div>
      //       </td>
      //       <td colSpan={4}></td>
      //     </tr>
      //   );
      // } else if (sa.length === 0) {
      //   return (
      //     <tr className="tbrow-notexisted">
      //       <td colSpan={7}>
      //         <div className="flex flex-row items-center">
      //           <svg
      //             className="ml-6"
      //             width="24"
      //             height="24"
      //             viewBox="0 0 24 24"
      //             fill="none"
      //             xmlns="http://www.w3.org/2000/svg">
      //             <path
      //               d="M12.0004 12.9708V8.13245M12.0004 16.557V16.5995M18.0483 20.6292H5.95247C4.30023 20.6292 2.90591 19.5249 2.46722 18.0142C2.27996 17.3693 2.51005 16.6976 2.862 16.1257L8.90992 5.09773C10.3269 2.79514 13.6739 2.79514 15.0909 5.09773L21.1388 16.1257C21.4907 16.6976 21.7208 17.3693 21.5336 18.0142C21.0949 19.5249 19.7005 20.6292 18.0483 20.6292Z"
      //               stroke="#FF4747"
      //               strokeWidth="2"
      //               strokeLinecap="round"
      //               strokeLinejoin="round"
      //             />
      //           </svg>

      //           <span className="ml-2">
      //             The entered address does not exist. It seems that the address has had no transaction within one year
      //             recently.
      //           </span>
      //         </div>
      //       </td>
      //       <td colSpan={4}></td>
      //     </tr>
      //   );
      // }
    }
  };

  const handleMouse = () => {
    setIsHovered(!isHovered);
  };

  const hoverStyles = (): string => {
    return isHovered ? 'bg-hover' : 'tbrow-hightlight';
  };

  useEffect(() => {
    const getFavorites = async () => {
      const { basePath, ...options } = getApiConfig();

      const result = await fetch(`${basePath}/favorites/addresses?chainKey=${network}`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      setFavorites(result.map((item: Favorite) => item.address?.toLowerCase()));
    };

    if (userAddress) {
      getFavorites();
    } else {
      setFavorites([]);
    }
  }, [userAddress]);

  const deleteFavorite = async (address: string) => {
    setFavorites((prev) => prev.filter((item) => item !== address.toLowerCase()));
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/addresses?chainKey=${network}&address=${address}`, {
      ...options,
      method: 'DELETE',
    }).then(toJson);
  };

  const createFavorite = async (address: string) => {
    setFavorites((prev) => [...prev, address.toLowerCase()]);
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/addresses`, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify({
        chainKey: network,
        address,
      }),
    }).then(toJson);
  };

  const toggleFavorite = (address: string) => {
    if (!address) {
      return;
    }
    if (favorites?.indexOf(address?.toLowerCase()) !== -1) {
      deleteFavorite(address);
    } else {
      createFavorite(address);
    }
  };

  const changeScanByNetwork = (address: string) => {
    switch (network) {
      case 'ETH':
        return `https://etherscan.io/address/${address}`;
      case 'BNB':
        return `https://bscscan.com/address/${address}`;
      case 'ARB':
        return `https://arbiscan.io/address/${address}`;
      case 'MATIC':
        return `https://polygonscan.com/address/${address}`;
      case 'TRX':
        return `https://tronscan.org/#/address/${address}`;
      case 'XRP':
        return `https://xrpscan.com/account/${address}`;
      case 'AURORA':
        return `https://explorer.aurora.dev/address/${address}`;
      case 'BASE':
        return `https://basescan.org/address/${address}`;
      default:
        return `https://etherscan.io/address/${address}`;
    }
  };

  return (
    <>
      {renderNoDataCurrentRankRow(userAddress, topAddress)}
      {topAddress?.map((item: any) => {
        return (
          <tr key={item.address} onMouseEnter={() => handleMouse()} onMouseLeave={() => handleMouse()}>
            <td className={classNames(hoverStyles(), 'text-center')}>
              <HtmlTooltip title={formatStringToNumber(item.rank)} arrow placement="top">
                <span>{formatBigRanking(item.rank)}</span>
              </HtmlTooltip>
            </td>
            <td className={hoverStyles()}>
              <a href={changeScanByNetwork(item.address)} target="_blank" className="link flex items-center">
                <span className="link mr-[4px] mt-[0px]">{item.address ? formatAddress(item.address, 6) : '-'}</span>
              </a>
            </td>
            <td className={classNames('text-center', hoverStyles())}>
              <span className="linear-text">
                {item.reputation_score ? formatStringToNumber(item.reputation_score, 3) : '-'}
              </span>
            </td>
            <td className={classNames('text-center', hoverStyles())}>{item.identity}</td>
            <td className={classNames('text-center', hoverStyles())}>{item.is_contract ? 'Contract' : 'EOA'}</td>
            <td className={classNames('text-center', hoverStyles())}>
              {item.total_txn ? formatTotalVolume(item.total_txn) : '-'}
            </td>
            <td className={classNames('text-center', hoverStyles())}>
              {formatStringToNumber(item.total_gas_spent, 3)}
            </td>
            <td className={classNames('text-center', hoverStyles())}>
              {item.degree ? formatTotalVolume(item.degree) : '-'}
            </td>
            <td className={classNames('text-center', hoverStyles())}>
              {item.total_volume ? `$${formatTotalVolume(item.total_volume)}` : '-'}
            </td>
            <td className={classNames('text-center', hoverStyles())}>
              {/* <span className="text-[#FF7E21]">-</span> */}
              <div className="flex w-full justify-center">
                <a
                  className={classNames('cursor-pointer', !userAddress && 'opacity-[0.3] pointer-events-none')}
                  onClick={() => {
                    toggleFavorite(item.address);
                  }}>
                  <img
                    src={
                      favorites?.indexOf(item?.address?.toLowerCase()) !== -1
                        ? '/assets/images/icons/star-active.svg'
                        : '/assets/images/icons/star.svg'
                    }
                    className={classNames('w-[24px] cursor-pointer')}
                    alt="star"
                  />
                </a>
              </div>
            </td>
            {/*<td className={classNames('text-center', hoverStyles())}>*/}
            {/*  <HtmlTooltip title="Coming soon" arrow placement="top">*/}
            {/*    <BtnFollow sx={{ height: '28px', width: '67px' }} variant="outlined">*/}
            {/*      Follow*/}
            {/*    </BtnFollow>*/}
            {/*  </HtmlTooltip>*/}
            {/*</td>*/}
          </tr>
        );
      })}
    </>
  );
});
