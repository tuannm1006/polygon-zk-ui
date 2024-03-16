import { ButtonV2, Panel, MintToken, ButtonConnect } from 'shared-components';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BigLineChart } from '../big-line-chart';
import { useState } from 'react';
import { useAppContext } from '../../../../contexts';
import { DataKeys } from '../../../../consts';
import { chartOptions } from '../../data';
import starLocked from '../../../../asserts/images/1id/stars-locked.png';
import comingSoon from '../../../../asserts/images/1id/analystic-coming-soon.png';
import { DefaultFcProps } from 'common';

export type StatisticChartBySlugProps = DefaultFcProps & {
  userBySlugData?: any;
};

const StatisticChartBySlug: React.FC<StatisticChartBySlugProps> = ({ userBySlugData }) => {
  const { userAddresses = [], loggedIn, hasSBT, hasRevokedSbt } = useAppContext();
  const [activeChart, setActiveChart] = useState(DataKeys.total_transactions);

  const [totalSelect, setTotalSelect] = useState('10');
  const [openMint, setOpenMint] = useState(false);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    loggedIn && setTotalSelect(event.target.value);
  };

  const getCaption = () => chartOptions[activeChart]?.caption || '';
  const getColor = () => chartOptions[activeChart]?.color || '';
  const getChartData = () => {
    switch (activeChart) {
      default:
        return [];
    }
  };

  //   const handleOpenMint = () => setOpenMint(true);
  //   const handleCloseMint = () => setOpenMint(false);

  const renderContent = () => {
    if (!userBySlugData?.sbt?.sbtId) {
      return (
        <div className="absolute top-[108px] right-0 bottom-0 left-0 flex justify-center items-center text-6xl font-bold text-[#00f09e]">
          <div className="flex flex-col gap-6 justify-center items-center">
            <img src={starLocked} alt="" />
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-black-1c text-[34px] font-bold">Octan account required</p>
              <p className="text-[#5B5B5B] text-lg font-normal">Mint SBT to view statistic chart.</p>
            </div>
            {/* <div>
              <ButtonV2 onClick={() => handleOpenMint()} className="">
                <span>{hasRevokedSbt ? 'Re-issue' : 'Mint SBT'}</span>
              </ButtonV2>
            </div>
            {openMint && <MintToken open={openMint} handleClose={handleCloseMint} onConfirm={handleOpenMint} />} */}
          </div>
        </div>
      );
    }

    return (
      <div>
        {totalSelect != '10' && (
          <div
            className="absolute top-[110px] right-0 bottom-0 left-0 flex justify-center
                                        items-center text-6xl font-bold text-[#00f09e] opacity-10">
            Coming Soon
          </div>
        )}
      </div>
    );
  };

  return (
    <Panel className="my-6 py-6 relative bg-white">
      <div className="text-xl text-black-1c font-bold px-6 items-center mt-6">Onchain statistic chart</div>
      {!hasSBT && (
        <div className="flex w-full px-6">
          <div className="flex w-full justify-end">
            <div className="pr-6 rounded-[1px] border-r-2 border-[#B6B6B6] w-[200px]">
              <FormControl sx={{ display: 'flex', alignItems: 'center', width: '200px' }}>
                <Select
                  className="!rounded-[1px] min-w-[120px] max-h-8 gap-x-2 items-center !text-[#B6B6B6]"
                  displayEmpty
                  disabled={!loggedIn}
                  id="demo-simple"
                  value={totalSelect}
                  onChange={handleChangeSelect}>
                  <MenuItem value={10}>Total Global RS</MenuItem>
                  <MenuItem value={20}>Total DeFi RS</MenuItem>
                  <MenuItem value={30}>Total NFT RS</MenuItem>
                  <MenuItem value={40}>Total GameFi RS</MenuItem>
                  <MenuItem value={50}>Total DAO RS</MenuItem>
                  <MenuItem value={60}>Total SocialFi RS</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex pl-6 gap-x-[12px]">
              <button
                className={`w-[88px] max-h-8 gap-[10px] px-[14px] py-[5px] flex items-center justify-center 
                                  bg-[#F2F2F2] rounded-sm border border-[#B6B6B6]`}>
                Day
              </button>
              <button
                className={`w-[88px] max-h-8 gap-[10px] px-[14px] py-[5px] flex items-center justify-center ${
                  loggedIn ? 'text-white bg-[#0DB774]' : 'bg-[#F2F2F2] border border-[#B6B6B6]'
                } rounded-sm`}>
                Week
              </button>
              <button
                className={`w-[88px] max-h-8 gap-[10px] px-[14px] py-[5px] flex items-center justify-center ${
                  !loggedIn && 'bg-[#F2F2F2]'
                } rounded-sm border border-[#B6B6B6]`}>
                Month
              </button>
              <button
                className={`w-[88px] max-h-8 gap-[10px] px-[14px] py-[5px] flex items-center justify-center ${
                  !loggedIn && 'bg-[#F2F2F2]'
                } rounded-sm border border-[#B6B6B6]`}>
                Year
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {!userBySlugData?.sbt?.sbtId ? (
        <div className="blur-[20px]">
          <BigLineChart caption={getCaption()} color={getColor()} data={[]} />
        </div>
      ) : (
        <div className="">
          <BigLineChart caption={getCaption()} color={getColor()} data={userBySlugData.dashboard} />
        </div>
      )} */}
      {userBySlugData?.sbt?.sbtId ? (
        <div className="flex justify-center items-center">
          <img className="max-w-[631px] max-h-[472px]" src={comingSoon} alt="" />
        </div>
      ) : (
        <div className="blur-[20px]">
          <BigLineChart caption={getCaption()} color={getColor()} data={getChartData()} />
        </div>
      )}
      {renderContent()}
    </Panel>
  );
};

export default StatisticChartBySlug;
