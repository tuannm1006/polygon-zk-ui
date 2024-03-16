import styled from '@emotion/styled';
import { ButtonUnstyled } from '@mui/base';
import { useClassName } from 'common';
import { useState } from 'react'; // import state
import { ButtonConnect } from 'shared-components';
import { MenuItems } from './menu-items';
import { useAppContext } from 'contexts';

export const HamburgerMenu = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { loggedIn } = useAppContext();
  return (
    <div className="flex items-center">
      <ButtonUnstyled onClick={() => setIsNavOpen((opened) => !opened)}>
        <div className="flex flex-col items-center justify-center gap-y-1 h-7 w-7">
          <div
            className={useClassName(
              'h-0.5 w-5 bg-black rounded-sm transform transition duration-500 ease-in-out',
              isNavOpen ? 'rotate-45 translate-y-1.5' : ''
            )}></div>
          <div
            className={useClassName(
              'h-0.5 w-5 bg-black rounded-sm transform transition duration-500 ease-in-out',
              isNavOpen ? 'opacity-0' : ''
            )}></div>
          <div
            className={useClassName(
              'h-0.5 w-5 bg-black rounded-sm transform transition duration-500 ease-in-out',
              isNavOpen ? '-rotate-45 -translate-y-1.5' : ''
            )}></div>
        </div>
      </ButtonUnstyled>
      {isNavOpen && (
        <MobileMenu>
          <div className="flex flex-col text-lg gap-y-6 font-semibold">
            <MenuItems onClick={() => setIsNavOpen(false)} isHamburger={true} />
          </div>
          {!loggedIn && (
            <div className="mt-10">
              <ButtonConnect title="Connect wallet" />
            </div>
          )}
        </MobileMenu>
      )}
    </div>
  );
};

const MobileMenu = styled.div`
  position: absolute;
  top: 54px;
  right: 0;
  height: 100vh;
  width: 100%;
  background: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 40px 16px;
`;
