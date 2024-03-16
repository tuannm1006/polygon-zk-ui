import { FC, useCallback, useState } from 'react';
import { DefaultFcProps } from 'common';
import { CurrentRankRow } from '../user-ranking-row';
import { AddressRankingData } from './address-ranking-data';
import { SearchInputV2 } from '../search-input-v2';
import { TableHeader } from '../table-header';
import { isAddress } from 'ethers/lib/utils';
import { DataTablePaging } from 'shared-components';
import { formatDateTime } from '../../../../utils';
export type RankingTableProps = DefaultFcProps;

export const RankingTable: FC<RankingTableProps> = ({ userAddress, filter, onSearchChanged, network }) => {
  const [meta, setMeta] = useState<any>();

  console.log('network ::: ', network);
  const [searchObj, setSearchObj] = useState<any>({
    sort: 'reputation_score',
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

  const onDataLoaded = useCallback((meta: any) => {
    setMeta(meta);
  }, []);

  return (
    <div className="table-responsive">
      <div className="flex flex-row search-container gap-3 flex-wrap w-full items-center">
        <SearchInputV2
          value={filter.textSearch}
          onChange={onSearchChanged}
          validateFunc={isAddress}
          network={network}
          invalidMsg="Invalid address format."
          width="490px"
        />
        <div className="flex ml-auto gap-2">
          <div className="text-zinc-500 text-sm font-normal leading-snug">Last updated:</div>
          <div className="text-zinc-900 text-sm font-normal leading-snug">
            {meta && formatDateTime(meta.last_calculated_at)}
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr className="tbrow-bg">
              <th className="w-[48px]">GRS Rank</th>
              <th className="w-[160px]">
                <p className="pl-6">Address</p>
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="GRS"
                  title="Global Reputation Score (GRS) quantitatively measures IMPORTANCE of an account in relations with others entirely on a blockchain. Higher score means more important the account is. RS is computed from onchain transactions via pairwise ranking algorithms, e.g. improved PageRank invented by Octan Labs."
                  onClick={handleSort}
                  field="reputation_score"
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[200px] ">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Identity"
                  title="Name of contracts crawed from public explorers."
                  sortable={false}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Type"
                  title="EOA (External Own Account associated with private key) or contract (no private key)."
                  onClick={handleSort}
                  field="is_contract"
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="TXNs"
                  title="Number of total transactions of the account has according to the processed dataset."
                  field="total_txn"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Gas"
                  title="Total amount of transactional gas the account spent in the processed dataset by native tokens."
                  field="total_gas_spent"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Degree"
                  title="Number of total oriented connections with other acounts. This is obtained from transactions but not included those with same direction (E.G: account X transfers 8 times to account Y but added 1 degree for each)."
                  field="degree"
                  onClick={handleSort}
                  sortKey={searchObj.sort}
                  order={searchObj.sortValue}
                />
              </th>
              <th className="w-[105px]">
                <TableHeader
                  classname="flex justify-center gap-2"
                  name="Total volume"
                  title="Total number of tokens sent and received by the address during the Reputation Score calculation period."
                  field="total_volume"
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
            <CurrentRankRow
              userAddress={userAddress}
              filter={filter}
              searchObj={searchObj}
              network={network}
              onDataLoaded={onDataLoaded}
            />
            <AddressRankingData filter={filter} searchObj={searchObj} onDataLoaded={onDataLoaded} network={network} />
          </tbody>
        </table>
      </div>
      {meta && meta.total_addresses > 0 && (
        <DataTablePaging
          className="mt-6"
          totalRecords={meta.total_addresses}
          currentPage={1}
          pageSize={filter.pageSize}
          showPaging={false}
        />
      )}
    </div>
  );
};
