import { Container } from '@mui/material';
import { lazyLoadThenCreateElement } from 'common';
import { ButtonV2 } from 'shared-components';
import arrow from '../asserts/images/arrow-right.svg';
import background from '../asserts/images/background-not-found.svg';
import stop from '../asserts/images/found_404.svg';
const Home = lazyLoadThenCreateElement(() => import('pages'), 'Home');
const Profile = lazyLoadThenCreateElement(() => import('pages'), 'Profile');
const RankingBoard = lazyLoadThenCreateElement(() => import('pages'), 'RankingBoardV3');

export const routes = [
  { path: '', element: RankingBoard },
  { path: '1-id', element: Home },
  { path: '1-id/:slug', element: Home },
  { path: 'reputation-board', element: RankingBoard },
  { path: 'profile/:slug', element: Profile },
  {
    path: '*',
    element: (
      <Container className="app-content-1 h-full" maxWidth="xl">
        <div className="py-[112px] flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-[80px]">
            <div className="relative flex items-center justify-center min-w-[274px] min-h-[114px]">
              <img src={background} alt="Background not found" />
              <img className="absolute" src={stop} alt="Icon not found" />
            </div>
            <div className="max-w-[628px]">
              <p className="text-[#1C1C1C] text-center text-2xl font-medium">
                This page doesn’t exist. Please check your URL or return to Homepage
              </p>
            </div>
          </div>
          <a href="https://octan.network/">
            <ButtonV2 className="gap-2">
              Go to Homepage
              <img src={arrow} alt="Arrow right" />
            </ButtonV2>
          </a>
        </div>
      </Container>
    ),
  },
];
