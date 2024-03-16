import { TextField } from '@mui/material';
import { USING_TESTNET } from 'consts';
import { useAppContext } from 'contexts';
import { Chain } from 'services';
import { ButtonCopyToClipboard, chainIds, Dialog, DialogTypes, GradientButton } from 'shared-components';

const getTxUrl = (txHash: string, selectedChain: Chain) => {
  if (!selectedChain) return '';
  switch (selectedChain.id) {
    case chainIds.bsc:
    case chainIds.bttc:
    case chainIds.aurora:
    case chainIds.polygon_zk:
      return (USING_TESTNET ? selectedChain.testnet_url : selectedChain.url) + `tx/${txHash}`;
    case chainIds.tron:
      return (USING_TESTNET ? selectedChain.testnet_url : selectedChain.url) + `#/transaction/${txHash}`;
  }
};

export const DialogMintSuccess: React.FC<{
  txHash: string | undefined;
  open: boolean;
  handleClose: () => void;
}> = ({ txHash, open, handleClose }) => {
  const { selectedChain } = useAppContext();

  return !!txHash && !!selectedChain ? (
    <Dialog
      type={DialogTypes.Success}
      open={open}
      handleClose={handleClose}
      title={'Successfully'}
      subTitle={'Congratulations of your successful mint Soulbound Token'}>
      <div className="flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <div className="w-[150px]">Transaction ID</div>
            <div className="flex-grow">
              <TextField
                id="txHash"
                value={txHash}
                InputProps={{
                  endAdornment: <ButtonCopyToClipboard val={txHash} />,
                }}
                variant="outlined"
                color="primary"
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[150px]">&nbsp;</div>
            <a className="linear-text font-bold" target={'_blank'} href={getTxUrl(txHash, selectedChain)}>
              View on block explorer
            </a>
          </div>
        </div>
        <GradientButton fullWidth onClick={handleClose}>
          Close
        </GradientButton>
      </div>
    </Dialog>
  ) : null;
};
