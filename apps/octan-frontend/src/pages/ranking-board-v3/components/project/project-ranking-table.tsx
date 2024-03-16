import { FC, useState, useEffect, useLayoutEffect } from 'react';
import { DefaultFcProps, RANKING_API_ENDPOINTS } from 'common';
import { DataTablePaging, InfoIcon, SortIcon } from 'shared-components';
import { ProjectRankingData } from './project-ranking-data';
import { SearchInputV2 } from '../search-input-v2';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { toJson } from '@octan/common';
import { TableHeader } from '../table-header';
import { formatDateTime } from '../../../../utils';
import { useAppContext } from '../../../../contexts';

export type RankingTableProps = DefaultFcProps;

interface ProjectFavorite {
  projectId: string;
}

export const ProjectRankingTable: FC<RankingTableProps> = ({
  filter,
  onSearchChanged,
  category,
  onPageChanged,
  network,
}) => {
  const [searchObj, setSearchObj] = useState<any>({
    sort: 'total_grs',
    sortValue: 'desc',
  });

  const [data, setData] = useState<any>([]);
  const [meta, setMeta] = useState<any>();
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number>(-1);

  const { userAddress } = useAppContext();

  // console.log('favorite ::: ', favorites)
  useLayoutEffect(() => {
    if (countdown <= 0) return;
    const handler = setTimeout(() => {
      setCountdown((val) => {
        return val - 1;
      });
    }, 1000);

    return () => clearTimeout(handler);
  }, [countdown]);

  useEffect(() => {
    const getProjectRankingData = async () => {
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        const optionParams = {
          page: filter.page,
          chain_key: network,
          take: filter.pageSize,
          keyword: filter.project,
          category: category,
          sort: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sort : 'total_grs',
          order: searchObj.sort && searchObj.sort !== 'favorite' ? searchObj.sortValue?.toUpperCase() : 'DESC',
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        setCountdown(3);
        const { data, meta } = await fetch(
          `${rankingBasePath}/${RANKING_API_ENDPOINTS.rankingBase}/${RANKING_API_ENDPOINTS.projects}${
            query ? `?${query}` : ''
          }`,
          {
            ...options,
            method: 'GET',
          }
        ).then(toJson);

        let list = [...data];
        if (searchObj.sort === 'favorite') {
          list = list
            .sort((a: any, b: any) => +b.reputation_score - +a.reputation_score)
            .sort((a: any, b: any) => {
              if (searchObj.sortValue === 'desc') {
                if (favorites.indexOf(b.project_id) !== -1 && favorites.indexOf(a.project_id) !== -1) {
                  return 0;
                }
                if (favorites.indexOf(b.project_id) !== -1 && favorites.indexOf(a.project_id) === -1) {
                  return 1;
                }
                return -1;
              } else {
                if (favorites.indexOf(b.project_id) !== -1 && favorites.indexOf(a.project_id) !== -1) {
                  return 0;
                }
                if (favorites.indexOf(b.project_id) !== -1 && favorites.indexOf(a.project_id) === -1) {
                  return -1;
                }
                return 1;
              }
            });
        }

        setData(list);
        setMeta(meta);
        setLastUpdated(meta.last_calculated_at.split(' ')[0]);
      } catch (e) {
        setData([]);
        console.log(e);
      }
    };

    void getProjectRankingData();
  }, [filter, searchObj, category, network]);

  useEffect(() => {
    const getFavorites = async () => {
      const { basePath, ...options } = getApiConfig();
      const currentNetwork = checkNetworkForFavPrj(network);

      const result = await fetch(`${basePath}/favorites/projects?chainKey=${currentNetwork}`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      setFavorites(result.map((item: ProjectFavorite) => item.projectId));
    };

    if (userAddress) {
      void getFavorites();
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

  const deleteFavorite = async (projectId: string) => {
    const currentNetwork = checkNetworkForFavPrj(network);
    setFavorites((prev) => prev.filter((item) => item !== projectId));
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/projects?chainKey=${currentNetwork}&projectId=${projectId}`, {
      ...options,
      method: 'DELETE',
    }).then(toJson);
  };

  const createFavorite = async (projectId: string) => {
    const currentNetwork = checkNetworkForFavPrj(network);
    setFavorites((prev) => [...prev, projectId]);
    const { basePath, ...options } = getApiConfig();

    await fetch(`${basePath}/favorites/projects`, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify({
        chainKey: currentNetwork,
        projectId,
      }),
    }).then(toJson);
  };

  const toggleFavorite = (projectId: string) => {
    if (!projectId) {
      return;
    }
    if (favorites.indexOf(projectId) !== -1) {
      deleteFavorite(projectId);
    } else {
      createFavorite(projectId);
    }
  };

  const handleSort = (key: string, order: string) => {
    setSearchObj((prev: any) => ({
      ...prev,
      sort: key,
      sortValue: order,
    }));
  };

  return (
    <div className="table-responsive">
      <div className="flex flex-row search-container gap-3 flex-wrap w-full items-center">
        <SearchInputV2 value={filter.project} onChange={onSearchChanged} width="440px" />
        <div className="flex ml-auto gap-2">
          <div className="text-zinc-500 text-sm font-normal leading-snug">Last updated:</div>
          <div className="text-zinc-900 text-sm font-normal leading-snug">
            {meta && formatDateTime(meta.last_calculated_at)}
          </div>
          {/* <div className="text-zinc-900 text-sm font-normal leading-snug">{lastUpdated && lastUpdated.length > 0 && formatDateTime(lastUpdated)}</div> */}
        </div>
      </div>
      <div className="table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="min-w-[48px] w-[49px]">#</th>
              <th className="w-[168px]">
                <p className="pl-2">Project name</p>
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total GRS"
                  title="Total global reputation score of all holders of project's contracts."
                  field="total_grs"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[200px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total TXN"
                  title="Number of all holders of project's contract."
                  field="total_txn"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Gas"
                  field="total_gas"
                  title="Total value of assets in dapp's smart contracts."
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Degree"
                  field="total_degree"
                  title="Total amount of incoming value to dapp's smart contracts."
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Tx Volume"
                  field="total_tx_volume"
                  title="Total amount of tokens sent and received of all project contracts during the Reputation Score calculation period."
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Favorite"
                  title="Mark as favorites so you can save objects of interest. Only valid when wallet is connected."
                  field="favorite"
                  onClick={userAddress && handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <ProjectRankingData
              data={data}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              userAddress={userAddress}
              filter={filter}
              count={countdown}
            />
          </tbody>
        </table>
      </div>
      {meta && meta.pageCount > 0 && (
        <DataTablePaging
          className="mt-6"
          totalRecords={meta.totalCount}
          totalPages={meta.pageCount}
          currentPage={meta.page}
          pageSize={meta.take}
          onPageChanged={onPageChanged}
        />
      )}
    </div>
  );
};
