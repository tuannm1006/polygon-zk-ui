import classNames from 'classnames';
import { DefaultFcProps } from 'common';
import { FC, useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import Expand from 'react-expand-animated';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { toJson } from '@octan/common';
import { formatAddress, formatStringToNumber } from 'utils';
import { mdiOpenInNew } from '@mdi/js';
import Icon from '@mdi/react';
const TronWeb = require('tronweb');
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useMemo } from 'react';

export type AddressRankingProps = DefaultFcProps;

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const NETWORKS = {
  BSC: 'BSC',
  Aurora: 'Aurora',
  BTTC: 'BTTC',
  Polygon: 'Polygon',
  Tron: 'TRX',
  ETH: 'ETH',
  Near: 'Near',
  ARB: 'ARB',
};

const ADDRESS_BASE_URL = {
  BSC: 'https://bscscan.com/address',
  Aurora: 'Aurora',
  BTTC: 'https://bttcscan.com/address',
  Polygon: 'Polygon',
  Tron: 'https://tronscan.org/#/address',
  ETH: 'ETH',
  Near: 'Near',
  ARB: 'https://arbiscan.io/address',
};

const ToggleButtons = [
  {
    value: NETWORKS.BSC,
    label: 'Binance',
    image: '/assets/images/networks/bsc.png',
    title: 'BNB Chain',
    enable: true,
    addressBaseUrl: ADDRESS_BASE_URL.BSC,
  },
  {
    value: NETWORKS.BTTC,
    label: 'BTTC (Tron)',
    image: '/assets/images/networks/bttc.png',
    title: 'BTTC (Tron)',
    enable: true,
    addressBaseUrl: ADDRESS_BASE_URL.BTTC,
  },
  {
    value: NETWORKS.Tron,
    label: 'Tron',
    image: '/assets/images/networks/tron.png',
    title: 'Tron',
    enable: true,
    addressBaseUrl: ADDRESS_BASE_URL.Tron,
  },
  {
    value: NETWORKS.ARB,
    label: 'Arbitrum',
    image: '/assets/images/networks/arbitrum.png',
    title: 'Arbitrum',
    enable: true,
    addressBaseUrl: ADDRESS_BASE_URL.ARB,
  },
  {
    value: NETWORKS.ETH,
    label: 'Ethereum',
    image: '/assets/images/networks/eth.png',
    title: 'Ethereum',
    enable: false,
    addressBaseUrl: ADDRESS_BASE_URL.ETH,
  },
  {
    value: NETWORKS.Polygon,
    label: 'Polygon',
    image: '/assets/images/networks/polygon.png',
    title: 'Polygon',
    enable: false,
    addressBaseUrl: ADDRESS_BASE_URL.Polygon,
  },
];

interface Favorite {
  address: string;
}

export const AddressRanking: FC<AddressRankingProps> = ({
  showMoreFilter,
  filter,
  topAddress,
  userAddress,
  network,
  setNetwork,
}) => {
  const [addressBaseUrl, setAddressBaseUrl] = useState(ADDRESS_BASE_URL.BSC);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [data, setData] = useState<any>([]);

  const [searchObj, setSearchObj] = useState<any>({
    sort: 'reputation_score',
    sortValue: 'desc',
  });

  useEffect(() => {
    const getFavorites = async () => {
      const { basePath, ...options } = getApiConfig();

      const result = await fetch(`${basePath}/favorites?chainKey=${network}`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      console.log('result ===>', result);

      setFavorites(result.map((item: Favorite) => item.address?.toLowerCase()));
    };

    if (userAddress) {
      getFavorites();
    } else {
      setFavorites([]);
    }
  }, [userAddress]);

  const createFavorite = async (address: string) => {
    setFavorites((prev) => [...prev, address.toLowerCase()]);
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites`, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify({
        chainKey: network,
        address,
      }),
    }).then(toJson);
  };

  const deleteFavorite = async (address: string) => {
    setFavorites((prev) => prev.filter((item) => item !== address.toLowerCase()));
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites?chainKey=${network}&address=${address}`, {
      ...options,
      method: 'DELETE',
    }).then(toJson);
  };

  useEffect(() => {
    const getAddressRanking = async () => {
      console.log('address-ranking ---- getAddressRanking');
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          page: 1,
          limit: filter.pageSize,
          address: filter.textSearch || '',
          chain_key: network,
          sort: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sort : 'reputation_score',
          order: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sortValue?.toUpperCase() : 'DESC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        const result = await fetch(`${rankingBasePath}/rankings/addresses${query ? `?${query}` : ''}`, {
          ...options,
          method: 'GET',
        }).then(toJson);

        let list = result.data;
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

    getAddressRanking();
  }, [network, filter, searchObj]);

  const handleSort = (key: string) => {
    // const obj = convertSearchParamsToObject(location.search)
    // let sortValue = 'desc'
    // if (searchObj.sort === key && searchObj.sortValue === 'desc') {
    //   sortValue = 'asc'
    // }

    setSearchObj((prev: any) => ({
      ...prev,
      sort: key,
      sortValue: prev.sort === key && prev.sortValue === 'desc' ? 'asc' : 'desc',
    }));

    // navigate(`${location.pathname}${convertObjectToSearchParams({...obj, sort: key, sortValue})}`, { replace: true })
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
    <div>
      <Expand open={showMoreFilter} duration={300}>
        <div className="flex items-center flex-wrap mx-[-8px] pb-[20px] lg:pb-[40px] border-b-[1px] border-gray">
          {ToggleButtons.map((item) => (
            <div
              className={classNames(
                'bg-select p-[1px] h-[40px] mx-[8px] my-[6px] rounded-[32px] flex items-center overflow-hidden',
                network === item.value && 'linear-bg'
              )}
              key={item.value}>
              <a
                className={classNames(
                  'flex items-center cursor-pointer h-[38px] px-[16px] bg-select rounded-[32px] overflow-hidden',
                  !item.enable && 'pointer-events-none opacity-50'
                )}
                key={item.value}
                onClick={() => {
                  setNetwork(item.value);
                  setAddressBaseUrl(item.addressBaseUrl);
                }}>
                <img src={item.image} alt="img" className="w-[24px] h-[24px] cover mr-[16px]" />

                <span
                  className={classNames('text-[18px] font-medium text-white', network === item.value && 'linear-text')}>
                  {item.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </Expand>

      <div className="table-responsive">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Adress</th>
              <th className="w-[200px]">
                <div
                  className="flex items-start"
                  onClick={() => {
                    handleSort('reputation_score');
                  }}>
                  Global RS
                  <div className="ml-[6px] flex-col pointer-cursor mr-[8px] items-start">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'reputation_score' && searchObj?.sortValue === 'asc' && 'sort-icon-active'
                      )}
                      style={{ transform: 'rotate(180deg)' }}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'reputation_score' && searchObj?.sortValue === 'desc' && 'sort-icon-active'
                      )}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                  </div>
                  <Tooltip
                    title="Global Reputation Score (GRS) quantitatively measures IMPORTANCE of an account in relations with others entirely on a blockchain. Higher score means more important the account is. RS is computed from onchain transactions via pairwise ranking algorithms, e.g. improved PageRank invented by Octan Labs."
                    arrow
                    placement="top">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="info-icon">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 3a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2V8a1 1 0 0 0-1-1h-1Z"></path>
                    </svg>
                  </Tooltip>
                </div>
              </th>
              <th className="w-[261px]">
                <div className="flex items-start">
                  Identity
                  <Tooltip title="Name of contracts crawed from public explorers." arrow placement="top">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="info-icon">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 3a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2V8a1 1 0 0 0-1-1h-1Z"></path>
                    </svg>
                  </Tooltip>
                </div>
              </th>
              <th className="w-[230px]">
                <div
                  className="flex items-start"
                  onClick={() => {
                    handleSort('total_degree');
                  }}>
                  Total Degree
                  <div className="ml-[6px] flex-col pointer-cursor mr-[8px] items-start">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'total_degree' && searchObj?.sortValue === 'asc' && 'sort-icon-active'
                      )}
                      style={{ transform: 'rotate(180deg)' }}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'total_degree' && searchObj?.sortValue === 'desc' && 'sort-icon-active'
                      )}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                  </div>
                  <Tooltip
                    title="Number of total oriented connections with other acounts. This is obtained from transactions but not included those with same direction (E.G: account X transfers 8 times to account Y but added 1 degree for each)."
                    arrow
                    placement="top">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className={'info-icon'}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 3a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2V8a1 1 0 0 0-1-1h-1Z"></path>
                    </svg>
                  </Tooltip>
                </div>
              </th>
              <th className="w-[240px]">
                <div
                  className="flex items-start"
                  onClick={() => {
                    handleSort('total_gas_spent');
                  }}>
                  Total Gas Spent
                  <div className="ml-[6px] flex-col pointer-cursor mr-[8px] items-start">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'total_gas_spent' && searchObj?.sortValue === 'asc' && 'sort-icon-active'
                      )}
                      style={{ transform: 'rotate(180deg)' }}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'total_gas_spent' && searchObj?.sortValue === 'desc' && 'sort-icon-active'
                      )}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                  </div>
                  <Tooltip
                    title="Total amount of transactional gas the account spent in the processed dataset."
                    arrow
                    placement="top">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className={'info-icon'}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 3a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2V8a1 1 0 0 0-1-1h-1Z"></path>
                    </svg>
                  </Tooltip>
                </div>
              </th>
              <th className="w-[240px]">
                <div
                  className="flex items-start"
                  // onClick={() => {
                  //   handleSort('total_transactions')
                  // }}
                >
                  Total Transaction
                  {/* <div className='ml-[6px] flex-col pointer-cursor mr-[8px] items-start'>
                  <svg width="10px" height="10px" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg"
                    className={classNames("sort-icon", searchObj?.sort === 'total_transactions' && searchObj?.sortValue === 'asc' && 'sort-icon-active')}
                    style={{transform: 'rotate(180deg)'}}><path fillRule="evenodd" clipRule="evenodd" d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path></svg>
                  <svg width="10px" height="10px" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg"
                  className={classNames("sort-icon", searchObj?.sort === 'total_transactions' && searchObj?.sortValue === 'desc' && 'sort-icon-active')}
                  ><path fillRule="evenodd" clipRule="evenodd" d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path></svg>
                </div> */}
                  <Tooltip
                    title="Number of total transactions of the account has according to the processed dataset."
                    arrow
                    placement="top">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className={'info-icon'}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 3a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2V8a1 1 0 0 0-1-1h-1Z"></path>
                    </svg>
                  </Tooltip>
                </div>
              </th>
              <th>
                <div
                  className="flex items-start"
                  onClick={() => {
                    handleSort('favorite');
                  }}>
                  Favorite
                  <div className="ml-[6px] flex-col pointer-cursor mr-[8px] items-start">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'favorite' && searchObj?.sortValue === 'asc' && 'sort-icon-active'
                      )}
                      style={{ transform: 'rotate(180deg)' }}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 11 6"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classNames(
                        'sort-icon',
                        searchObj?.sort === 'favorite' && searchObj?.sortValue === 'desc' && 'sort-icon-active'
                      )}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.793.293a1 1 0 0 1 1.414 0L5.5 3.586 8.793.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"></path>
                    </svg>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {topAddress?.map((item: any) => (
              <tr key={item.address} className="tbrow-hightlight">
                <td>{formatStringToNumber(item.top_number)}</td>
                <td>
                  <a
                    href={`${addressBaseUrl}/${
                      network == NETWORKS.Tron ? tronWeb.address.fromHex(item.address) : item.address
                    }`}
                    target="_blank"
                    className="link flex itens-center">
                    <span className="link mr-[4px] mt-[0px]">
                      {formatAddress(
                        network == NETWORKS.Tron ? tronWeb.address.fromHex(item.address) : item.address,
                        6
                      )}
                    </span>

                    <Icon path={mdiOpenInNew} size={0.7} color="#16FFD5" />
                  </a>
                </td>
                <td>
                  <span className="linear-text">{formatStringToNumber(item.reputation_score, 3)}</span>
                </td>
                <td>{item.identity}</td>
                <td>{formatStringToNumber(item.total_degree, 3)}</td>
                <td>{formatStringToNumber(item.total_gas_spent, 3)}</td>
                <td>{formatStringToNumber(item.total_transactions, 3)}</td>
                <td>
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
                </td>
              </tr>
            ))} */}
            {data?.map((item: any) => (
              <tr key={item.address}>
                <td>{formatStringToNumber(item.top_number)}</td>
                <td>
                  <a
                    href={`${addressBaseUrl}/${
                      network == NETWORKS.Tron ? tronWeb.address.fromHex(item.address) : item.address
                    }`}
                    target="_blank"
                    className="link flex itens-center">
                    <span className="link mr-[4px] mt-[0px]">{formatAddress(item.address, 6)}</span>

                    <Icon path={mdiOpenInNew} size={0.7} color="#16FFD5" />
                  </a>
                </td>
                <td>
                  <span className="linear-text">{formatStringToNumber(item.reputation_score, 3)}</span>
                </td>
                <td>{item.identity}</td>
                <td>{formatStringToNumber(item.total_degree, 3)}</td>
                <td>{formatStringToNumber(item.total_gas_spent, 3)}</td>
                <td>{formatStringToNumber(item.total_transactions, 3)}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressRanking;
