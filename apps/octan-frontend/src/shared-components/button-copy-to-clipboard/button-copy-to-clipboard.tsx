import { IconButton, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { copyToClipboard } from 'utils';

export const ButtonCopyToClipboard: FC<{
  val: string;
}> = ({ val }) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const toggleTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 500);
  };

  return (
    <Tooltip open={openTooltip} title="copied!">
      <IconButton
        onClick={() => {
          toggleTooltip();
          copyToClipboard(val);
        }}>
        <i className="octan-icon octan-icon--copy" />
      </IconButton>
    </Tooltip>
  );
};
