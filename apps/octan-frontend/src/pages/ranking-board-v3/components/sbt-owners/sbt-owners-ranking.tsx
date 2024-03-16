import { DefaultFcProps, NETWORKS, SBT_OWNERS_CATEGORIES } from 'common';
import { FC, useState } from 'react';
import Expand from 'react-expand-animated';
import { SbtOwnersRankingTable } from './sbt-owners-ranking-table';
import { NetworksList } from '../network-list';
import { OctanTabs, OctanTab } from 'shared-components';

export type AddressRankingProps = DefaultFcProps;

export const SbtOwnersRanking: FC<AddressRankingProps> = ({
  filter,
  topAddress,
  username,
  onSearchChanged,
  onPageChanged,
}) => {
  const [network, setNetwork] = useState(NETWORKS.BSC);
  const [tab, setTab] = useState(SBT_OWNERS_CATEGORIES.global_rs.value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div>
      <Expand open={true} duration={300}>
        <NetworksList onNetworkSelected={setNetwork} selected={network} />
      </Expand>
      {/* <OctanTabs value={tab} onChange={handleChange} aria-label="ant example">
        {Object.values(SBT_OWNERS_CATEGORIES).map((category) => {
          return <OctanTab label={category.label} value={category.value} />;
        })}
      </OctanTabs> */}
      <SbtOwnersRankingTable
        username={username}
        filter={filter}
        topAddress={topAddress}
        onSearchChanged={onSearchChanged}
        onPageChanged={onPageChanged}
        category={tab}
      />
    </div>
  );
};

export default SbtOwnersRanking;
