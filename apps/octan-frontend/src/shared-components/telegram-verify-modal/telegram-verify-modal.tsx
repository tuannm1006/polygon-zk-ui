import { DefaultFcProps } from 'common';
import React, { useState } from 'react';
import { Dialog, DialogTypes } from '../dialog';
import { Box, Button, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { OctanInput } from '../octan-input';
import { copyToClipboard, logError } from 'utils';
import { ButtonV2 } from '../button-v2';
import { getApi } from 'swagger';
import { toJson } from '@octan/common';
import toast from 'react-hot-toast';

export type TelegramVerifyModalProps = {
  open: boolean;
  onClose: () => void;
} & DefaultFcProps;

export const TelegramVerifyModal: React.FC<TelegramVerifyModalProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [username, setUsername] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const handleUsernamChanged = (e: any) => {
    setUsername(e.target.value);
  };

  const CopyIcon = () => {
    return (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.99922 9.79922L2.19922 9.79922C1.70216 9.79922 1.29922 9.39628 1.29922 8.89922L1.29922 2.79922C1.29922 1.69465 2.19465 0.799219 3.29922 0.799219L9.39922 0.79922C9.89627 0.79922 10.2992 1.20216 10.2992 1.69922L10.2992 3.49922M8.49922 15.1992L13.8992 15.1992C14.8933 15.1992 15.6992 14.3933 15.6992 13.3992L15.6992 7.99922C15.6992 7.00511 14.8933 6.19922 13.8992 6.19922L8.49922 6.19922C7.5051 6.19922 6.69922 7.00511 6.69922 7.99922L6.69922 13.3992C6.69922 14.3933 7.5051 15.1992 8.49922 15.1992Z"
          stroke="#F7F9FB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const handleGenerateCode = async () => {
    try {
      const { verificationCode } = await getApi()
        .linkSocialGenCodePost({
          provider: 'telegram',
          username: username,
        })
        .then(toJson)
        .catch(logError('handleGenerateCode.linkSocialGenCodePost'));

      setVerifyCode(verificationCode);
    } catch (error: any) {
      toast.error('error : ', error);
    }
  };

  const handleGoToOctanBot = () => {
    window.open(`https://t.me/oneid_testing_bot`, '_blank');
  };

  const steps = [
    {
      label: 'Enter your telegram username',
      component: (
        <OctanInput
          sx={{ width: '508px', height: '48px' }}
          value={username}
          onChange={handleUsernamChanged}
          placeholder="Ex. @John123"></OctanInput>
      ),
    },
    {
      label: 'Generate code verify and Copy code',
      component: (
        <div className="flex flex-row gap-3">
          <div className="flex">
            <div className="w-[344px] px-4 py-3 bg-[#F2F2F2] text-base text-[#B6B6B6] rounded">{verifyCode}</div>
            <button
              onClick={() => copyToClipboard(verifyCode)}
              className="flex items-center gap-x-2 pr-[20px] pl-[16px] py-[11px] h-[48px] bg-[#0DB774] rounded-sm">
              <CopyIcon />
            </button>
          </div>

          <div className="ml-auto">
            <ButtonV2 className="" onClick={handleGenerateCode}>
              Generate Code
            </ButtonV2>
          </div>
        </div>
      ),
    },
    {
      label: 'Go to Octan bot and Paste generated code to verify your Telegram.',
      component: (
        <div>
          <ButtonV2 className="" onClick={handleGoToOctanBot}>
            Go to Octan bot
          </ButtonV2>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      className="p-10 w-[628px]"
      type={DialogTypes.None}
      open={open}
      handleClose={onClose}
      title="Verify Telegram">
      <div className="mt-10">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
                {step.label}
              </StepLabel>
              <StepContent>
                <div>{step.component}</div>

                <Box sx={{ mb: 2, mt: 4 }}>
                  <div>
                    {index < steps.length - 1 && (
                      <ButtonV2 onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        {'Continue'}
                      </ButtonV2>
                    )}

                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </Dialog>
  );
};
