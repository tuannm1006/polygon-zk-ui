import { Container } from '@mui/material';
import { DefaultFcProps, RANKING_TABS, SELECT_ROWS_OPTIONS } from 'common';
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Banner from './components/banner';
import ProcessingCapacityHighlight from './components/ProcessingCapacityHighlight';
import Tabs from './components/tabs';
import SearchInput from './components/search-input';
import SelectField from './components/select-field';
import { toJson } from '@octan/common';
import './ranking-board.scss';
import AddressRanking from './components/address-ranking';
import SBTOwnerRanking from './components/sbt-owner-ranking';
import CommunityRanking from './components/community-ranking';
import ProjectRanking from './components/project-ranking';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertObjectToSearchParams, convertSearchParamsToObject } from 'utils';
import { getApiConfig, setAdditionalParams } from 'swagger';
import { isAddress } from 'ethers/lib/utils.js';
import { useAppContext } from 'contexts';

export type RankingBoardProps = DefaultFcProps;

let timeout: any;

interface IFilter {
  textSearch: string;
  pageSize: number;
}

export const RankingBoard: FC<RankingBoardProps> = (props) => {
  const [topAddress, setTopAddress] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState(RANKING_TABS.ADDRESS);
  const [network, setNetwork] = useState('POLYGON_ZK_TEST');
  const [filter, setFilter] = useState<IFilter>({
    textSearch: '',
    pageSize: 100,
  });
  const [text, setText] = useState('');

  const [showMoreFilter, setShowMoreFilter] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { userAddress } = useAppContext();

  useEffect(() => {
    console.log('ranking-board --- getAddressRanking');
    const getAddressRanking = async () => {
      try {
        const { rankingBasePath, ...options } = getApiConfig();

        setText(filter.textSearch);

        const optionParams = {
          page: 1,
          take: 1,
          address: filter.textSearch || userAddress,
          chain_key: network,
        };

        const params: any = new URLSearchParams();
        setAdditionalParams(params, optionParams);
        const query = params.toString();

        const result = await fetch(`${rankingBasePath}/rankings/addresses${query ? `?${query}` : ''}`, {
          ...options,
          method: 'GET',
        }).then(toJson);

        setTopAddress(result.data);
      } catch (e) {
        console.log(e);
      }
    };

    if ((filter.textSearch && isAddress(filter.textSearch)) || userAddress) {
      getAddressRanking();
    } else {
      setTopAddress([]);
    }
  }, [filter.textSearch, userAddress]);

  useEffect(() => {
    const params = convertSearchParamsToObject(location.search);

    setFilter((prev: IFilter) => ({
      pageSize: params.rows ? +params.rows : prev.pageSize,
      textSearch: params.address ? decodeURI(params.address) : '',
    }));
  }, [location.search]);

  return (
    <div className="ranking-board">
      <Banner />
      <ProcessingCapacityHighlight />
      <Container maxWidth="xl">
        <div className="flex lg:items-center justify-between mt-[20px] lg:mt-[60px] pb-[20px] lg:pb-[40px] border-b-[1px] border-gray mb-[20px] lg:mb-[40px] flex-col lg:flex-row">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <div className="flex items-center mt-[20px] lg:mt-0">
            <div className="lg:w-[400px] w-[50%] mr-[12px] lg:mr-[24px]">
              <SearchInput
                value={text}
                onChange={(e: any) => {
                  const val = e.target.value;
                  setText(val);
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    const obj = convertSearchParamsToObject(location.search);
                    navigate(
                      `${location.pathname}${convertObjectToSearchParams({ ...obj, address: e?.target?.value })}`,
                      { replace: true }
                    );
                  }, 500);
                }}
                topAddress={topAddress}
              />
            </div>
            <p className="mr-[4px] lg:mr-[16px] text-[14px] lg:text-[16px] font-normal">Show rows</p>

            <div className="lg:mr-[16px] w-[80px] h-[40px]">
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

            <a
              className={classNames(
                'cursor-pointer flex items-center h-[40px] rounded-[12px] px-[8px] border-[1px] text-[16px] text-white font-medium hidden lg:flex',
                showMoreFilter ? 'border-white' : 'border-gray'
              )}
              onClick={() => {
                setShowMoreFilter((prev) => !prev);
              }}>
              <img src="/assets/images/icons/filter.svg" className="w-[20px] mr-[8px]" alt="filter" />
              Filter
            </a>
          </div>
        </div>

        {currentTab === RANKING_TABS.ADDRESS && (
          <AddressRanking
            showMoreFilter={showMoreFilter}
            filter={filter}
            topAddress={topAddress}
            userAddress={userAddress}
            network={network}
            setNetwork={setNetwork}
          />
        )}

        {currentTab === RANKING_TABS.SBT_OWNER && <SBTOwnerRanking />}

        {currentTab === RANKING_TABS.COMMUNITY && <CommunityRanking />}

        {currentTab === RANKING_TABS.PROJECT && <ProjectRanking />}
      </Container>
    </div>
  );
};

export default RankingBoard;
