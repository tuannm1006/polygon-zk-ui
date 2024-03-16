import { Chain } from 'services';

export const chainIds = {
  none: '-1',
  bttc: '1',
  aurora: '6',
  tron: '7',
  bsc: '3',
  polygon_zk: '9',
};

export const originNetworks: Chain[] = [
  // {
  //   id: chainIds.none,
  //   name: 'No selected network',
  //   visible: true,
  //   enable: false
  // },
  {
    id: chainIds.aurora,
    chain_id: 1313161554,
    chain_id_testnet: 1313161555,
    name: 'Aurora',
    icon: '/assets/images/networks/aurura.png',
    url: 'https://aurorascan.dev/',
    testnet_url: 'https://testnet.aurorascan.dev/',
    grpc_url: 'https://mainnet.aurora.dev/',
    testnet_grpc_url: 'https://testnet.aurora.dev/',
    nativeCurrency: {
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    testnet_nativeCurrency: {
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    subDomain: 'https://aurora-sbt.octan.network',
    visible: true,
    enable: false,
  },
  {
    id: chainIds.bttc,
    chain_id: 199,
    chain_id_testnet: 1029,
    name: 'BTTC',
    icon: '/assets/images/networks/bttc.svg',
    url: 'https://bttcscan.com/',
    testnet_url: 'https://testnet.bttcscan.com/',
    grpc_url: 'https://bttcscan.com:8545',
    testnet_grpc_url: 'https://testnet.bscscan.com:8545/',
    nativeCurrency: {
      name: 'BTT',
      decimals: 18,
      symbol: 'BTT',
    },
    testnet_nativeCurrency: {
      name: 'BTT',
      decimals: 18,
      symbol: 'BTT',
    },
    subDomain: 'https://bttc-sbt.octan.network',
    visible: true,
    enable: false,
  },
  {
    id: '2',
    name: 'Ethereum',
    icon: '/assets/images/networks/eth.png',
    nativeCurrency: {
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    testnet_nativeCurrency: {
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    visible: false,
    enable: false,
  },
  {
    id: chainIds.bsc,
    chain_id: 56,
    chain_id_testnet: 97,
    name: 'BNB Chain',
    icon: '/assets/images/networks/bnb.png',
    url: 'https://bscscan.com/',
    testnet_url: 'https://testnet.bscscan.com/',
    grpc_url: 'https://bsc-dataseed4.binance.org',
    testnet_grpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    nativeCurrency: {
      name: 'BNB',
      decimals: 18,
      symbol: 'BNB',
    },
    testnet_nativeCurrency: {
      name: 'BNB',
      decimals: 18,
      symbol: 'BNB',
    },
    visible: true,
    enable: true,
  },
  {
    id: chainIds.tron,
    name: 'Tron',
    icon: '/assets/images/networks/tron.png',
    url: 'https://tronscan.org',
    testnet_url: 'https://shasta.tronscan.org',
    subDomain: 'https://tron-sbt.octan.network',
    visible: true,
    enable: false,
  },
  {
    id: chainIds.polygon_zk,
    chain_id: 1101,
    chain_id_testnet: 1442,
    name: 'Polygon ZK',
    icon: '/assets/images/networks/bnb.png',
    url: 'https://zkevm.polygonscan.com/',
    testnet_url: 'https://testnet-zkevm.polygonscan.com/',
    grpc_url: 'https://zkevm-rpc.com',
    testnet_grpc_url: 'https://rpc.public.zkevm-test.net',
    nativeCurrency: {
      name: 'ETH',
      decimals: 18,
      symbol: 'ETH',
    },
    testnet_nativeCurrency: {
      name: 'ETH',
      decimals: 18,
      symbol: 'ETH',
    },
    visible: true,
    enable: true,
  },
];
