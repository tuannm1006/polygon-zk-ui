import { FC, useCallback, useState } from 'react';
import { DefaultFcProps, SBTOwnerCategory, SBT_OWNERS_CATEGORIES } from 'common';
import { SbtOwnersRankingData } from './sbt-owners-ranking-data';
import { SearchInputV2 } from '../search-input-v2';
import { TableHeader } from '../table-header';
import { DataTablePaging } from 'shared-components';
import { SbtOwnersCurrentRankRow } from './sbt-owners-current-rank-row';
import { formatDateTime } from '../../../../utils';

export type RankingTableProps = DefaultFcProps;

export const SbtOwnersRankingTable: FC<RankingTableProps> = ({ filter, onSearchChanged, onPageChanged, category }) => {
  const [meta, setMeta] = useState<any>();
  const [lastUpdated,setLastUpdated] = useState<string>("");

  const [searchObj, setSearchObj] = useState<any>({
    sort: 'user_reputation_score',
    sortValue: 'desc',
  });

  const handleSort = (key: string, order: string) => {
    setSearchObj((prev: any) => ({
      ...prev,
      sort: key,
      sortValue: order,
    }));

    // navigate(`${location.pathname}${convertObjectToSearchParams({...obj, sort: key, sortValue})}`, { replace: true })
  };

  // const onScroll = (e: any) => {
  //   // console.log(e);
  // };

  const onDataLoaded = useCallback((meta: any, lastUpdatedAt: string) => {
    setMeta(meta);
    setLastUpdated(lastUpdatedAt)
  }, []);

  const renderRsCol = (category: string) => {
    const cat = SBT_OWNERS_CATEGORIES[category];
    return (
      <TableHeader
        classname="flex justify-center gap-2"
        name={cat.colName}
        title={cat.colTitle}
        onClick={handleSort}
        field="user_reputation_score"
        sortKey={searchObj.sort}
        order={searchObj.sortValue}
      />
    );
  };

  return (
    <div className="table-responsive">
      <div className="flex flex-row search-container gap-3 flex-wrap w-full items-center">
        <SearchInputV2 value={filter.username} onChange={onSearchChanged} width="440px" />
        <div className="flex ml-auto gap-2">
          <div className="text-zinc-500 text-sm font-normal leading-snug">Last updated:</div>
          <div className="text-zinc-900 text-sm font-normal leading-snug">{lastUpdated.length > 0 && formatDateTime(lastUpdated)}</div>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="w-[48px]">#</th>
              <th className="w-[144px]">Username</th>
              <th className="w-[136px]">{renderRsCol(category)}</th>
              {/* <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Connection"
                  title="Number of connections with other SBT owner"
                  sortable={false}
                />
              </th>
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Connection GRS"
                  title="Total Global Reputation Score of all connections"
                  sortable={false}
                  // onClick={handleSort}
                  field="type"
                  // sortKey={searchObj.sort}
                  // order={searchObj.sortValue}
                />
              </th> */}
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total TXN"
                  title="Number of total transactions of all sbt owner's wallets has according to the processed dataset"
                  field="user_total_transactions"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Gas"
                  title="Total amount of transactional gas of all sbt owner's wallets spent in the processed dataset"
                  field="user_total_gas_spent"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Degree"
                  title="Number of total oriented connections between all sbt owner's wallets and other acounts"
                  field="user_total_degree"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total Volume"
                  title="Total amount of tokens sent and received by all wallets of users owning Octan SBT during the Reputation Score calculation period."
                  field="tx_volume"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              {/* <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Follower GRS"
                  title="Number of total global reputation score of account's followers."
                  sortable={false}
                />
              </th> */}
              <th className="w-[136px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Favorite"
                  title="Favorite"
                  field="favorite"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <SbtOwnersCurrentRankRow username={filter.username} searchAddress={filter.textSearch} />
            <SbtOwnersRankingData
              category={category}
              filter={filter}
              searchObj={searchObj}
              onDataLoaded={onDataLoaded}
            />
          </tbody>
        </table>
      </div>
      {meta && meta.itemCount > 0 && (
        <DataTablePaging
          className="mt-6"
          totalRecords={meta.itemCount}
          currentPage={1}
          pageSize={filter.pageSize}
          onPageChanged={onPageChanged}
        />
      )}
    </div>
  );
};
