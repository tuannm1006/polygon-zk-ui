import React from 'react';
import { DefaultFcProps } from '../../../../common';
import { FooterInformation } from './components';

import classes from './footer.module.scss';

export type FooterProps = DefaultFcProps;

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="app-footer">
      <div className="nav">
        <FooterInformation />
        {/* <div className={[classes.footerCopyRight, 'flex items-center justify-center'].join(' ')}>
          Copyright © 2023 Octan. All rights reserved
        </div> */}
      </div>
    </footer>
  );
};
