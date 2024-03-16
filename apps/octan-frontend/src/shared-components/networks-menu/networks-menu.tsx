import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { mdiChevronDown } from '@mdi/js';
import clsx from 'clsx';

import './networks-menu.scss';
import Icon from '@mdi/react';
import { useCurrentNetwork, useEmit } from 'utils';
import { showModalActions } from '../../app/helpers';
import { DialogTypes } from 'shared-components';
import { useAppContext } from 'contexts';
import { Chain } from 'services';

export const NetworksMenu = () => {
  const {
    chains = [],
    setSelectedChainId,
    signOut,
  } = useAppContext()
  const networks = useMemo(() => chains.filter((chain) => chain.visible), [chains]);
  const selectedNetWork = useCurrentNetwork()

  const emit = useEmit();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onSelectNetWork = (network: Chain) => () => {
    if (network.enable) {
      setSelectedChainId(network.id);
      signOut()
    } else {
      emit({
        action: showModalActions.showWarning,
        type: DialogTypes.Error,
        title: 'Warning',
        subTitle: 'Not support at the moment',
      });
    }
    handleCloseUserMenu();
  };

  return selectedNetWork ? (
    <div className="flex items-center gap-6">
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} className="network-menu-dropdown flex gap-2" title={selectedNetWork.name}>
          {selectedNetWork.icon && (
            <img className="rounded-full" src={selectedNetWork.icon} alt="social network icon" />
          )}
          <span className="hidden lg:block text-white text-lg">{selectedNetWork.name}</span>
          <Icon path={mdiChevronDown} size={1} color="#fff" />
        </IconButton>
        {anchorElUser && (
          <Menu
            sx={{ mt: ['24px', '24px', '45px'] }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {networks
              .filter((network) => network.id !== '-1')
              .map((network) => (
                <MenuItem key={network.id} onClick={onSelectNetWork(network)}>
                  <div className="network-menu-item flex items-center gap-2 w-full" title={network.name}>
                    {network.icon && <img className="rounded-full" src={network.icon} alt="network icon" />}
                    <span className={clsx('hidden lg:block', network.enable ? 'text-white' : 'text-gray', network.id === selectedNetWork.id && 'linear-text')}>
                      {network.name}
                    </span>
                  </div>
                </MenuItem>
              ))}
          </Menu>
        )}
      </Box>
    </div>
  ) : null;
};
