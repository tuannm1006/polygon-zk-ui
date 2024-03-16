import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { compose } from 'ramda';

import { DefaultLayout } from 'layouts';
import { DefaultFcProps } from 'common';
import { chainIds, DialogTypes, Loading, ModalConnect } from 'shared-components';
import { showModalActions, withModal, withReactQuery } from './helpers';
import { withMuiTheme } from 'mui-theme';
import { withRouter, routes } from '../routes';

import './app.scss';
import { web3 } from 'contracts';
import { convertSearchParamsToObject, useEmit, withEventEmitter } from 'utils';
import { useAppContext, withAppProvider, withWeb3Provider } from 'contexts';
// import { Web3Modal } from "@web3modal/react";
import {
  listWeb3Events,
  // wagmiClient,
  // PROJECT_ID,
  // ethereumClient,
} from 'utils';
import { USING_TESTNET } from 'consts';
// import { WagmiConfig } from 'wagmi';
import { Toaster } from 'react-hot-toast';

export type AppProps = DefaultFcProps;

const BaseApp: React.FC<AppProps> = (props) => {
  const {
    loggedIn,
    selectedChainId,
    selectedChain,

    signOut,
  } = useAppContext();
  const emit = useEmit();
  const [isOpenModalConnect, setIsOpenModalConnect] = useState(false);

  useEffect(() => {
    const searchObj = convertSearchParamsToObject(location.search);
    if (searchObj?.ref) {
      localStorage.setItem('REFERRAL_CODE', searchObj?.ref);
    }
  }, [location.search]);

  useEffect(() => {
    switch (selectedChainId) {
      case chainIds.tron:
        break;

      default:
        if (web3.currentProvider) {
          listWeb3Events(web3.currentProvider, {
            chainChanged(chainId) {
              const requireChainId = Number(USING_TESTNET ? selectedChain?.chain_id_testnet : selectedChain?.chain_id);
              if (Number(chainId) === requireChainId) return;
              signOut();
            },
            onDisconnect: signOut,
          });
        } else {
          emit({
            action: showModalActions.showWarning,
            type: DialogTypes.Error,
            title: 'Warning',
            subTitle: 'Please install MetaMask',
          });
        }
        break;
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsOpenModalConnect(false);
    } else
      switch (selectedChainId) {
        case chainIds.aurora:
        case chainIds.bttc:
        case chainIds.bsc:
        case chainIds.polygon_zk:
          // setIsOpenModalConnect(true);
          break;
      }
  }, [loggedIn]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<DefaultLayout />}>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        toastOptions={{
          className: 'toast-style',
          position: 'bottom-right',
          duration: 5000,
        }}
      />
      {isOpenModalConnect && <ModalConnect open={isOpenModalConnect} onClose={() => setIsOpenModalConnect(false)} />}
      {/* <WagmiConfig client={wagmiClient}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='*' element={<DefaultLayout />}>
              {routes.map((route, index) => (<Route key={index} {...route} />))}
            </Route>
          </Routes>
        </Suspense>
      </WagmiConfig> */}
      {/* <Web3Modal
        projectId={PROJECT_ID}
        ethereumClient={ethereumClient}
      /> */}
    </>
  );
};

export const App = compose(
  withEventEmitter,
  withReactQuery,
  withAppProvider,
  withWeb3Provider,
  withMuiTheme,
  withRouter,
  withModal
)(BaseApp);
