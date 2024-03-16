import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { InformationIconToolTip } from '../../../profile/components/wallet-management';
import { VerticalLineChart } from '../vertical-linechart';
import { PieceChart } from '../pie-chart';
import { makeStyles } from '@mui/material';
import comingSoon from '../../../../asserts/images/1id/analystic-coming-soon.png';

export type LeftMenuProps = DefaultFcProps;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieChartData = [
  { name: 'Suspected bot', value: 400 },
  { name: 'Suspected clone', value: 300 },
  { name: 'Potential', value: 300 },
  { name: 'Restrict', value: 200 },
];

const data = [
  {
    name: 'Mon',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tue',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wed',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thu',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Fri',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sun',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Analytics: React.FC<LeftMenuProps> = ({ className }) => {
  const { userInfo, hasSBT, hasRevokedSbt } = useAppContext();
  const links: {
    id: string;
    to: string;
    title: string;
    disabled?: boolean;
  }[] = useMemo(() => {
    return [
      { id: '1', to: '/reputation-sc', title: 'Reputation scores' },
      { id: '2', to: '/reputation-dbc', title: 'Reputation distribution by category', disabled: true },
      { id: '3', to: '', title: 'Follower RS', disabled: true },
      { id: '4', to: '/fl-rs-dbc', title: 'Follower RS distribution by category', disabled: true },
    ];
  }, [userInfo, hasSBT, hasRevokedSbt]);

  return (
    <div className={className}>
      <div className="flex flex-col justify-center p-6">
        <h1 className="font-medium text-black text-2xl mb-10">Analytics</h1>
        <div className="flex justify-center items-center">
          <img className="max-w-[631px] max-h-[472px]" src={comingSoon} alt="" />
        </div>
      </div>
    </div>
    // <div className={className}>
    //   <div className="flex flex-col pt-10 pb-6 label-text border-b-2 border-[#E9E9E9] border-solid">
    //     <h1 className="font-bold text-black text-3xl px-6 pb-10">Analytics</h1>
    //     <div className="flex">
    //       {links.map((link, i) => (
    //         <NavLink
    //           className={({ isActive }) =>
    //             clsx(
    //               'flex justify-center items-center text-lg px-6 py-4 block',
    //               { 'nav-active': isActive },
    //               link.disabled && 'opacity-[0.5] pointer-events-none'
    //             )
    //           }
    //           to={link.to}>
    //           {link.title}
    //         </NavLink>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="flex flex-col w-full px-6 mt-6 gap-y-6">
    //     <div className="flex w-full justify-between">
    //       <div className="flex text-xl text-black-1c font-medium w-1/4 items-center">Follower RS</div>
    //       <div className="w-3/4 flex w-full justify-end">
    //         <div className="pr-6 rounded-[1px] border-r-2 border-[#B6B6B6]">
    //           <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
    //             <InputLabel id="demo-simple-select-label" sx={{ paddingRight: '3px' }}>
    //               Global RS
    //             </InputLabel>
    //             <Select
    //               className="!rounded-[1px] min-w-[120px] gap-x-2 items-center"
    //               labelId="demo-simple-select-label"
    //               id="demo-simple-select"
    //               label="Age">
    //               <MenuItem value={10}>Ten</MenuItem>
    //               <MenuItem value={20}>Twenty</MenuItem>
    //               <MenuItem value={30}>Thirty</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </div>
    //         <div className="flex pl-6 gap-x-[12px] flex-wrap">
    //           <button className="w-[88px] px-[14px] py-[5px] items-center justify-center rounded-[1px] border-2 border-[#B6B6B6]">
    //             Day
    //           </button>
    //           <button className="w-[88px] px-[14px] py-[5px] items-center justify-center rounded-[1px] bg-[#0DB774] text-white">
    //             Week
    //           </button>
    //           <button className="w-[88px] px-[14px] py-[5px] items-center justify-center rounded-[1px] border-2 border-[#B6B6B6]">
    //             Month
    //           </button>
    //           <button className="w-[88px] px-[14px] py-[5px] items-center justify-center rounded-[1px] border-2 border-[#B6B6B6]">
    //             Year
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex gap-3 flex-wrap">
    //       <div className="flex flex-col min-h-[114px] p-3 bg-[#F8F8F8] rounded-xl gap-[4px]">
    //         <div className="flex items-center gap-x-6">
    //           <span>Follower changed</span>
    //           <InformationIconToolTip />
    //         </div>
    //         <div className="text-[#00AA6C] font-bold text-2xl">+200</div>
    //       </div>
    //       <div className="flex flex-col min-h-[114px] p-3 bg-[#F8F8F8] rounded-xl gap-[4px]">
    //         <div className="flex items-center gap-x-6">
    //           <span>RS changed</span>
    //           <InformationIconToolTip />
    //         </div>
    //         <div className="text-[#FF4747] font-bold text-2xl">-15</div>
    //       </div>
    //       <div className="flex flex-col min-h-[114px] p-3 bg-[#F8F8F8] rounded-xl gap-[4px]">
    //         <div className="flex items-center gap-x-6">
    //           <span>RS ath</span>
    //           <InformationIconToolTip />
    //         </div>
    //         <div className="text-[#4185EC] font-bold text-2xl">15</div>
    //       </div>
    //       <div className="flex flex-col min-h-[114px] p-3 bg-[#F8F8F8] rounded-xl gap-[4px]">
    //         <div className="flex items-center gap-x-6">
    //           <span>Rank changed</span>
    //           <InformationIconToolTip />
    //         </div>
    //         <div className="text-[#00AA6C] font-bold text-2xl">+200</div>
    //       </div>
    //       <div className="flex flex-col min-h-[114px] p-3 bg-[#F8F8F8] rounded-xl gap-[4px]">
    //         <div className="flex items-center gap-x-6">
    //           <span>Rank ath</span>
    //           <InformationIconToolTip />
    //         </div>
    //         <div className="text-[#00AA6C] font-bold text-2xl">+200</div>
    //       </div>
    //     </div>
    //     <div className="flex h-full w-full">
    //       <VerticalLineChart className="w-3/5 h-full" data={data} />
    //       <div className="flex flex-col items-center w-2/5 p-6 bg-[#F8F8F8]">
    //         <div className="text-xl font-medium text-black-1c">Current follower segmentation</div>
    //         <div className="w-full">
    //           <PieceChart className="w-full h-full" data={pieChartData} />
    //         </div>
    //         <div className="flex flex-col w-full mt-6">
    //           {pieChartData.map((data, index) => (
    //             <div className="w-full">
    //               <div className="flex items-center w-full px-6 justify-between">
    //                 <div className="flex justify-center items-center gap-x-[9px] ">
    //                   <div
    //                     style={{ backgroundColor: `${COLORS[index % COLORS.length]}` }}
    //                     className="w-2.5 h-2.5"></div>
    //                   <span className="text-black-1c">{data.name}</span>
    //                 </div>
    //                 <div style={{ color: `${COLORS[index % COLORS.length]}` }}>{data.value}</div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
