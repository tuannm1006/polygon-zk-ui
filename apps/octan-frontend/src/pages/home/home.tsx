import { Container } from '@mui/material';
import { DefaultFcProps } from 'common';
import dayjs from 'dayjs';
import { Panel, UserInformation, UserInformationBySlug } from 'shared-components';
import { useAppContext } from 'contexts';
import { isNotEmpty } from '@octan/common';
import { useEffect, useState } from 'react';
import { DataKeys } from 'consts';
import { getRankingsDashboard, createDummyData } from 'services';
import banner from '../../asserts/images/1id/Octan-banner.png';
import StatisticChart from './components/statistic-chart/statistic-chart';
import { useParams } from 'react-router-dom';
import StatisticChartBySlug from './components/statistic-chart-by-slug/statistic-chart-by-slug';

const mapIndex = (items: any[], dataKey: string) =>
  items.map(({ [dataKey]: value, timeframe_pivot, ...item }, index) => ({
    index: index + 1,
    timeDisplay: dayjs(timeframe_pivot).format('YYYY-MM-DD HH:mm'),
    value,
    ...item,
  }));

export type HomeProps = DefaultFcProps;

export const Home: React.FC<HomeProps> = () => {
  const { userAddresses = [], loggedIn, hasSBT, userInfo } = useAppContext();

  // const [totalTransactions, setTotalTransactions] = useState<any[]>([]);
  // const [totalGasSpent, setTotalGasSpent] = useState<any[]>([]);
  // const [totalDegree, setTotalDegree] = useState<any[]>([]);
  // const [totalReputationScore, setTotalReputationScore] = useState<any[]>([]);
  const [userBySlugData, setUserBySlugData] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    if (slug === undefined) return;
    const fetchBlogBySlug = async () => {
      try {
        const res = await fetch(`https://1id-testing-v2.octan.network/users/${slug}?timeframe_type=year`);
        const jsonResponse = await res.json();
        setUserBySlugData(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogBySlug();
  }, [slug]);

  useEffect(() => {
    // if (loggedIn && hasSBT) {
    //   Promise.all([
    //     getRankingsDashboard(userAddresses, DataKeys.total_transactions),
    //     getRankingsDashboard(userAddresses, DataKeys.total_gas_spent),
    //     getRankingsDashboard(userAddresses, DataKeys.total_degree),
    //     getRankingsDashboard(userAddresses, DataKeys.total_reputation_score),
    //   ]).then((chartData) => {
    //     setTotalTransactions(
    //       isNotEmpty(chartData[0].data) ? mapIndex(chartData[0].data, DataKeys.total_transactions) : createDummyData()
    //     );
    //     setTotalGasSpent(
    //       isNotEmpty(chartData[1].data) ? mapIndex(chartData[1].data, DataKeys.total_gas_spent) : createDummyData()
    //     );
    //     setTotalDegree(
    //       isNotEmpty(chartData[2].data) ? mapIndex(chartData[2].data, DataKeys.total_degree) : createDummyData()
    //     );
    //     setTotalReputationScore(
    //       isNotEmpty(chartData[3].data)
    //         ? mapIndex(chartData[3].data, DataKeys.total_reputation_score)
    //         : createDummyData()
    //     );
    //   });
    // } else {
    //   const dummyData = createDummyData();
    //   setTotalTransactions(dummyData);
    //   setTotalGasSpent(dummyData);
    //   setTotalDegree(dummyData);
    //   setTotalReputationScore(dummyData);
    // }
  }, [loggedIn, hasSBT]);

  return (
    <>
      <Container className="app-content home-page !max-w-none !flex items-start !px-[80px] !m-0">
        <Panel className="flex flex-row w-full max-w-[1280px] bg-transparent mx-auto gap-6">
          <Panel className="w-full flex flex-col flex-start max-w-[954px] bg-transparent">
            <Panel className="flex flex-col flex-start lg:flex-row gap-6 p-6 mt-10 min-h-[521px] bg-white">
              {Object.keys(userBySlugData).length > 2 && userInfo?.username !== slug ? (
                <UserInformationBySlug
                  className="w-full lg:w-3/5"
                  loggedIn={loggedIn}
                  userBySlugData={userBySlugData}
                />
              ) : (
                <UserInformation className="w-full lg:w-3/5" loggedIn={loggedIn} />
              )}
              {/* <UserStatus className="w-full lg:w-3/5" loggedIn={loggedIn} /> */}
            </Panel>
            {/* REMOVE CONNECTION FIELD */}
            {/* {!loggedIn && (
              <Panel className="flex flex-col md:flex-col flex-wrap lg:flex-row gap-6 p-6 mt-6 min-h-[120px] bg-white justify-between">
                <div className="flex  min-w-[164.5px] border-[#E9E9E9] border-solid">
                  <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-[10px]">
                      <span>Connections</span>
                      <InformationIconToolTip />
                    </div>
                    <div className="text-xl font-medium text-black-1c">-</div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-3 min-w-[190.5px] pl-6 border-l-2 border-[#E9E9E9] border-solid">
                    <div className="flex gap-x-[10px]">
                      <span>Follower</span>
                      <InformationIconToolTip />
                    </div>
                    <div className="text-xl font-medium text-black-1c">-</div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-3 min-w-[190.5px] pl-6 border-l-2 border-[#E9E9E9] border-solid w-full">
                    <div className="flex gap-x-[10px]">
                      <span>Communities</span>
                      <InformationIconToolTip />
                    </div>
                    <div className="flex text-xl font-medium text-black-1c gap-2 w-full">
                      {loggedIn ? (
                      <>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="flex items-center justify-center w-[34px] h-[34px] border-2 border-[#E9E9E9] border-solid rounded-[40px] min-w-[50px]">
                          <span className="text-base px-1 py-2">+129</span>
                        </div>
                      </>
                    ) : (
                      '-'
                    )}
                      -
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-3 min-w-[190.5px] pl-6 border-l-2 border-[#E9E9E9] border-solid">
                    <div className="flex gap-x-[10px]">
                      <span>Interesred in</span>
                      <InformationIconToolTip />
                    </div>
                    <div className="flex text-xl font-medium text-black-1c gap-2 w-full">
                      {loggedIn ? (
                      <>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="w-[34px] h-[34px] bg-black rounded-full"></div>
                        <div className="flex items-center justify-center w-[34px] h-[34px] border-2 border-[#E9E9E9] border-solid rounded-[40px] min-w-[50px]">
                          <span className="text-base px-1 py-2">+10</span>
                        </div>
                      </>
                    ) : (
                      '-'
                    )}
                      -
                    </div>
                  </div>
                </div>
              </Panel>
            )} */}
            {Object.keys(userBySlugData).length > 2 && userInfo?.username !== slug && slug ? (
              <StatisticChartBySlug userBySlugData={userBySlugData} />
            ) : (
              <StatisticChart />
            )}
          </Panel>
          <div className="static h-full">
            <img src={banner} className="max-h-[537px] mt-10 fixed" alt="Failed" />
          </div>
        </Panel>
      </Container>
    </>
  );
};
