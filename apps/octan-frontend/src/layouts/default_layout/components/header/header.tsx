import React, { useEffect, useLayoutEffect, useState } from 'react';

import { DefaultFcProps } from 'common';

import './header.scss';
import { Nav } from './nav';
import clsx from 'clsx';

export type HeaderProps = DefaultFcProps;

const stickyPosition = 200;

export const Header: React.FC<HeaderProps> = () => {
  const [isSticky, setIsSticky] = useState(false);

  useLayoutEffect(() => {
    const onScroll = (event: Event) => {
      if (window.pageYOffset > stickyPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSticky) {
      document.querySelector('.app-wrapper')?.classList?.add('mt-[80px]');
    } else {
      document.querySelector('.app-wrapper')?.classList?.remove('mt-[80px]');
    }
  }, [isSticky]);

  return (
    <div className={clsx('app-header-v2 flex justify-between', isSticky && 'fixed sticky-header z-10 top-0')}>
      <Nav />
    </div>
  );
};
