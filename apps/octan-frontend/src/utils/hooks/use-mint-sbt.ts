import { toJson } from '@octan/common';
import { SBT_MINTER_BSC_CONTRACT_ADDRESS } from 'consts';
import { IAppContext } from 'contexts';
import { getSbtMinterBscContract } from 'contracts';
import { useCallback } from 'react';
import { getApi } from 'swagger';
import { logError } from 'utils';
import toast from 'react-hot-toast';

export const useMintSbt = () => {
  return useCallback(async (appContext: IAppContext, primaryWallet = '', computedWallets = ['']) => {
    const {
      userAddress = '',
      getChainKey,
      fetchUserInfo,
      checkWalletHasSBT,
      fetchSbts,
      fetchReputationScore,
      hasSBT,
      setIsWaiting,
      userInfo,
    } = appContext;

    if (hasSBT) {
      return;
    }

    try {
      setIsWaiting(true);
      const chainKey = getChainKey();
      const { sbtId, expiry, signature } = await getApi()
        .sbtsSignIssuePost({
          chainKey,
          primaryWallet: primaryWallet,
          computedWallets: computedWallets,
        })
        .then(toJson)
        .catch(logError('useMintSbt.sbtsSignIssuePost'));

      const sbtMinterBscContract = getSbtMinterBscContract(SBT_MINTER_BSC_CONTRACT_ADDRESS || '');

      const issueParams = [sbtId, expiry, signature];
      // const resOfEstGas = await sbtMinterBscContract.methods.issue
      //   .apply(undefined, issueParams)
      //   .estimateGas({ from: primaryWallet })
      //   .catch(logError('useMintSbt.issue.estimateGas'));

      // console.log('resOfEstGas', resOfEstGas);
      // console.log('issueParams ::: ', issueParams);
      const { transactionHash: txHash } = await sbtMinterBscContract.methods.issue
        .apply(undefined, issueParams)
        .send({ from: primaryWallet, maxPriorityFeePerGas: null, maxFeePerGas: null })
        .catch(logError('useMintSbt.issuesss'));

      await checkWalletHasSBT(primaryWallet);

      const res = await getApi()
        .sbtsUserIssueRevokePost({
          option: 'issue',
          chainKey,
          address: primaryWallet,
          sbtId,
          txHash,
        })
        .then(toJson)
        .catch(logError('useMintSbt.sbtsUserIssueRevokePost'));

      fetchSbts();

      await getApi()
        .walletsChangePrimaryWalletPost({
          walletAddress: primaryWallet,
        })
        .catch(logError('useMintSbt.walletsChangePrimaryWalletPost'));

      fetchUserInfo();
      fetchReputationScore().catch(logError('useMintSbt.fetchReputationScore'));
      return txHash;
    } catch (error: any) {
      let errorData = error;
      if (error.json) {
        errorData = await error.json();
      }
      toast.error(`Something wrong ${errorData.stringify()}`);
    } finally {
      setIsWaiting(false);
    }
  }, []);
};

export const useReissueSbt = () => {
  return useCallback(async (appContext: IAppContext, primaryWallet = '') => {
    const {
      userAddress = '',
      getChainKey,
      fetchUserInfo,
      checkWalletHasSBT,
      fetchSbts,
      fetchReputationScore,
      hasRevokedSbt,
      setIsWaiting,
      userInfo,
    } = appContext;

    if (!hasRevokedSbt) {
      return;
    }

    try {
      setIsWaiting(true);
      const chainKey = getChainKey();

      const computedWallets = await getApi()
        .walletsComputedWalletsRSGet({
          params: { chainKey },
        })
        .catch(logError('useReissueSbt.walletsComputedWalletsRSGet'));

      const { sbtId, expiry, signature } = await getApi()
        .sbtsSignIssuePost({
          chainKey,
          primaryWallet: userInfo?.primaryWallet || '',
          computedWallets: computedWallets,
        })
        .then(toJson)
        .catch(logError('useMintSbt.sbtsSignIssuePost'));

      const sbtMinterBscContract = getSbtMinterBscContract(SBT_MINTER_BSC_CONTRACT_ADDRESS || '');

      const issueParams = [sbtId, expiry, signature];
      // const resOfEstGas = await sbtMinterBscContract.methods.issue
      //   .apply(undefined, issueParams)
      //   .estimateGas({ from: userInfo?.primaryWallet })
      //   .catch(logError('useMintSbt.issue.estimateGas'));

      // console.log('resOfEstGas', resOfEstGas);

      const { transactionHash: txHash } = await sbtMinterBscContract.methods.issue
        .apply(undefined, issueParams)
        .send({ from: userInfo?.primaryWallet, maxPriorityFeePerGas: null, maxFeePerGas: null })
        .catch(logError('useMintSbt.issue'));

      await checkWalletHasSBT(userAddress);

      const res = await getApi()
        .sbtsUserIssueRevokePost({
          option: 'issue',
          chainKey,
          address: userAddress,
          sbtId,
          txHash,
        })
        .then(toJson)
        .catch(logError('useMintSbt.sbtsUserIssueRevokePost'));

      fetchSbts();

      await getApi()
        .walletsChangePrimaryWalletPost({
          walletAddress: userAddress,
        })
        .catch(logError('useMintSbt.walletsChangePrimaryWalletPost'));

      await fetchUserInfo();
      fetchReputationScore().catch(logError('useMintSbt.fetchReputationScore'));
      return txHash;
    } catch (error: any) {
      let errorData = error;
      if (error.json) {
        errorData = await error.json();
      }
      toast.error(`Something wrong ${errorData.stringify()}`);
    } finally {
      setIsWaiting(false);
    }
  }, []);
};
