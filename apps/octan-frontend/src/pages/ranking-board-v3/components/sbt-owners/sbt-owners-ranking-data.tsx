import { FC, memo, useEffect, useState } from 'react';
import { DefaultFcProps, RANKING_API_ENDPOINTS } from 'common';
import { toJson } from '@octan/common';
import classnames from 'classnames';
import { BtnFollow, HtmlTooltip } from 'shared-components';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { formatStringToNumber } from 'utils';
import classNames from 'classnames';
import { useAppContext } from '../../../../contexts';

interface Favorite {
  sbtOwnerId: string;
}

const network = 'BSC'

export const SbtOwnersRankingData: FC<DefaultFcProps> = memo(({ filter, category, searchObj, onDataLoaded }) => {
  const [data, setData] = useState<any>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const {userAddress} = useAppContext()
  useEffect(() => {
    const getDataSbtOwnerRanking = async () => {
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          page: 1,
          limit: filter.pageSize,
          rs_type: category,
          address: '',
          chain_key: 'BSC',
          sort: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sort : 'user_reputation_score',
          order: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sortValue?.toUpperCase() : 'DESC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        const { data, meta, lastUpdated } = await fetch(
          `${rankingBasePath}/${RANKING_API_ENDPOINTS.rankingBase}/${RANKING_API_ENDPOINTS.sbtOwners}${
            query ? `?${query}` : ''
          }`,
          {
            ...options,
            method: 'GET',
          }
        ).then(toJson);

        onDataLoaded && onDataLoaded(meta, lastUpdated);
        let list = [ ...data ];
        if (searchObj.sort === 'favorite') {
          list = list
            .sort((a: any, b: any) => +b.reputation_score - +a.reputation_score)
            .sort((a: any, b: any) => {
              if (searchObj.sortValue === 'desc') {
                if (
                  favorites.indexOf(b.user_id?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.user_id?.toLowerCase()) !== -1
                ) {
                  return 0;
                }
                if (
                  favorites.indexOf(b.user_id?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.user_id?.toLowerCase()) === -1
                ) {
                  return 1;
                }
                return -1;
              } else {
                if (
                  favorites.indexOf(b.user_id?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.user_id?.toLowerCase()) !== -1
                ) {
                  return 0;
                }
                if (
                  favorites.indexOf(b.user_id?.toLowerCase()) !== -1 &&
                  favorites.indexOf(a.user_id?.toLowerCase()) === -1
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

    void getDataSbtOwnerRanking();
  }, [filter, searchObj, category]);

  useEffect(() => {
    const getFavorites = async () => {
      const { basePath, ...options } = getApiConfig();

      const result = await fetch(`${basePath}/favorites/sbt-owners?chainKey=${network}`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      setFavorites(result.map((item: Favorite) => item.sbtOwnerId?.toLowerCase()));
    };
    if (userAddress) {
      void getFavorites();
    } else {
      setFavorites([]);
    }
  }, [userAddress]);

  const deleteFavorite = async (sbtOwnerId: string) => {
    setFavorites((prev) => prev.filter((item) => item !== sbtOwnerId.toLowerCase()));
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/sbt-owners?chainKey=${network}&sbtOwnerId=${sbtOwnerId}`, {
      ...options,
      method: 'DELETE',
    }).then(toJson);
  };

  const createFavorite = async (sbtOwnerId: string) => {
    setFavorites((prev) => [...prev, sbtOwnerId.toLowerCase()]);
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/sbt-owners`, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify({
        chainKey: network,
        sbtOwnerId,
      }),
    }).then(toJson);
  };

  const toggleFavorite = (sbtOwnerId: string) => {
    if (!sbtOwnerId) {
      return;
    }
    if (favorites?.indexOf(sbtOwnerId?.toLowerCase()) !== -1) {
      deleteFavorite(sbtOwnerId);
    } else {
      createFavorite(sbtOwnerId);
    }
  };

  return (
    <>
      {data?.map((item: any, index: number) => {
        return <SbtOwnersRankingDataItem key={index} item={item} index={index} userAddress={userAddress} favorites={favorites} toggleFavorite={toggleFavorite} />;
      })}
    </>
  );
});

export const SbtOwnersRankingDataItem: FC<DefaultFcProps> = memo(({ item, index, userAddress, favorites, toggleFavorite }) => {
  const [hoveredRow, setHoveredRow] = useState(-1);

  const hoverStyles = (index: number): string => {
    return index === hoveredRow ? 'bg-hover' : 'bg-grey';
  };

  return (
    <>
      <tr key={item.address} onMouseEnter={() => setHoveredRow(index)} onMouseLeave={() => setHoveredRow(-1)}>
        <td className={hoverStyles(index)}>
          {/* <HtmlTooltip title={formatStringToNumber(item.top_number)} arrow placement="top">
            <span>{formatBigRanking(item.top_number)}</span>
          </HtmlTooltip> */}

          {/* <span>{item.rank}</span> */}
          <span>{index + 1}</span>
        </td>
        <td className={hoverStyles(index)}>
          <div className="flex flex-row gap-3">
            <img src={item.avatar} className="rounded-[100px] w-6 h-6" />
            <span className="link mr-[4px] mt-[0px]">{item.username}</span>
          </div>
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          <span className="linear-text">{formatStringToNumber(item.user_reputation_score, 3)}</span>
        </td>
        {/* <td className={classnames('text-center', hoverStyles(index))}>
          <span className={classnames(item.connection ? 'text-black' : 'text-[#FF7E21]')}>
            {item.connection || '-'}
          </span>
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          <span className={classnames(item.connection_grs ? 'text-black' : 'text-[#FF7E21]')}>
            {item.connection_grs || '-'}
          </span>
        </td> */}
        <td className={classnames('text-center', hoverStyles(index))}>
          {formatStringToNumber(item.user_total_transactions, 3)}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {formatStringToNumber(item.user_total_gas_spent, 3)}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {formatStringToNumber(item.user_total_degree, 3)}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {/*<span className="text-[#FF7E21]">-</span>*/}
            {formatStringToNumber(item.tx_volume, 3)}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {/* <HtmlTooltip title="Coming soon" arrow placement="top">
            <BtnFollow sx={{ height: '28px', width: '79px' }} variant="outlined">
              Connect
            </BtnFollow>
          </HtmlTooltip> */}

          <div className="flex w-full justify-center">
            <a
              className={classNames('cursor-pointer', !userAddress && 'opacity-[0.3] pointer-events-none')}
              onClick={() => {
                toggleFavorite(item.user_id);
              }}>
              <img
                src={
                  item?.user_id && favorites?.indexOf(item?.user_id?.toLowerCase()) !== -1
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
});
