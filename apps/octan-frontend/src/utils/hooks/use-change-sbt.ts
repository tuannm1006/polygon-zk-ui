import { toJson } from "@octan/common"
import { showModalActions } from "app"
import { SBT_MINTER_BSC_CONTRACT_ADDRESS, SBT_REPUTATION_BSC_CONTRACT_ADDRESS } from "consts"
import { IAppContext } from "contexts"
import { getSbtMinterBscContract, getSbtReputationBscContract } from "contracts"
import { propOr } from "ramda"
import { useCallback } from "react"
import { DialogTypes } from "shared-components"
import { getApi } from "swagger"
import { logError, useEmit } from "utils"

export const useChangeSbt = () => {
  const emit = useEmit()

  return useCallback(
    async (appContext: IAppContext, nextPrimaryWallet: string) => {
      const {
        userInfo,
        getChainKey,
        fetchUserInfo,
        checkWalletHasSBT,
        fetchSbts,

        setIsWaiting,
      } = appContext

      try {
        setIsWaiting(true)
        const chainKey = getChainKey();
        const currentPrimaryWallet = userInfo?.primaryWallet || '';

        const sbtReputationBscContract = getSbtReputationBscContract(SBT_REPUTATION_BSC_CONTRACT_ADDRESS || '')

        const sbtId = await sbtReputationBscContract
          .methods
          .tokenOf(currentPrimaryWallet)
          .call()
          .catch(logError('useChangeSbt.tokenOf'))

        const {
          expiry,
          signature,
        } = await getApi()
          .sbtsSignChangePost({
            chainKey,
            sbtId,
            to: nextPrimaryWallet
          })
          .then(toJson)
          .catch(logError('useChangeSbt.sbtsSignChangePost'))

        const sbtMinterBscContract = getSbtMinterBscContract(SBT_MINTER_BSC_CONTRACT_ADDRESS || '')

        const changeParams = [
          sbtId,
          nextPrimaryWallet,
          expiry,
          signature,
        ]
        const resOfEstGas = await sbtMinterBscContract
          .methods
          .change
          .apply(undefined, changeParams)
          .estimateGas({ from: currentPrimaryWallet })
          .catch(logError('useChangeSbt.change.estimateGas'))

        console.log('resOfEstGas', resOfEstGas)

        const {
          transactionHash: txHash
        } = await sbtMinterBscContract
          .methods
          .change
          .apply(undefined, changeParams)
          .send({ from: currentPrimaryWallet })
          .catch(logError('useChangeSbt.change'))

        await getApi()
          .sbtsUserChangePost({
            chainKey,
            sbtId,
            from: currentPrimaryWallet,
            to: nextPrimaryWallet,
            txHash,
          })
          .catch(logError('useChangeSbt.sbtsUserChangePost'))

        await getApi()
          .walletsChangePrimaryWalletPost({
            walletAddress: nextPrimaryWallet
          })
          .catch(logError('useChangeSbt.walletsChangePrimaryWalletPost'))

        checkWalletHasSBT(nextPrimaryWallet)
        fetchSbts()
        fetchUserInfo()

        return txHash
      } catch (error: any) {
        let errorData = error
        if (error.json) {
          errorData = await error.json()
        }
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: propOr('Something wrong', 'message', errorData)
        })
      }
      finally {
        setIsWaiting(false)
      }
    },
    [],
  )
}