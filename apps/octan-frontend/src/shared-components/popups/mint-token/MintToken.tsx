import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useEffect, useState, useRef } from 'react';
import { ButtonV2, Dialog, DialogTypes, OctanInput } from 'shared-components';
import { Modal, Box, Button, InputAdornment } from '@mui/material';
import { CloseIcon } from '../../../pages/profile/components/account-setting/components/upload-btn';
import { AccountSetting } from '../../../pages/profile/components/account-setting';
import { WalletManagement } from '../../../pages/profile/components/wallet-management';
import { useMintSbt } from 'utils';
// Select lib
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { ChainAndWallet } from './components';
import { filter, find, findIndex } from 'lodash';
import toast from 'react-hot-toast';
import { copyToClipboard } from 'utils';
import { useNavigate } from 'react-router-dom';
import { USING_TESTNET } from 'consts';

interface Step {
  index: number;
  id: string;
  name: string;
  nextBtnTitle?: string;
}

const MINT_STEPS: Step[] = [
  {
    index: 0,
    id: 'verify-username-mail',
    name: 'Verify Username & Email',
    nextBtnTitle: 'Verify & continue',
  },
  {
    index: 1,
    id: 'import-wallet',
    name: 'Import Wallet',
    nextBtnTitle: 'Continue',
  },
  {
    index: 2,
    id: 'choose-chain-wallet',
    name: 'Choose chain & wallet',
    nextBtnTitle: 'Continue & mint SBT',
  },
  {
    index: 3,
    id: 'mint-sbt',
    name: 'Mint SBT',
  },
];

const CopyIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.00156 14.3996L3.60156 14.3996C2.93882 14.3996 2.40156 13.8624 2.40156 13.1996L2.40156 4.39961C2.40156 3.29504 3.29699 2.39961 4.40156 2.39961L13.2016 2.39961C13.8643 2.39961 14.4016 2.93687 14.4016 3.59961L14.4016 5.99961M12.0016 21.5996L19.2016 21.5996C20.527 21.5996 21.6016 20.5251 21.6016 19.1996L21.6016 11.9996C21.6016 10.6741 20.527 9.59961 19.2016 9.59961L12.0016 9.59961C10.6761 9.59961 9.60156 10.6741 9.60156 11.9996L9.60156 19.1996C9.60156 20.5251 10.6761 21.5996 12.0016 21.5996Z"
        stroke="#B6B6B6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

type MintTokenProps = DefaultFcProps & {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

interface StepDone {
  [key: string]: boolean;
}

export const MintToken: React.FC<MintTokenProps> = ({ open, handleClose, onConfirm }) => {
  const theme = useTheme();
  const appContext = useAppContext();
  const {
    userInfo,
    userAddress,
    hasRevokedSbt,
    loggedIn,
    hasSBT,
    selectedChain,
    reputationScore,
    nextUpdateReputationScore,
  } = appContext;

  const [checked, setChecked] = useState(false);
  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(false);
  const [step, setStep] = useState('');
  const [stepIndex, setStepIndex] = useState(-1);
  const [mintModalOpen, setMintModalOpen] = useState(false);
  const [isInprogress, setIsInprogress] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [stepDone, setStepDone] = useState<StepDone>({});
  const windowHeight = useRef(window.innerHeight);
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '16px',
    p: '40px',
    gap: '40px',
    minWidth: '960px',
    // windowHeight.current && maxHeight: '682px',
    maxHeight: `${windowHeight.current < 830 ? '682px' : 'fit-content'}`,
    overflow: 'auto',
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isVerifyEmail) {
      setVerifyEmailModalOpen(true);
    } else {
      setStep('import-wallet');
      setMintModalOpen(true);
      setStepIndex(0);
    }
  }, [userInfo]);

  const handleNavigateToProfile = () => {
    handleClose();
    navigate('/profile/account-setting');
  };

  const getStepComponent = () => {
    switch (step) {
      case 'verify-username-mail':
        return (
          <>
            <AccountSetting className="w-full" isModal={true} />
            <hr className="border-[#E9E9E9] h-[1px] w-full" />
            <div className="flex flex-col items-end w-full">
              <ButtonV2 className="!bg-[#F2F2F2] !text-[#B6B6B6]">Verify & continue</ButtonV2>
            </div>
          </>
        );
      case 'import-wallet':
        return (
          <>
            <WalletManagement className="w-full" isModal={true} onStepDone={onStepDone} />
          </>
        );
      case 'choose-chain-wallet':
        return <ChainAndWallet userAddress={userAddress || ''} onStepDone={onStepDone} />;
      case 'mint-sbt':
        return (
          <>
            {!isOpenSuccess && (
              <div className="flex flex-col p-10 gap-10 items-center rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center min-w-[140px] min-h-[140px] justify-center">
                    <CircularProgress />
                  </div>
                  <p className="font-medium text-2xl text-center text-black-1c ">Minting SBT...</p>
                  <p className="font-normal text-lg text-[#898989] ">
                    You need to Approve & Sign Metamask wallet to mint SBT{' '}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      default:
        return <></>;
    }
  };

  const onStepDone = (step: string, primaryWallet = '', computedWallets = ['']) => {
    const cloneStep = { ...stepDone };
    cloneStep[step] = true;
    setStepDone(cloneStep);
    const stepIndex = findIndex(remainingSteps, (s: Step) => s.id === step);
    if (stepIndex > -1 && stepIndex < remainingSteps.length - 1) {
      setStep(remainingSteps[stepIndex + 1].id);
    }
    if (step === 'choose-chain-wallet') {
      void onMint(primaryWallet, computedWallets);
    }
  };

  const onVerifyEmailModalClose = () => {
    setVerifyEmailModalOpen(!verifyEmailModalOpen);
    handleClose();
  };

  const startVerify = () => {
    setStep('verify-username-mail');
    setVerifyEmailModalOpen(false);
    setMintModalOpen(true);
  };

  const getRemainingSteps = () => {
    return filter(MINT_STEPS, (s) => s.index > stepIndex);
  };

  const remainingSteps = getRemainingSteps();

  const onStepClicked = (step: string, index: number): void => {
    if (index === 0) {
      setStep(remainingSteps[index].id);
      return;
    }
    const prevStep = remainingSteps[index - 1].id;
    if (!stepDone[prevStep]) {
      return;
    }

    setStep(step);
  };

  const mintSbt = useMintSbt();
  const [txHash, setTxHash] = useState('');

  const onMint = async (primaryWallet = '', computedWallets = ['']) => {
    try {
      setIsInprogress(true);

      const transactionHash = await mintSbt(appContext, primaryWallet, computedWallets);
      if (!!transactionHash) {
        console.log('Mint success!');
        setTxHash(transactionHash);
        setIsOpenSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.json) {
        const data = await error.json();
        toast.error(`Something wrong ${data}`);
      }
      setStep('choose-chain-wallet');
    }
    setIsInprogress(false);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(txHash);
    toast.success('Transaction Hash Copied !');
  };

  const handleViewOnBlockExplorer = () => {
    // TODO: Implement Dynamic chain
    window.open(`https://testnet-zkevm.polygonscan.com/tx/${txHash}`);
  };
  return (
    <>
      {!userInfo?.isVerifyEmail && !mintModalOpen && (
        <Dialog type={DialogTypes.None} open={verifyEmailModalOpen} handleClose={onVerifyEmailModalClose}>
          <div className="connect-wallet-modal p-4 w-[580px]">
            <div className="flex flex-col items-center justify-center ">
              <img src="/assets/images/verify.svg" />
              <div className="text-[24px] leading-[34px] text-[#1C1C1C] font-medium">
                You need to verify Username & Email to mint SBT
              </div>
            </div>
            <div className="features mt-6 justify-center">
              <ButtonV2 className="w-full" onClick={startVerify}>
                Verify now
              </ButtonV2>
            </div>
          </div>
        </Dialog>
      )}
      <Modal
        sx={{ padding: '24px' }}
        open={mintModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {isOpenSuccess && (
            <>
              <div className="w-full flex justify-between items-center">
                <p className="text-black-1c text-2xl font-medium">{'Mint SBT'}</p>
                <CloseIcon close={handleClose} />
              </div>
              <hr className="border-[#E9E9E9] h-[1px] w-full" />
              <div className="flex flex-col justify-center items-center gap-3">
                <div>
                  <img src="/assets/images/mint-success.svg" />
                </div>
                <div className="text-[24px] leading-[34px] font-medium text-[#1C1C1C]">Mint SBT successful</div>
                <div className="text-[18px] leading-[28px] font-normal text-[#898989]">
                  Congratulations of your successful mint Soulbound Token
                </div>
              </div>
              <div className="flex flex-col mt-3 w-[520px]">
                <div className="text-[#1C1C1C] font-medium text-[16px] leading-[26px]">Transaction ID</div>
                <div className="flex-grow mt-2">
                  <OctanInput
                    sx={{
                      '& input.Mui-disabled': {
                        WebkitTextFillColor: '#B6B6B6',
                      },
                    }}
                    fullWidth
                    disabled
                    InputProps={{
                      style: {
                        height: 48,
                        fontFamily: 'Centra No2',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '26px',
                        background: '#F2F2F2',
                        color: '#B6B6B6',
                      },
                      endAdornment: (
                        <InputAdornment position="end" onClick={handleCopyToClipboard}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.00156 14.3996L3.60156 14.3996C2.93882 14.3996 2.40156 13.8624 2.40156 13.1996L2.40156 4.39961C2.40156 3.29504 3.29699 2.39961 4.40156 2.39961L13.2016 2.39961C13.8643 2.39961 14.4016 2.93687 14.4016 3.59961L14.4016 5.99961M12.0016 21.5996L19.2016 21.5996C20.527 21.5996 21.6016 20.5251 21.6016 19.1996L21.6016 11.9996C21.6016 10.6741 20.527 9.59961 19.2016 9.59961L12.0016 9.59961C10.6761 9.59961 9.60156 10.6741 9.60156 11.9996L9.60156 19.1996C9.60156 20.5251 10.6761 21.5996 12.0016 21.5996Z"
                              stroke="#B6B6B6"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </InputAdornment>
                      ),
                    }}
                    value={txHash}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center gap-6">
                <Button
                  variant="outlined"
                  className="btn-outlined"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: 16,
                    fontFamily: 'Centra No2',
                    lineHeight: '26px',
                  }}
                  onClick={handleViewOnBlockExplorer}>
                  View on block explorer
                </Button>
                <ButtonV2 onClick={handleNavigateToProfile}>Go to SBT management</ButtonV2>
              </div>
            </>
          )}
          {!isOpenSuccess && (
            <>
              <div className="w-full flex justify-between items-center gap-6 h-6">
                <p className="text-black-1c text-2xl font-medium">{find(remainingSteps, (s) => step == s.id)?.name}</p>
                <CloseIcon close={handleClose} />
              </div>
              <hr className="border-[#E9E9E9] h-[1px] w-full" />
              <div className="w-full flex items-start gap-4 h-[50px]">
                {remainingSteps.map((s, index) => {
                  const isCurrentStep = step === s.id;
                  return (
                    <div
                      key={`step_${index}`}
                      onClick={() => onStepClicked(s.id, index)}
                      className={`box-border w-1/${remainingSteps.length} items-start pt-2 border-t-2 ${
                        isCurrentStep ? 'border-t-[#0DB774]' : 'border-t-[#E9E9E9]'
                      } cursor-pointer`}>
                      <div className="flex flex-row">
                        <p className="font-medium text-sm text-[#1C1C1C] leading-[22px]">Step {index + 1}</p>
                        <div className="ml-auto">
                          {stepDone[s.id] && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M14 7L8.03374 13L6 10.9548"
                                stroke="#00AA6C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="font-normal leading-[20px] text-xs text-[#5B5B5B]">{s.name}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!isOpenSuccess && getStepComponent()}
        </Box>
      </Modal>
    </>
  );
};
