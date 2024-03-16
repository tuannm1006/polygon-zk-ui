import { ISbtOwnersCategory } from './interface';

export const RANKING_TAB_OPTIONS = [
  {
    label: 'Addresses',
    code: 'ADDRESS',
    query: 'address',
  },
  {
    label: 'Projects',
    code: 'PROJECT',
    query: 'project',
  },
  {
    label: 'SBT owners',
    code: 'SBT_OWNER',
    query: 'sbt_owner',
    disabled: true,
  },
  // {
  //   label: 'Community',
  //   code: 'COMMUNITY',
  //   query: 'community',
  //   disabled: true,
  // },
  // {
  //   label: 'Campaign list',
  //   code: 'CAMPAIGN_LIST',
  //   query: 'campaign_list',
  //   disabled: true,
  // },
];

export const RANKING_TABS = {
  ADDRESS: 'ADDRESS',
  PROJECT: 'PROJECT',
  SBT_OWNER: 'SBT_OWNER',
  COMMUNITY: 'COMMUNITY',
  CAMPAIGN_LIST: 'CAMPAIGN_LIST',
  address: 'address',
  project: 'project',
  sbt_owner: 'sbt_owner',
  community: 'community',
  campaign_list: 'campaign_list',
};

export const SELECT_ROWS_DEFAULT_VALUE = 50;

export const SELECT_ROWS_OPTIONS = [
  {
    label: '20',
    code: 20,
  },
  {
    label: '50',
    code: 50,
  },
  {
    label: '100',
    code: 100,
  },
];

export const RANKING_API_ENDPOINTS = {
  rankingBase: 'rankings',
  addresses: 'addresses',
  projects: 'projects',
  sbtOwners: 'sbt-owners',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: '',
};

export const NETWORKS = {
  BSC: 'BSC',
  BNB: 'BNB',
  Aurora: 'AURORA',
  BTTC: 'BTTC',
  Polygon: 'Polygon',
  Tron: 'TRX',
  ETH: 'ETH',
  Near: 'Near',
  Arbitrum: 'Arbitrum',
  Avalanche: 'Avalanche',
  Fantom: 'Fantom',
  Algorand: 'Algorand',
  Aptos: 'Aptos',
  Optimism: 'Optimism',
  Solana: 'Solana',
  Cardano: 'Cardano',
  Cosmos: 'Cosmos',
  ICP: 'ICP',
  Flow: 'Flow',
  Polkadot: 'Polkadot',
  XRP: 'XRP',
  Base: 'BASE',
  Neo: 'NEO',
};

export const CHAINS_ADDRESS = [
  {
    value: NETWORKS.ETH,
    label: 'Ethereum',
    image: '/assets/images/networks/eth.png',
    title: 'Ethereum',
    enabled: true,
  },
  {
    value: NETWORKS.BNB,
    label: 'Binance',
    image: '/assets/images/networks/bsc.png',
    title: 'BNB Chain',
    enabled: true,
  },
  {
    value: 'ARB',
    label: NETWORKS.Arbitrum,
    image: '/assets/images/networks/arbitrum.png',
    title: NETWORKS.Arbitrum,
    enabled: true,
  },
  {
    value: 'MATIC',
    label: 'Polygon',
    image: '/assets/images/networks/polygon.png',
    title: 'Polygon',
    enabled: true,
  },
  {
    value: NETWORKS.Tron,
    label: 'Tron',
    image: '/assets/images/networks/tron.png',
    title: 'Tron',
    enabled: true,
  },
  {
    value: NETWORKS.XRP,
    label: 'XRP',
    image: '/assets/images/networks/xrp.png',
    title: 'XRP',
    enabled: true,
  },
  {
    value: NETWORKS.Aurora,
    label: 'Aurora',
    image: '/assets/images/networks/aurora.png',
    title: 'Aurora',
    enabled: true,
  },
  {
    value: NETWORKS.Base,
    label: 'Base',
    image: '/assets/images/networks/base.png',
    title: 'Base',
    enabled: true,
  },
  {
    value: NETWORKS.Neo,
    label: 'Neo',
    image: '/assets/images/networks/neo.png',
    title: 'Neo',
    enabled: true,
  },
  // {
  //   value: NETWORKS.Near,
  //   label: 'Near',
  //   image: '/assets/images/networks/near.svg',
  //   title: 'Near',
  // },
  // {
  //   value: NETWORKS.Avalanche,
  //   label: NETWORKS.Avalanche,
  //   image: '/assets/images/networks/avalanche.svg',
  //   title: NETWORKS.Avalanche,
  // },
  // {
  //   value: NETWORKS.Fantom,
  //   label: NETWORKS.Fantom,
  //   image: '/assets/images/networks/fantom.png',
  //   title: NETWORKS.Fantom,
  // },
  // {
  //   value: NETWORKS.Algorand,
  //   label: NETWORKS.Algorand,
  //   image: '/assets/images/networks/algorand.svg',
  //   title: NETWORKS.Algorand,
  // },
  // {
  //   value: NETWORKS.Aptos,
  //   label: NETWORKS.Aptos,
  //   image: '/assets/images/networks/aptos.svg',
  //   title: NETWORKS.Aptos,
  // },
  // {
  //   value: NETWORKS.Optimism,
  //   label: NETWORKS.Optimism,
  //   image: '/assets/images/networks/optimism.png',
  //   title: NETWORKS.Optimism,
  // },
  // {
  //   value: NETWORKS.Solana,
  //   label: NETWORKS.Solana,
  //   image: '/assets/images/networks/solana.svg',
  //   title: NETWORKS.Solana,
  // },
  // {
  //   value: NETWORKS.Cardano,
  //   label: NETWORKS.Cardano,
  //   image: '/assets/images/networks/cardano.svg',
  //   title: NETWORKS.Cardano,
  // },
  // {
  //   value: NETWORKS.Cosmos,
  //   label: NETWORKS.Cosmos,
  //   image: '/assets/images/networks/cosmos.svg',
  //   title: NETWORKS.Cosmos,
  // },
  // {
  //   value: NETWORKS.ICP,
  //   label: NETWORKS.ICP,
  //   image: '/assets/images/networks/icp.svg',
  //   title: NETWORKS.ICP,
  // },
  // {
  //   value: NETWORKS.Flow,
  //   label: NETWORKS.Flow,
  //   image: '/assets/images/networks/flow.svg',
  //   title: NETWORKS.Flow,
  // },
  // {
  //   value: NETWORKS.Polkadot,
  //   label: NETWORKS.Polkadot,
  //   image: '/assets/images/networks/polkadot.svg',
  //   title: NETWORKS.Polkadot,
  // },
];

export const CHAINS_PROJECT = [
  {
    value: NETWORKS.ETH,
    label: 'Ethereum',
    image: '/assets/images/networks/eth.png',
    title: 'Ethereum',
    enabled: true,
  },
  {
    value: NETWORKS.BNB,
    label: 'Binance',
    image: '/assets/images/networks/bsc.png',
    title: 'BNB Chain',
    enabled: true,
  },
  {
    value: 'ARB',
    label: NETWORKS.Arbitrum,
    image: '/assets/images/networks/arbitrum.png',
    title: NETWORKS.Arbitrum,
    enabled: true,
  },
  {
    value: 'MATIC',
    label: 'Polygon',
    image: '/assets/images/networks/polygon.png',
    title: 'Polygon',
    enabled: true,
  },
  {
    value: NETWORKS.Tron,
    label: 'Tron',
    image: '/assets/images/networks/tron.png',
    title: 'Tron',
  },
  {
    value: NETWORKS.XRP,
    label: 'XRP',
    image: '/assets/images/networks/xrp.png',
    title: 'XRP',
  },
  {
    value: NETWORKS.Aurora,
    label: 'Aurora',
    image: '/assets/images/networks/aurora.png',
    title: 'Aurora',
  },
  {
    value: NETWORKS.Base,
    label: 'Base',
    image: '/assets/images/networks/base.png',
    title: 'Base',
  },
  {
    value: NETWORKS.Neo,
    label: 'Neo',
    image: '/assets/images/networks/neo.png',
    title: 'Neo',
  },
];

export const CATEGORIES = {
  All: '',
  Defi: 'defi',
  NFT: 'nft',
  Gamefi: 'gamefi',
  DAO: 'dao',
  Socialfi: 'socialfi',
};

export const PROJECT_CATEGORIES = [
  {
    value: CATEGORIES.All,
    label: 'All categories',
  },
  {
    value: CATEGORIES.Defi,
    label: 'Defi',
  },
  {
    value: CATEGORIES.NFT,
    label: 'NFT',
  },
  {
    value: CATEGORIES.Gamefi,
    label: 'Gamefi',
  },
  {
    value: CATEGORIES.DAO,
    label: 'DAO',
  },
  {
    value: CATEGORIES.Socialfi,
    label: 'Socialfi',
  },
];

///Global RS- DeFi RS- NFT RS - GameFi RS - DAO RS - SocialFi RS
/*
- Total GRS: RS của sbt dựa theo filter (mặc định là Total GRS), tên cột được thay đổi khi filter thay đổi.  Tootltip cho từng column title như sau:
- Total GRS: Total Global Reputation Score of all sbt owner's wallets
- Total Defi RS: Total Defi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to DeFi subspace in a blockchain
- Total NFT RS: Total NFT Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to NFT subspace in a blockchain
- Total Gamefi RS: Total Gamefi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to Gamefi subspace in a blockchain
- Total DAO RS: Total DAO Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to DAO subspace in a blockchain
- Total Socialfi RS: Total Socialfi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to Socialfi subspace in a blockchain"

*/
export const SBT_OWNERS_CATEGORIES: ISbtOwnersCategory = {
  global_rs: {
    value: 'global_rs',
    label: 'Global RS',
    colName: 'Total GRS',
    colTitle: "Total Global Reputation Score of all sbt owner's wallets",
  },
  // defi_rs: {
  //   value: 'defi_rs',
  //   label: 'Defi RS',
  //   colName: 'Total Defi RS',
  //   colTitle:
  //     "Total Defi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to DeFi subspace in a blockchain",
  // },
  // nft_rs: {
  //   value: 'nft_rs',
  //   label: 'NFT RS',
  //   colName: 'Total NFT RS',
  //   colTitle:
  //     "Total NFT Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to NFT subspace in a blockchain",
  // },
  // gamefi_rs: {
  //   value: 'gamefi_rs',
  //   label: 'Gamefi RS',
  //   colName: 'Total Gamefi RS',
  //   colTitle:
  //     "Total Gamefi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to Gamefi subspace in a blockchain",
  // },
  // dao_rs: {
  //   value: 'dao_rs',
  //   label: 'DAO RS',
  //   colName: 'Total DAO RS',
  //   colTitle:
  //     "Total DAO Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to DAO subspace in a blockchain",
  // },
  // socialfi_rs: {
  //   value: 'socialfi_rs',
  //   label: 'Socialfi RS',
  //   colName: 'Total Socialfi RS',
  //   colTitle:
  //     "Total Socialfi Reputation Score is computed from on-chain transactions of all sbt owner's wallets related to Socialfi subspace in a blockchain",
  // },
};

export const USERNAME_MAX_LENGTH = 30;

export const SOCIALS = {
  twitter: 'twitter',
  facebook: 'facebook',
  discord: 'discord',
  telegram: 'telegram',
  email: 'email',
};
