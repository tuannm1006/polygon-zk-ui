import { DefaultFcProps, RANKING_TABS, SELECT_ROWS_OPTIONS } from 'common';
import { useAppContext } from 'contexts';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonV2 } from 'shared-components';
import { convertObjectToSearchParams, convertSearchParamsToObject, extractFilterParams } from 'utils';
import banner from '../../asserts/images/banner/bottom_banner.webp';
import bannerMobile from '../../asserts/images/banner/CTA_banner_mobile.webp';
import AddressRanking from './components/address/address-ranking';
import { BannerV2 } from './components/banner-v2';
import ProjectRanking from './components/project/project-ranking';
import SbtOwnersRanking from './components/sbt-owners/sbt-owners-ranking';
import SelectField from './components/select-field';
import Tabs from './components/tabs';
import { debounce } from 'lodash';
import './ranking-board.scss';

export type RankingBoardProps = DefaultFcProps;

// interface IFilter {
//   textSearch: string;
//   pageSize: number;
// }

export const RankingBoardV3: FC<RankingBoardProps> = (props) => {
  const location = useLocation();

  // const [currentTab, setCurrentTab] = useState(RANKING_TABS.ADDRESS);
  // const [filter, setFilter] = useState<IFilter>(extractFilterParams(location.search));

  const filter = extractFilterParams(decodeURI(location.search));

  const navigate = useNavigate();

  const { userAddress } = useAppContext();

  // useEffect(() => {
  //   if (location.search && location.search.length > 0) {
  //     const params = convertSearchParamsToObject(location.search);

  //     setFilter((prev: IFilter) => ({
  //       pageSize: params.rows ? +params.rows : prev.pageSize,
  //       textSearch: params.address ? decodeURI(params.address) : '',
  //     }));
  //   }
  // }, [location.search]);

  const handleContactUs = () => {
    window.open('https://octan.network/blog/contact-us/', '_blank', 'noreferrer');
  };

  const getCurrentTab = (): string => {
    const obj = convertSearchParamsToObject(location.search);
    return obj.tab ?? RANKING_TABS.address;
  };

  const handleAddressSearchChanged = debounce((val: string) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, address: val })}`, {
      replace: true,
    });
  });

  const handleProjectSearchChanged = debounce((val: string) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, project: val })}`, {
      replace: true,
    });
  }, 1000);

  const handleProjectPageChanged = (page: number) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, page: page })}`, {
      replace: true,
    });
  };

  const handleAddressPageChanged = (page: number) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, page: page })}`, {
      replace: true,
    });
  };

  const handleSbtOwersUsernameChanged = (username: string) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, username })}`, {
      replace: true,
    });
  };

  const handleSbtOwnersPageChanged = (page: number) => {
    const obj = convertSearchParamsToObject(location.search);
    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, page: page })}`, {
      replace: true,
    });
  };

  const onTabChanged = (tab: string) => {
    const obj = convertSearchParamsToObject(location.search);

    navigate(`${location.pathname}${convertObjectToSearchParams({ rows: obj.rows, tab: tab })}`, {
      replace: true,
    });
  };

  return (
    <div className="content">
      <div className="ranking-board">
        <BannerV2 />
        <div className="ranking-table-container">
          <div className="flex lg:items-center justify-between mt-[20px] lg:mt-[60px] pb-[10px] border-b-[1px] border-chain mb-[10px]  flex-col lg:flex-row">
            <Tabs currentTab={getCurrentTab()} setCurrentTab={onTabChanged} />

            <div className="flex items-center mt-[20px] lg:mt-0">
              <p className="mr-[8px] text-[14px] font-normal leading-[22px] text-black">Show rows</p>

              <div className="lg:mr-[16px] w-[65px] h-[40px]">
                <SelectField
                  options={SELECT_ROWS_OPTIONS}
                  value={filter.pageSize}
                  onChange={(e: any) => {
                    const obj = convertSearchParamsToObject(location.search);
                    navigate(`${location.pathname}${convertObjectToSearchParams({ ...obj, rows: e.target.value })}`, {
                      replace: true,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          {getCurrentTab() === RANKING_TABS.address && (
            <AddressRanking
              filter={filter}
              userAddress={userAddress}
              onSearchChanged={handleAddressSearchChanged}
              text={filter.textSearch}
              onPageChanged={handleAddressPageChanged}
            />
          )}

          {getCurrentTab() === RANKING_TABS.project && (
            <ProjectRanking
              filter={filter}
              onSearchChanged={handleProjectSearchChanged}
              onPageChanged={handleProjectPageChanged}
            />
          )}

          {getCurrentTab() === RANKING_TABS.sbt_owner && (
            <SbtOwnersRanking
              filter={filter}
              onSearchChanged={handleSbtOwersUsernameChanged}
              username={filter.textSearch}
              onPageChanged={handleSbtOwnersPageChanged}
            />
          )}
        </div>

        <div
          className="flex sm:hidden w-full h-[480px] justify-center my-[56px]"
          style={{
            backgroundImage: `url(${bannerMobile})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className="flex flex-col items-center gap-8 max-w-[311px] px-4 pt-10 max-[320px]:pt-[80px]">
            <div className="self-stretch text-center text-xl font-medium font-['Centra_No2'] text-white max-[320px]:text-base">
              Supercharge your web3 marketing strategies with Octan Network Analytics. Perfect for blockchain projects,
              marketing agencies, venture capital firms, and crypto teams. Get actionable insights today!
            </div>
            <button
              onClick={handleContactUs}
              className="rounded-sm py-[11px] px-5 border-[#A8AEBA] text-white bg-[#0DB774] text-lg font-['Centra_No2'] leading-[26px] hover:border-[#A8AEBA] hover:bg-[#0A8D5A] disabled:bg-[#F2F2F2]">
              Contact us
            </button>
          </div>
        </div>

        <div
          className="hidden sm:flex w-full h-[300px] xl:h-[380px] justify-center my-20 px-[100px] pt-10 xl:pt-[62px] xl:px-[217px]"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className="flex flex-col max-w-[846px] gap-4 sm:gap-8 items-center">
            <div className="flex text-center text-xl xl:text-[34px] font-['Centra_No2'] font-medium text-white leading-tight">
              Supercharge your web3 marketing strategies with Octan Network Analytics. Perfect for blockchain projects,
              marketing agencies, venture capital firms, and crypto teams. Get actionable insights today!
            </div>
            <button
              onClick={handleContactUs}
              className="rounded-sm max-[550px]:py-1 max-[550px]:px-2 py-[11px] px-5 border-[#A8AEBA] text-white bg-[#0DB774] text-lg font-['Centra_No2'] leading-[26px] hover:border-[#A8AEBA] hover:bg-[#0A8D5A] disabled:bg-[#F2F2F2]">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBoardV3;
