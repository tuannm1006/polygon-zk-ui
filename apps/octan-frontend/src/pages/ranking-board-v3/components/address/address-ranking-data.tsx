import { FC, memo, useEffect, useState } from 'react';
import { DefaultFcProps, RANKING_API_ENDPOINTS } from 'common';
import { toJson } from '@octan/common';
import classnames from 'classnames';
import { BtnFollow, HtmlTooltip } from 'shared-components';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { formatStringToNumber, formatBigRanking, formatAddress, formatTotalVolume, formatRS } from 'utils';
import { useAppContext } from '../../../../contexts';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';

interface Favorite {
  address: string;
}

export const AddressRankingData: FC<DefaultFcProps> = memo(({ filter, searchObj, onDataLoaded, network }) => {
  const [data, setData] = useState<any>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { userAddress } = useAppContext();

  useEffect(() => {
    const getDataAddressRanking = async () => {
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          // page: 1,
          take: filter.pageSize,
          address: '',
          chain_key: network,
          sort: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sort : 'reputation_score',
          order: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sortValue?.toUpperCase() : 'DESC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        const { data, meta } = await fetch(
          `${rankingBasePath}/${RANKING_API_ENDPOINTS.rankingBase}/${RANKING_API_ENDPOINTS.addresses}${
            query ? `?${query}` : ''
          }`,
          {
            ...options,
            method: 'GET',
          }
        ).then(toJson);
        onDataLoaded && onDataLoaded(meta);
        let list = [...data];
        if (searchObj.sort === 'favorite') {
          list = list
            .sort((a: any, b: any) => +b.reputation_score - +a.reputation_score)
            .sort((a: any, b: any) => {
              if (searchObj.sortValue === 'desc') {
                if (
                  favorites.indexOf(b.address?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.address?.toLowerCase()) !== -1
                ) {
                  return 0;
                }
                if (
                  favorites.indexOf(b.address?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.address?.toLowerCase()) === -1
                ) {
                  return 1;
                }
                return -1;
              } else {
                if (
                  favorites.indexOf(b.address?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.address?.toLowerCase()) !== -1
                ) {
                  return 0;
                }
                if (
                  favorites.indexOf(b.address?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.address?.toLowerCase()) === -1
                ) {
                  return -1;
                }
                return 1;
              }
            });
        }

        setData(list);
      } catch (e) {
        console.log(e);
      }
    };

    getDataAddressRanking();
  }, [filter, searchObj, network]);

  useEffect(() => {
    const getFavorites = async () => {
      const { basePath, ...options } = getApiConfig();
      const currentNetwork = checkNetworkForFavPrj(network);

      const result = await fetch(`${basePath}/favorites/addresses?chainKey=${currentNetwork}`, {
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
  }, [userAddress, network]);

  const checkNetworkForFavPrj = (network: string) => {
    let currentNetwork;
    if (network === 'BNB') {
      currentNetwork = 'BSC';
    } else {
      currentNetwork = network;
    }
    return currentNetwork;
  };

  const deleteFavorite = async (address: string) => {
    setFavorites((prev) => prev.filter((item) => item !== address.toLowerCase()));
    const { basePath, ...options } = getApiConfig();
    const currentNetwork = checkNetworkForFavPrj(network);

    await fetch(`${basePath}/favorites/addresses?chainKey=${currentNetwork}&address=${address}`, {
      ...options,
      method: 'DELETE',
    }).then(toJson);
  };

  const createFavorite = async (address: string) => {
    setFavorites((prev) => [...prev, address.toLowerCase()]);
    const { basePath, ...options } = getApiConfig();
    const currentNetwork = checkNetworkForFavPrj(network);

    await fetch(`${basePath}/favorites/addresses`, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify({
        chainKey: currentNetwork,
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

  return (
    <>
      {data.length > 0 ? (
        data?.map((item: any, index: number) => {
          return (
            <AddressRankingDataItem
              key={index}
              item={item}
              index={index}
              userAddress={userAddress}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              network={network}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={10}>
            <div className="flex justify-center m-4 max-[1050px]:pr-[50px] max-[900px]:pr-[100px] max-[800px]:pr-[200px] max-[675px]:pr-[300px] max-[500px]:pr-[400px] max-[450px]:pr-[450px] max-[400px]:pr-[500px] max-[350px]:pr-[550px] max-[300px]:pr-[550px]">
              <CircularProgress />
            </div>
          </td>
        </tr>
      )}
    </>
  );
});

export const AddressRankingDataItem: FC<DefaultFcProps> = memo(
  ({ item, index, userAddress, favorites, toggleFavorite, network }) => {
    const [hoveredRow, setHoveredRow] = useState(-1);

    const hoverStyles = (index: number): string => {
      return index === hoveredRow ? 'bg-hover' : 'tbrow-bg';
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
        case 'NEO':
          return `https://neotube.io/address/${address}`;
        default:
          return `https://etherscan.io/address/${address}`;
      }
    };

    return (
      <>
        <tr key={item.address} onMouseEnter={() => setHoveredRow(index)} onMouseLeave={() => setHoveredRow(-1)}>
          <td className={classNames(hoverStyles(index), 'text-center')}>
            <HtmlTooltip title={formatStringToNumber(item.rank)} arrow placement="top">
              <span>{formatBigRanking(item.rank)}</span>
            </HtmlTooltip>
          </td>
          <td className={hoverStyles(index)}>
            <a href={changeScanByNetwork(item.address)} target="_blank" className="link flex items-center">
              <span className="link mr-[4px] mt-[0px]">{item.address ? formatAddress(item.address, 6) : '-'}</span>
            </a>
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            <span className="linear-text">
              {item.reputation_score ? formatStringToNumber(item.reputation_score, 0) : '-'}
            </span>
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            {item.identity && item.identity !== 'Unknown' && item.identity !== 'Unamed' ? item.identity : '-'}
          </td>
          {network !== 'TRX' && network !== 'XRP' ? (
            <td className={classnames('text-center', hoverStyles(index))}>
              {item.is_contract == true && <div className="justify-items-center">{'Contract'}</div>}
              {item.is_contract == false && <div className="justify-items-center">{'EOA'}</div>}
            </td>
          ) : (
            <td className={classnames('text-center', hoverStyles(index))}>
              <div className="justify-items-center">-</div>
            </td>
          )}
          <td className={classnames('text-center', hoverStyles(index))}>
            {item.total_txn ? formatTotalVolume(Number(item.total_txn)) : '-'}
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            {item.total_gas_spent ? `${formatTotalVolume(Number(item.total_gas_spent))}` : '-'}
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            {item.degree ? formatTotalVolume(Number(item.degree)) : '-'}
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            {item.total_volume ? `$${formatTotalVolume(Number(item.total_volume))}` : '-'}
          </td>
          <td className={classnames('text-center', hoverStyles(index))}>
            {/* <HtmlTooltip title="Coming soon" arrow placement="top">
            <BtnFollow sx={{ height: '28px', width: '67px' }} variant="outlined">
              Follow
            </BtnFollow>
          </HtmlTooltip> */}
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
        </tr>
      </>
    );
  }
);
