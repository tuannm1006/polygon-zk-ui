import { toJson } from '@octan/common';
import { showModalActions } from 'app';
import { SBT_MINTER_BSC_CONTRACT_ADDRESS, SBT_REPUTATION_BSC_CONTRACT_ADDRESS } from 'consts';
import { IAppContext } from 'contexts';
import { getSbtMinterBscContract, getSbtReputationBscContract, web3 } from 'contracts';
import { propOr } from 'ramda';
import { useCallback } from 'react';
import { DialogTypes } from 'shared-components';
import { getApi } from 'swagger';
import { logError, useEmit } from 'utils';

export const useRevokeSbt = () => {
  const emit = useEmit();

  return useCallback(async (appContext: IAppContext) => {
    const {
      userInfo,
      getChainKey,
      fetchUserInfo,
      setReputationScore,
      userAddress,

      setIsWaiting,
    } = appContext;
    try {
      setIsWaiting(true);
      const chainKey = getChainKey();
      const currentPrimaryWallet = userInfo?.primaryWallet || '';

      const sbtReputationBscContract = getSbtReputationBscContract(SBT_REPUTATION_BSC_CONTRACT_ADDRESS || '');
      const sbtId = await sbtReputationBscContract.methods
        .tokenOf(currentPrimaryWallet)
        .call()
        .catch(logError('revokeSbt.tokenOf'));

      const { expiry, signature } = await getApi()
        .sbtsSignRevokePost({
          sbtId,
          chainKey,
          address: currentPrimaryWallet,
        })
        .then(toJson)
        .catch(logError('revokeSbt.sbtsSignRevokePost'));

      const sbtMinterBscContract = getSbtMinterBscContract(SBT_MINTER_BSC_CONTRACT_ADDRESS || '');

      const revokeParams = [sbtId, expiry, signature];
      // const resOfEstGas = await sbtMinterBscContract.methods.revoke
      //   .apply(undefined, revokeParams)
      //   .estimateGas({ from: currentPrimaryWallet })
      //   .catch(logError('revokeSbt.revoke.estimateGas'));

      const { transactionHash: txHash } = await sbtMinterBscContract.methods.revoke
        .apply(undefined, revokeParams)
        .send({ from: userInfo?.primaryWallet, maxPriorityFeePerGas: null, maxFeePerGas: null })
        .catch(logError('revokeSbt.revoke'));

      let needToCheck = true;
      while (needToCheck) {
        const { status } = await web3.eth.getTransactionReceipt(txHash);
        console.log('status ::: ', status);
        needToCheck = status;
        if (status) {
          break;
        }
      }

      const res = await getApi()
        .sbtsUserIssueRevokePost({
          option: 'revoke',
          chainKey,
          address: currentPrimaryWallet,
          sbtId,
          txHash,
        })
        .then(toJson)
        .catch(logError('revokeSbt.sbtsUserIssueRevokePost'));

      // await getApi().walletsChangePrimaryWalletPost({
      //   walletAddress: userWallet
      // })

      fetchUserInfo();
      setReputationScore(undefined);
      return txHash;
    } catch (error: any) {
      let errorData = error;
      if (error.json) {
        errorData = await error.json();
      }
      emit({
        action: showModalActions.showWarning,
        type: DialogTypes.Error,
        title: 'Error',
        subTitle: propOr('Something wrong', 'message', errorData),
      });
    } finally {
      setIsWaiting(false);
    }
  }, []);
};
