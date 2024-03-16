import { DefaultFcProps, NETWORKS } from 'common';
import { FC, useState } from 'react';
import Expand from 'react-expand-animated';
import { NetworksList } from '../network-list';
import { OctanTab, OctanTabs } from 'shared-components';
import { ProjectRankingTable } from './project-ranking-table';

export type ProjectRankingProps = DefaultFcProps;

export const ProjectRanking: FC<ProjectRankingProps> = ({ filter, onSearchChanged, onPageChanged }) => {
  const [network, setNetwork] = useState(NETWORKS.ETH);
  const [tab, setTab] = useState('All');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onPageChanged(1);
    setTab(newValue);
  };

  return (
    <div>
      <Expand open={true} duration={300}>
        <NetworksList onNetworkSelected={setNetwork} onPageChanged={onPageChanged} selected={network} isProjectTab />
      </Expand>
      <OctanTabs value={tab} onChange={handleChange} aria-label="ant example">
        <OctanTab label="All categories" value="All" />
        <OctanTab label="DeFi" value="DeFi" />
        <OctanTab label="GameFi" value="GameFi" />
        <OctanTab label="SocialFi" value="SocialFi" />
        <OctanTab label="NFT" value="NFT" />
        <OctanTab label="L2s" value="L2s" />
        <OctanTab label="DAO" value="DAO" />
      </OctanTabs>
      <ProjectRankingTable
        filter={filter}
        category={tab}
        onSearchChanged={onSearchChanged}
        onPageChanged={onPageChanged}
        network={network}
      />
    </div>
  );
};

export default ProjectRanking;
