import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DefaultFcProps } from 'common';
import { FC, useState } from 'react';
import { Panel } from 'shared-components';
import { REPUTATION_RANKING_BASE_PATH } from 'consts';
import auroraRankingScore from './data/aurora_reputation_ranking_top100.json';
import bscRankingScore from './data/bsc_reputation_ranking_top100.json';
import bttcRankingScore from './data/bttc_reptation_ranking_top100.json';
import etherRankingScore from './data/ethereum_reputation_ranking_top100.json';
import nearRankingScore from './data/near_reputation_ranking_top100.json';
import polygonRankingScore from './data/polygon_reputation_ranking_top100.json';
import tronRankingScore from './data/tron_reputation_ranking_top100.json';

import './ranking-board.scss';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: '12px',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '32px !important',
  borderColor: 'transparent',
  color: '#A8AEBA',
  background: '#151516',
  fontSize: theme.breakpoints.down('md') ? '14px' : '18px',
  textTransform: 'capitalize',
  margin: '0 !important',
  padding: '16px',

  '&.Mui-selected': {
    color: '#fff',
    borderColor: '#fff !important',
  },
}));

const StyledTableCell = styled(TableCell)({
  backgroundColor: '#000',
  color: '#A8AEBA',
  paddingBlock: '40px',
});

export type RankingBoardOldProps = DefaultFcProps;

const DummyTable = () => (
  <>
    {[1, 2, 3].map((no, index) => (
      <div key={index} className="flex flex-row justify-between gap-3">
        <div className="flex-shrink flex gap-2 items-center">
          <img src="/assets/images/ad.svg" alt="ad" />
          <img className="w-[32px] h-[32px]" src="/assets/images/logos/coin98.png" alt="logo" />
        </div>
        <div className="items-center">
          <span className="font-bold text-white">Coin98</span>
        </div>
        <div className="items-center">
          <span className="">VN</span>
        </div>
        <div className="items-center">
          <span className="linear-text font-bold">1000</span>
        </div>
      </div>
    ))}
  </>
);

enum NETWORKS {
  BSC,
  Aurora,
  BTTC,
  Polygon,
  Tron,
  ETH,
  Near,
}

const ToggleButtons = [
  {
    value: NETWORKS.BSC,
    label: 'Binance',
    image: '/assets/images/networks/bsc.png',
    title: 'BSC',
  },
  {
    value: NETWORKS.Aurora,
    label: 'Aurora (Near)',
    image: '/assets/images/networks/aurora.png',
    title: 'Aurora (Near)',
  },
  {
    value: NETWORKS.BTTC,
    label: 'BTTC (Tron)',
    image: '/assets/images/networks/bttc.png',
    title: 'BTTC (Tron)',
  },
  {
    value: NETWORKS.Polygon,
    label: 'Polygon',
    image: '/assets/images/networks/polygon.png',
    title: 'Polygon',
  },
  {
    value: NETWORKS.Tron,
    label: 'Tron',
    image: '/assets/images/networks/tron.png',
    title: 'Tron',
  },
  {
    value: NETWORKS.ETH,
    label: 'Ethereum',
    image: '/assets/images/networks/eth.png',
    title: 'Ethereum',
  },
  {
    value: NETWORKS.Near,
    label: 'Near',
    image: '/assets/images/networks/near.png',
    title: 'Near',
  },
];

const ReputationTable = ({ network }: any) => {
  let rows: any[] = [];
  let path = REPUTATION_RANKING_BASE_PATH;
  let scanPath: string;

  switch (network) {
    case NETWORKS.BSC:
      path += 'bsc_reputation_ranking.csv';
      rows = bscRankingScore;
      scanPath = 'https://bscscan.com/address/';
      break;
    case NETWORKS.Aurora:
      path += 'aurora_reputation_ranking.csv';
      rows = auroraRankingScore;
      scanPath = 'https://aurorascan.dev/address/';
      break;
    case NETWORKS.BTTC:
      path += 'bttc_reputation_ranking.csv';
      rows = bttcRankingScore;
      scanPath = 'https://bttcscan.com/address/';
      break;
    case NETWORKS.Polygon:
      path += 'polygon_reputation_ranking.csv';
      rows = polygonRankingScore;
      scanPath = 'https://polygonscan.com/address/';
      break;
    case NETWORKS.Tron:
      path += 'tron_reputation_ranking.csv';
      rows = tronRankingScore;
      scanPath = 'https://tronscan.org/#/address/';
      break;
    case NETWORKS.ETH:
      path += 'ether_reputation_ranking.csv';
      rows = etherRankingScore;
      scanPath = 'https://etherscan.io/address/';
      break;
    case NETWORKS.Near:
      path += 'near_reputation_ranking.csv';
      rows = nearRankingScore;
      scanPath = 'https://nearscan.org/accounts/';
      break;

    default:
      break;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 720 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Identity</StyledTableCell>
              <StyledTableCell>
                <div className="linear-text">Reputation Score</div>
              </StyledTableCell>
              <StyledTableCell>Total transactions</StyledTableCell>
              <StyledTableCell>In Transactions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row.No} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell>{row.No}</StyledTableCell>
                <StyledTableCell>
                  <a href={`${scanPath}${row.Address}`} target="_blank">
                    {row.Address}
                  </a>
                </StyledTableCell>
                <StyledTableCell>{row.Identity}</StyledTableCell>
                <StyledTableCell>
                  <div className="linear-text">{Number(row.ReputationScore).toFixed(6)}</div>
                </StyledTableCell>
                <StyledTableCell>{row.TotalTransactions}</StyledTableCell>
                <StyledTableCell>{row.InTransactions}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end mt-6">
        <a href={path} download className="hover:underline hover:text-white">
          Download full data
        </a>
      </div>
    </>
  );
};

export const RankingBoardOld: FC<RankingBoardOldProps> = () => {
  const [network, setNetwork] = useState(NETWORKS.BSC);

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextNetwork: NETWORKS) => {
    setNetwork(nextNetwork);
  };

  return (
    <div className="ranking-board-page">
      <section className="section-banner h-[554px] bg-[#08062B]"></section>

      <Container className="app-content my-[85px]" maxWidth="xl">
        <div className="text-center mb-[45px]">
          <span className="linear-text text-[24px] font-bold">Monthly Highlight</span>
        </div>

        <div className="flex gap-6 mb-[45px]">
          <Panel className="p-[27px] h-[244px] w-1/3">
            <h2 className="text-[20px] text-white font-bold mb-6">Communities</h2>
            <div className="flex flex-col gap-4">
              <DummyTable />
            </div>
          </Panel>

          <Panel className="p-[27px] h-[244px] w-1/3">
            <h2 className="text-[20px] text-white font-bold mb-6">GameFi</h2>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex flex-row justify-between gap-3">
                  <div className="flex-shrink flex gap-2 items-center">
                    <img src="/assets/images/ad.svg" alt="ad" />
                    <img className="w-[32px] h-[32px]" src="/assets/images/logos/axie.png" alt="logo" />
                  </div>
                  <div className="items-center">
                    <span className="font-bold text-white">Axie</span>
                  </div>
                  <div className="items-center">
                    <span className="">VN</span>
                  </div>
                  <div className="items-center">
                    <span className="linear-text font-bold">1000</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-[27px] h-[244px] w-1/3">
            <h2 className="text-[20px] text-white font-bold mb-6">DeFi</h2>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex flex-row justify-between gap-3">
                  <div className="flex-shrink flex gap-2 items-center">
                    <img src="/assets/images/ad.svg" alt="ad" />
                    <img className="w-[32px] h-[32px]" src="/assets/images/logos/kyber.png" alt="logo" />
                  </div>
                  <div className="items-center">
                    <span className="font-bold text-white">Kyber</span>
                  </div>
                  <div className="items-center">
                    <span className="">VN</span>
                  </div>
                  <div className="items-center">
                    <span className="linear-text font-bold">1000</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-6">
          <StyledToggleButtonGroup orientation="horizontal" value={network} exclusive onChange={handleChange}>
            {ToggleButtons.map((button, idx) => (
              <StyledToggleButton key={idx} value={button.value} aria-label={button.label}>
                <div className="flex flex-row items-center gap-3">
                  <img src={button.image} alt="" />
                  <span>{button.title}</span>
                </div>
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>

          <div className="relative">
            <ReputationTable network={network} />
          </div>
        </div>
      </Container>
    </div>
  );
};
