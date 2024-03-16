import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';

export type LeftMenuProps = DefaultFcProps;

export function LeftArrow({ width = '24px', height = '24px', color = '#fff' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.59 23.89a1.4 1.4 0 01-1.98 0l-8.4-8.4a1.4 1.4 0 010-1.98l8.4-8.4a1.4 1.4 0 111.98 1.98L7.58 13.1H23.8a1.4 1.4 0 010 2.8H7.58l6.01 6.01a1.4 1.4 0 010 1.98z"
        fill={color}
      />
    </svg>
  );
}

export const LeftMenu: React.FC<LeftMenuProps> = ({ className }) => {
  const { userInfo, hasSBT, hasRevokedSbt } = useAppContext();

  const links: {
    id: string;
    to: string;
    title: string;
    disabled?: boolean;
  }[] = useMemo(() => {
    return [
      { id: '1', to: '/profile/account-setting', title: 'Profile' },
      { id: '2', to: '/profile/wallet-management', title: 'Wallets' },
      { id: '3', to: '/profile/sbts-management', title: 'Soulbound 1ID' },
      { id: '4', to: '/profile/my-referral', title: 'Referral' },
      // { id: '5', to: '/profile/social-profile', title: 'Social profile', disabled: true },
      // { id: '6', to: '/profile/kyc', title: 'KYC', disabled: true },
      // { id: '7', to: '/profile/communities', title: 'Communities', disabled: true },
    ];
  }, [userInfo, hasSBT, hasRevokedSbt]);

  return (
    <div className={className}>
      {/* <div>
        <Link className="font-bold text-2xl py-10 flex items-center text-white" to="/">
          <LeftArrow />
          <span className="ml-2">Back</span>
        </Link>
      </div> */}
      <div className="flex flex-col rounded-2xl pt-10 label-text">
        <h1 className="font-bold text-black text-[34px] px-6 pb-2">Account Management</h1>
        <div className="flex">
          {links.map(
            (link, i) => (
              <NavLink
                key={`nav-${i}`}
                className={({ isActive }) =>
                  clsx(
                    'flex justify-center items-center text-lg px-6 py-4 block',
                    { 'nav-active': isActive },
                    link.disabled && 'opacity-[0.5] pointer-events-none',
                    'hover:text-[#0db774]'
                  )
                }
                to={link.to}>
                {link.title}
              </NavLink>
            )
            // <>
            //   <a
            //     className="flex justify-center items-center text-lg px-6 py-4 block"
            //     key={link.id}
            //     href={link.to}
            //     title={link.title}
            //     rel="noreferrer">
            //     {link.title}
            //   </a>
            // </>
          )}
        </div>
      </div>
    </div>
  );
};
