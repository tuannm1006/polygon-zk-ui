import { DefaultFcProps } from 'common';
import {
  GradientButton,
  Modal,
  OutlinedGradientButton,
} from 'shared-components';
import { useCurrentNetwork } from 'utils';

type ConfirmMintTokenProps = DefaultFcProps & {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

export const ConfirmMintToken: React.FC<ConfirmMintTokenProps> = ({
  className,
  open,
  handleClose,
  onConfirm,
}) => {
  const currentNetwork = useCurrentNetwork()

  return (
    <Modal
      className={className}
      open={open}
      handleClose={handleClose}
      hasClose={false}>
      <i className={`octan-icon octan-icon--warning-xl mx-auto`}></i>
      <div className="font-bold text-4xl text-center mt-6 mb-2 text-white">Confirm Mint</div>
      <div className="font-medium text-3xl text-center mb-6">Do you want to Mint soulbound token in</div>
      <div className="font-bold text-3xl text-center linear-text mb-6">{currentNetwork.name}</div>
      <div className='my-12 flex flex-row gap-6 justify-center'>
        <OutlinedGradientButton className='w-[200px] h-[48px]' onClick={handleClose}>CLose</OutlinedGradientButton>
        <GradientButton onClick={onConfirm}>Mint SBT -&gt;</GradientButton>
      </div>
    </Modal>
  );
};
