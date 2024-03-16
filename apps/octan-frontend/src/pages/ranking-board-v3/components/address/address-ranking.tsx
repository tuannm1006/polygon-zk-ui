import { DefaultFcProps, NETWORKS } from 'common';
import { FC, useState } from 'react';
import Expand from 'react-expand-animated';
import { RankingTable } from './address-ranking-table';
import { NetworksList } from '../network-list';

export type AddressRankingProps = DefaultFcProps;

export const AddressRanking: FC<AddressRankingProps> = ({
  filter,
  topAddress,
  userAddress,
  onSearchChanged,
  onPageChanged,
}) => {
  const [network, setNetwork] = useState(NETWORKS.ETH);

  // console.log('Address Ranking --- network  ::: ', network);
  return (
    <div>
      <Expand open={true} duration={300}>
        <NetworksList onNetworkSelected={setNetwork} selected={network} isAddressTab onPageChanged={onPageChanged} />
      </Expand>
      <RankingTable
        userAddress={userAddress}
        filter={filter}
        topAddress={topAddress}
        onSearchChanged={onSearchChanged}
        network={network}
      />
    </div>
  );
};

export default AddressRanking;
