import { useAppContext } from 'contexts';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Waiting } from 'shared-components';
import { DefaultFcProps, useClassName } from '../../common';
import { Footer, Header } from './components';

import './default-layout.scss';

export type DefaultLayoutProps = DefaultFcProps;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ className }) => {
  const { isWaiting } = useAppContext();
  const combinedClassName = useClassName('app-wrapper', className);

  return (
    <>
      <div className={combinedClassName}>
        <Header />
        <div className="app-content">
          <Outlet />
        </div>
        <Footer />
      </div>
      {isWaiting && <Waiting />}
    </>
  );
};
