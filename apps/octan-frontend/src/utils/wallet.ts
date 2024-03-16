import { web3 } from 'contracts';
import { toHexString } from '@octan/common';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { USING_TESTNET } from 'consts';
import { Chain } from 'services';
import Web3Modal from 'web3modal';

// import { configureChains, createClient } from 'wagmi'

// import { bsc, bscTestnet } from "@wagmi/core/chains";

// import { Web3Modal } from "@web3modal/react";

// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from "@web3modal/ethereum";
// import { Chain } from 'services';

// export const PROJECT_ID = '3797dc7d8d2ac8cf88cb250e3a8f5527';

// const chains = [bsc, bscTestnet];

// // Wagmi Core Client
// const { provider } = configureChains(chains, [
//   walletConnectProvider({ projectId: PROJECT_ID }),
// ]);
// export const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: modalConnectors({
//     projectId: PROJECT_ID,
//     version: "2",
//     appName: "web3Modal",
//     chains,
//   }),
//   provider,
// });

// // Web3Modal and Ethereum Client
// export const ethereumClient = new EthereumClient(wagmiClient, chains);

const win = window as Window;

export type ProviderEvents = {
  chainChanged?: (chainId: unknown) => void;
  onAccountsChanged?: (accounts: string[]) => void;
  onDisconnect: () => void;
};

export const connectProvider = async (chain: Chain, events: ProviderEvents) => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: [
          // { '0x38': 'https://bsc-dataseed.binance.org' },
          // { '0x61': 'https://data-seed-prebsc-1-s1.binance.org:8545' },

          // { '0x405': 'https://bttcscan.com:8545' },

          USING_TESTNET
            ? { [toHexString(Number(chain.chain_id_testnet))]: chain.testnet_grpc_url }
            : { [toHexString(Number(chain.chain_id))]: chain.grpc_url },

          // TODO add required chainId and rpcUrl
        ],
      },
    },
  };
  const web3Modal = new Web3Modal({
    providerOptions,
    theme: 'dark',
    cacheProvider: false,
  });

  // console.log('Web3.givenProvider', Web3.givenProvider);

  const provider = Web3.givenProvider || (await web3Modal.connect());

  listWeb3Events(provider, events);

  web3.setProvider(provider);
};

export const listWeb3Events = (provider: any, events: ProviderEvents) => {
  provider.on('connect', (connectInfo: { chainId: string }) => {
    console.log('connect', connectInfo);
  });
  provider.on('chainChanged', (chainId: unknown) => {
    console.log('chainChanged', chainId);
    events.chainChanged?.(chainId);
  });
  provider.on('accountsChanged', (accounts: string[]) => {
    events.onAccountsChanged?.(accounts);
  });
  provider.on('message', (message: { type: string; data: unknown }) => {
    console.log('message', message);
  });
  provider.on('disconnect', (error: unknown) => {
    console.log('disconnect', error);
    events.onDisconnect();
  });
};

export const requestPermissions = async () => {
  try {
    if (window.ethereum) {
      const permissions = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      const accountsPermission = permissions.find(
        (permission: { parentCapability: string }) => permission.parentCapability === 'eth_accounts'
      );
      if (accountsPermission) {
        console.log('eth_accounts permission successfully requested!');
      }
    }
  } catch (error: any) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Permissions needed to continue.');
    } else {
      console.error(error);
    }
  }
};

export const switchChain = async (chain: Chain) => {
  if (!win.ethereum) return;

  const requireChainId = Number(USING_TESTNET ? chain.chain_id_testnet : chain.chain_id);

  try {
    await win.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHexString(requireChainId) }],
    });
  } catch (switchError: any) {
    // // 4902 error code indicates the chain is missing on the wallet
    // if (switchError.code === 4902) {
    const newChainInfo = USING_TESTNET
      ? {
          chainId: toHexString(requireChainId),
          rpcUrls: [chain.testnet_grpc_url],
          chainName: `${chain.name}-testnet`,
          nativeCurrency: chain.testnet_nativeCurrency,
          blockExplorerUrls: [chain.testnet_url],
        }
      : {
          chainId: toHexString(requireChainId),
          rpcUrls: [chain.grpc_url],
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          blockExplorerUrls: [chain.url],
        };

    // temporary using this method due to metamask issue https://github.com/MetaMask/metamask-extension/issues/18509
    try {
      await win.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [newChainInfo],
      });

      // try again to witch network
      // await switchChain(chain);
    } catch (error) {
      console.log('error', error);
    }
    // }
  }
};

export const getCurrentAddress = async () => {
  let address;
  try {
    [address] = await web3.eth.requestAccounts();
  } catch {
    [address] = await web3.eth.getAccounts();
  }

  return address.toLowerCase();
};

export const connectAddress = async (chain: Chain, events: ProviderEvents) => {
  try {
    await connectProvider(chain, events);
    await switchChain(chain);

    const requireChainId = Number(USING_TESTNET ? chain.chain_id_testnet : chain.chain_id);
    const currentChainId = await web3.eth.getChainId();
    if (currentChainId === requireChainId) {
      return await getCurrentAddress();
    } else {
      alert('You need to switch the chain before connecting.');
    }
  } catch (error) {
    console.log(error);
  }
};
