import { FC } from 'react';
import { showModalActions } from '../../app/helpers';
import { ButtonV2, DialogTypes } from 'shared-components';
import { chainIds } from 'consts';
import { useEmit } from 'utils';
import { useAppContext, useWeb3Context } from 'contexts';
import { DefaultFcProps } from 'common';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import { ArrowRight } from 'shared-components';

export const ButtonConnect: FC<DefaultFcProps> = ({ title, className, arrow = false }) => {
  const { selectedChainId, setIsWaiting } = useAppContext();
  const emit = useEmit();
  const { connectWalletWithBe } = useWeb3Context();

  const onConnectWallet = async () => {
    try {
      if (selectedChainId === chainIds.none) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: 'You need to select network first.',
        });
      } else {
        setIsWaiting(true);
        await connectWalletWithBe();
        setIsWaiting(false);
        toast.success('Connect Metamask successful');
      }
    } catch (error) {
      setIsWaiting(false);
      toast.error('Connect Metamask unsuccessful');
      console.log('error', error);
    }
  };

  // return (
  //   <Web3Button />
  // )

  // return <GradientButton
  //   className='border-solid rounded border-white'
  //   onClick={onConnectWallet}>Connect wallet</GradientButton>

  return (
    <ButtonV2 className={classNames('border-solid rounded border-white w-full', className)} onClick={onConnectWallet}>
      {title}
      {arrow && <ArrowRight color="#F7F9FB" />}
    </ButtonV2>
  );
};
