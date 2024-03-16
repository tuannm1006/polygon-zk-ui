import { DefaultFcProps } from 'common';
import { useAppContext } from '../app-context';
import { createContext, useContext } from 'react';
import { connectAddress } from 'utils';
import { Chain } from 'services';
import { web3 } from 'contracts';
import { getApi } from 'swagger';
import { USING_TESTNET } from 'consts';
import { toJson } from '@octan/common';

export const signWithWeb3 = async (address: string, message: string) => {
  const password = ''; //No password needed
  const rawSig = await web3.eth.personal.sign(message, address, password);

  const splitAt = rawSig.length - 2;

  // for Ethereum, last bytes of the signature must be 1b or 1c
  // Metamask did this automatically but for hardware wallet like Trezor or Ledger,
  // this must be done manually
  let v = rawSig.slice(-2);
  if (v === '00') {
    v = '1b';
  } else if (v === '01') {
    v = '1c';
  }
  const signature = rawSig.substring(0, splitAt) + v;

  return signature;
};

export const signToMint = async (address: string) => {
  const message = 'Octan Soulbound 1ID mint soulbound token';
  return await signWithWeb3(address, message);
};

export const signToAddWallet = async (address: string) => {
  const message = 'Octan Soulbound 1ID add new wallet';
  return await signWithWeb3(address, message);
};

const connectWithBe = async (selectedChain: Chain, addr: string) => {
  const authNonceGetArgs = {
    address: addr,
    chainKey: USING_TESTNET ? 'POLYGON_ZK_TEST' : 'BSC',
  };
  const { nonce } = await getApi().authNonceGet(authNonceGetArgs).then(toJson);

  const message = `Octan Soulbound 1ID login one-time code: ${nonce}`;
  const signature = await signWithWeb3(addr, message);

  const referralCode = localStorage.getItem('REFERRAL_CODE') || '';

  const tokenData = await getApi()
    .authLoginPost({
      ...authNonceGetArgs,
      signature,
      referralCode,
    })
    .then(toJson)
    .catch((res) => {
      if (res.status === 201) {
        return res.json();
      }
    });

  localStorage.removeItem('REFERRAL_CODE');

  return tokenData;
};

interface IWeb3Context {
  connectWalletWithBe: () => void;
  connectWallet: () => void;
}

export const Web3Context = createContext<IWeb3Context | undefined>(undefined);

export const Web3Provider = ({ children }: DefaultFcProps) => {
  const { selectedChain, signIn, signOut } = useAppContext();

  const connectWalletWithBe = async (callback?: () => void) => {
    if (!selectedChain) return;

    try {
      const addr = await connectAddress(selectedChain, {
        onDisconnect: signOut,
        onAccountsChanged: (accounts: unknown) => {
          console.log('accountsChanged', accounts);
        },
      });
      if (!addr) return;
      const tokenData = await connectWithBe(selectedChain, addr);

      console.log('tokenData ::: ', tokenData);
      signIn(addr, tokenData);

      if (callback) callback();
    } catch (err) {
      console.log('connectWalletWithBe', err);
      throw err;
    }
  };

  const connectWallet = async (callback?: () => void) => {
    if (!selectedChain) return;
    try {
      const addr = await connectAddress(selectedChain, {
        onDisconnect: signOut,
        onAccountsChanged: (accounts: unknown) => {
          console.log('accountsChanged', accounts);
        },
      });

      if (!addr) return;

      if (callback) callback();
    } catch (err) {
      console.log('connectWallet', err);
      throw err;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        connectWalletWithBe,
      }}>
      {children}
    </Web3Context.Provider>
  );
};

export const withWeb3Provider = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  return (
    <Web3Provider>
      <Component {...props} />
    </Web3Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3Context');
  }
  return context;
};
