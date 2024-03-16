import clsx from 'clsx';
import { useAppContext } from 'contexts';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HtmlTooltip, ResourceSelect } from 'shared-components';
import { dataTopMenu as items } from '../helpers';

type MenuItemsProps = {
  isHamburger?: boolean;
  onClick?: () => void;
};

export const MenuItems = ({ isHamburger, onClick }: MenuItemsProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const { loggedIn } = useAppContext();
  const getActiveNavClass = (isActive: boolean) => {
    if (isActive) {
      if (isHamburger) {
        return 'nav-m-active';
      }
      return 'nav-active';
    }

    return 'pl-8';
  };

  const renderMenuItems = () => {
    return items.map((menuItem) => {
      if (menuItem.loginRequired && !loggedIn) {
        return <React.Fragment key={menuItem.id}></React.Fragment>;
      }
      if (menuItem.disabled) {
        return (
          <div key={menuItem.id} className={clsx('nav-disabled', isHamburger && 'pl-8')}>
            <HtmlTooltip title="Coming soon" arrow={true} placement="top">
              <span>{menuItem.text}</span>
            </HtmlTooltip>
          </div>
        );
      }

      // if (menuItem.text === '1ID Dashboard') {
      //   console.log(menuItem.externalUrl);
      //   return (
      //     <a
      //       key={menuItem.id}
      //       href={menuItem.externalUrl}
      //       title={menuItem.title || menuItem.text}
      //       target="_blank"
      //       rel="noreferrer"
      //       onClick={onClick}
      //       className={clsx('relative', isHamburger && 'pl-8', 'flex items-center')}>
      //       <div className="bg-[#0DB744] px-1 rounded absolute top-[18px] right-[-8.5px] text-white text-xs">Beta</div>
      //       <div className="hover:!text-[#0db774] text-sm">{menuItem.text}</div>
      //     </a>
      //   );
      // }

      return menuItem.text === 'Resources' ? (
        !isHamburger ? (
          <ResourceSelect
            options={[
              { label: 'Documents', value: 1 },
              { label: 'Blog', value: 2 },
            ]}
            placeholder="Resources"
          />
        ) : (
          <div className="flex flex-col">
            <div
              className={clsx('flex gap-1 items-center pl-8', openSelect && 'text-[#0db774]')}
              onClick={() => setOpenSelect(!openSelect)}>
              Resources
              <div className="pb-1">
                {!openSelect && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.2002 6.39998L8.0002 9.59998L4.8002 6.39997"
                      stroke={openSelect ? '#0DB774' : '#898989'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {openSelect && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.19922 14.4001L11.9992 9.6001L16.7992 14.4001"
                      stroke={openSelect ? '#0DB774' : '#898989'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            {openSelect && (
              <div className="flex flex-col !text-base gap-3 pt-3">
                <a
                  href="https://docs.octan.network/"
                  title={menuItem.title || menuItem.text}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(isHamburger && 'pl-8')}>
                  <div className="hover:!text-[#0db774] text-sm">Documents</div>
                </a>
                <a
                  href="https://octan.network/blog/"
                  title={menuItem.title || menuItem.text}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(isHamburger && 'pl-8')}>
                  <div className="hover:!text-[#0db774] text-sm">Blog</div>
                </a>
              </div>
            )}
          </div>
        )
      ) : menuItem.isInternalUrl ? (
        <NavLink
          key={menuItem.id}
          to={menuItem.url}
          title={menuItem.title || menuItem.text}
          onClick={onClick}
          className={({ isActive }) => {
            if (!isActive && menuItem.pattern) {
              isActive = new RegExp(menuItem.pattern).test(document.location.pathname);
            }
            return clsx('flex items-center', menuItem.text && 'relative', getActiveNavClass(isActive));
          }}>
          {menuItem.text === '1ID Dashboard' && (
            <>
              <div className="bg-[#0DB744] px-1 rounded absolute top-[18px] right-[-8.5px] text-white text-xs min-[1200px]:hidden">
                Beta
              </div>

              <div className="hidden bg-[#0DB744] px-1 rounded absolute bottom-[10px] left-0 text-white text-xs min-[1200px]:block">
                Beta Mainnet
              </div>
            </>
          )}
          <div className="hover:!text-[#0db774] text-sm">{menuItem.text}</div>
        </NavLink>
      ) : (
        <a
          key={menuItem.id}
          href={menuItem.externalUrl}
          title={menuItem.title || menuItem.text}
          target="_blank"
          rel="noreferrer"
          onClick={onClick}
          className={clsx(isHamburger && 'pl-8', 'flex items-center')}>
          <div className="hover:!text-[#0db774] text-sm">{menuItem.text}</div>
        </a>
      );
    });
  };

  return <>{renderMenuItems()}</>;
};
