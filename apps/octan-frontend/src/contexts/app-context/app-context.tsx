import { setToHappen, toJson } from '@octan/common';
import { DefaultFcProps, SocialAccount } from 'common';
import {
  chainIds,
  DataKeys,
  originNetworks,
  SBT_REPUTATION_BSC_CONTRACT_ADDRESS,
  SBT_REPUTATION_SCORE_BSC_CONTRACT_ADDRESS,
  SCORE_COUNTDOWN,
  USING_TESTNET,
} from 'consts';
import { getSbtReputationBscContract, getSbtReputationScoreBscContract, web3 } from 'contracts';
import { compose, filter, reject, tap } from 'ramda';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { Chain, getRankingsDashboard } from 'services';
import { getApi, getApiConfig, SoulBoundToken, User } from 'swagger';
import { checkIsLoggedIn, clearLoginData, getNextSundayUTC0, getWalletAddress, logError, saveLoginData } from 'utils';
import toast from 'react-hot-toast';
import { parseEther } from 'ethers/lib/utils';
import { toNumber } from 'lodash';

export interface updateComputedWallets {
  caller: string;
  soulbound: string;
  soulboundId: number;
  paymentToken: string;
  fee: string;
  data: string;
  nonce: number;
  expiry: number;
  signature: string;
  attributeIds: number[];
  scores: string[];
}

export interface IAppContext {
  isWaiting: boolean;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;

  userInfo: User | undefined;
  fetchUserInfo: () => Promise<void>;

  userAddresses: string[];
  setUserAddresses: Dispatch<SetStateAction<string[]>>;
  fetchUserWallets: () => Promise<void>;
  fetchComputedWallets: () => Promise<void>;
  getChainKey: () => string;

  userAddress: string | undefined;
  computedWallet: string[];
  loggedIn: boolean;
  signIn: (
    address: string,
    tokenData: {
      accessToken: string;
      refreshToken: string;
    }
  ) => void;
  signOut: () => void;

  fetchReputationScore: () => Promise<void>;
  reputationScore: string | undefined;
  setReputationScore: Dispatch<SetStateAction<string | undefined>>;
  nextUpdateReputationScore: Date | undefined;

  referral: string | undefined;
  setReferral: Dispatch<SetStateAction<string | undefined>>;

  chains: Chain[];
  setChains: Dispatch<SetStateAction<Chain[]>>;

  selectedChainId: string | undefined;
  setSelectedChainId: Dispatch<SetStateAction<string | undefined>>;

  selectedChain: Chain | undefined;

  checkWalletHasSBT: (wallet: string) => Promise<void>;
  hasSBT: boolean;
  fetchSbts: () => void;
  fetchSocialProfile: () => void;
  updateComputedWallets: (data: updateComputedWallets) => Promise<void>;

  sbts: SoulBoundToken[];
  hasRevokedSbt: boolean | undefined;
  soulboundId: string | undefined;
  globalRS: number | string;
  lastUpdate: number;
  socialAccounts: SocialAccount[] | undefined;
  fetchGlobalRS: () => Promise<void>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: DefaultFcProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const [referral, setReferral] = useState<string | undefined>();
  const [loggedIn, setLoggedIn] = useState(checkIsLoggedIn);
  const [hasSBT, setHasSBT] = useState(false);

  const [reputationScore, setReputationScore] = useState<string | undefined>();
  const [nextUpdateReputationScore, setNextUpdateReputationScore] = useState<Date | undefined>();

  const [selectedChainId, setSelectedChainId] = useState<string | undefined>(chainIds.polygon_zk);
  const [chains, setChains] = useState<Chain[]>(originNetworks);

  const selectedChain = useMemo(() => chains.find((chain) => chain.id === selectedChainId), [selectedChainId, chains]);

  const userAddress = useMemo(() => (loggedIn ? getWalletAddress() : ''), [loggedIn]);
  const [userAddresses, setUserAddresses] = useState<string[]>([]);
  const [computedWallet, setComputedWallet] = useState<string[]>([]);
  const [sbts, setSbtc] = useState<SoulBoundToken[]>([]);
  const [hasRevokedSbt, setHasRevokedSbt] = useState<boolean | undefined>();
  const [soulboundId, setSoulboundId] = useState<string | undefined>();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>();

  const [globalRS, setGlobalRS] = useState<number | string>(0);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const getChainKey = () => {
    switch (selectedChainId) {
      case chainIds.polygon_zk:
      case chainIds.bsc:
        return USING_TESTNET ? 'POLYGON_ZK_TEST' : 'BSC';
      default:
        return 'LOCAL';
    }
  };

  const fetchUserInfo = async () => {
    await getApi()
      .usersCurrentGet()
      .then((data) => {
        setReferral(`${location.origin}?ref=${data?.referralCode}`);
        setUserInfo(data);
      })
      .catch((err) => {
        setUserInfo(undefined);
        logError('fetchUserInfo')(err);
      });
  };

  const fetchUserWallets = async () => {
    try {
      const wallets = await getApi().walletsGet();
      setUserAddresses(wallets.map((wallet) => wallet.address || ''));
    } catch (err) {
      setUserAddresses([]);
      logError('fetchUserWallets')(err);
    }
  };

  const fetchComputedWallets = async () => {
    try {
      const { basePath, ...options } = getApiConfig();
      const result = await fetch(`${basePath}/wallets/computed-wallets-rs?chainKey=${getChainKey()}`, {
        ...options,
        method: 'GET',
      }).then(toJson);
      setComputedWallet(result);
    } catch (err) {
      setComputedWallet([]);
      logError('fetchComputedWallets')(err);
    }
  };

  const fetchSbts = async () => {
    await getApi()
      .sbtsGet()
      .then(
        compose(
          setSbtc,
          reject((sbt: SoulBoundToken) => sbt.status === 'revoked' || sbt.status === 'issuing')
        )
      )
      .catch((err) => {
        setSbtc([]);
        logError('fetchSbts')(err);
      });
  };

  const fetchSocialProfile = async () => {
    await getApi()
      .socialsAccountGet()
      .then((data) => {
        console.log('fetchSocialProfile - data ::: ', data);
        setSocialAccounts(data);
      })
      .catch((err) => {
        logError('fetchSocialProfile')(err);
      });
  };

  const fetchReputationScore = async () => {
    const { data } = await getRankingsDashboard(userAddresses, DataKeys.total_reputation_score);
    const total: number = data.reduce((a: number, b: { value: string }) => a + Number(b.value), 0);
    setReputationScore(total + '');
  };

  const fetchGlobalRS = async () => {
    const attributeId = 1;
    try {
      const sbtReputationScoreBscContract = getSbtReputationBscContract(SBT_REPUTATION_BSC_CONTRACT_ADDRESS || '');

      const issueParams = [soulboundId, attributeId];
      // const resOfEstGas = await sbtReputationScoreBscContract.methods.latestAnswer
      //   .apply(undefined, issueParams)
      //   .estimateGas({ from: userAddress })
      //   .catch(logError('fetchGlobalRS.latestAnswer.estimateGas'));
      const { score, lastUpdate } = await sbtReputationScoreBscContract.methods.latestAnswer
        .apply(undefined, issueParams)
        .call()
        .catch(logError('fetchGlobalRS.latestAnswer.issue'));
      const convertScore = web3.utils.fromWei(score, 'Gwei');
      setGlobalRS((Number(convertScore) / 10).toFixed(1));
      setLastUpdate(lastUpdate);
    } catch (err) {
      logError('fetchGlobalRS')(err);
    }
  };

  const updateComputedWallets = async (updateData: updateComputedWallets) => {
    try {
      const sbtReputationScoreBscContract = getSbtReputationScoreBscContract(
        SBT_REPUTATION_SCORE_BSC_CONTRACT_ADDRESS || ''
      );
      const {
        attributeIds,
        caller,
        data,
        expiry,
        fee,
        nonce,
        paymentToken,
        scores,
        signature,
        soulbound,
        soulboundId,
      } = updateData;

      const updateParams = [
        {
          attributeIds,
          caller,
          data,
          expiry,
          fee,
          nonce,
          paymentToken,
          scores,
          signature,
          soulbound,
          soulboundId,
        },
      ];
      const { transactionHash: txHash } = await sbtReputationScoreBscContract.methods.update
        .apply(undefined, updateParams)
        .send({ from: userInfo?.primaryWallet, maxPriorityFeePerGas: null, maxFeePerGas: null })
        .catch('updateComputedWallet.update');
      return txHash;
    } catch (err) {
      setIsWaiting(false);
      logError('updateComputedWallets')(err);
      return err;
    }
  };

  const checkWalletHasSBT = async (wallet: string) => {
    try {
      const sbtReputationBscContract = getSbtReputationBscContract(SBT_REPUTATION_BSC_CONTRACT_ADDRESS || '');

      const soulboundId = await sbtReputationBscContract.methods
        .tokenOf(wallet)
        .call()
        .catch(logError('checkWalletHasSBT.tokenOf'));

      setSoulboundId(soulboundId);

      if (!!soulboundId) {
        const isRevoked = await sbtReputationBscContract.methods
          .isRevoked(soulboundId)
          .call()
          .catch(logError('checkWalletHasSBT.isRevoked'));

        // console.log('isRevoked', isRevoked);
        setHasRevokedSbt(isRevoked);

        if (isRevoked) {
          setHasSBT(false);
        } else {
          setHasSBT(true);

          // 1: hard code nextUpdate to next sunday +0 UTC

          // getNextSundayUTC0 returns this Sunday instead of next Sunday
          // const nextUpdate = getNextSundayUTC0(new Date());
          // console.log('next Update ::: ', nextUpdate);
          // setNextUpdateReputationScore(nextUpdate);
          // setToHappen(() => checkWalletHasSBT(wallet), nextUpdate);

          // 2: get nextUpdate data from contract
          // const latestAnswer = await sbtReputationBscContract
          //   .methods
          //   .latestAnswer(soulboundId, 1)
          //   .call()
          //   .catch(logError('checkWalletHasSBT.latestAnswer'))

          // console.log('latestAnswer', latestAnswer)

          // if (latestAnswer) {
          //   const lastUpdate = Number(latestAnswer._lastUpdate || latestAnswer.lastUpdate)

          //   if (!!lastUpdate) {
          //     setReputationScore(latestAnswer._score || 0);
          //     const nextUpdate = new Date((+ Number(SCORE_COUNTDOWN) * 60) * 1000)
          //     setNextUpdateReputationScore(nextUpdate)
          //     setToHappen(() => checkWalletHasSBT(wallet), nextUpdate)
          //   }
          // }
        }
      } else {
        setHasSBT(false);
      }
    } catch (err) {
      setHasSBT(false);
      logError('checkWalletHasSBT')(err);
    }
  };

  useEffect(() => {
    if (!loggedIn) return;

    Promise.all([fetchUserInfo(), fetchUserWallets(), fetchSbts(), fetchComputedWallets()]);
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn || !userInfo) return;
    if (!userInfo.primaryWallet) return;

    Promise.all([checkWalletHasSBT(userInfo.primaryWallet), fetchSbts()]);
  }, [loggedIn, userInfo]);

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        setIsWaiting,

        userInfo,
        fetchUserInfo,

        getChainKey,

        userAddresses,
        setUserAddresses,
        fetchUserWallets,
        fetchComputedWallets,
        updateComputedWallets,
        globalRS,
        lastUpdate,
        userAddress,
        computedWallet,
        loggedIn,
        signIn: (
          address: string,
          tokenData: {
            accessToken: string;
            refreshToken: string;
          }
        ) => {
          saveLoginData({
            walletAddress: address,
            access_token: tokenData.accessToken,
            refresh_token: tokenData.refreshToken,
            expired: -1,
          });
          setLoggedIn(true);
        },
        signOut: () => {
          clearLoginData();

          setUserInfo(undefined);
          setHasRevokedSbt(undefined);
          setHasSBT(false);
          setSelectedChainId(chainIds.bsc);
          setReferral(undefined);
          setLoggedIn(false);
          setUserAddresses([]);
          setReputationScore(undefined);
          setNextUpdateReputationScore(undefined);
          setReferral(undefined);
          setIsWaiting(false);
        },

        fetchGlobalRS,
        fetchReputationScore,
        reputationScore,
        setReputationScore,
        nextUpdateReputationScore,

        referral: hasSBT ? referral : '-',
        setReferral,

        checkWalletHasSBT,
        hasSBT,
        fetchSbts,
        sbts,
        hasRevokedSbt,
        soulboundId,
        selectedChainId,
        setSelectedChainId,

        chains,
        setChains,
        fetchSocialProfile,
        socialAccounts,
        selectedChain,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const withAppProvider = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  return (
    <AppProvider>
      <Component {...props} />
    </AppProvider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContext');
  }
  return context;
};
