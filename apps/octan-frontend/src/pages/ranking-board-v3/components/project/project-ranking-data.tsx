import { FC, useState } from 'react';
import { DefaultFcProps } from 'common';
import classnames from 'classnames';
import { BtnFollow, HtmlTooltip } from 'shared-components';
import { formatStringToNumber, formatTotalVolume, formatRS } from 'utils';
import { ProjectCard } from './project-card';
import { CircularProgress } from '@mui/material';
import classNames from 'classnames';

export const ProjectRankingData: FC<DefaultFcProps> = ({
  data,
  userAddress,
  favorites,
  toggleFavorite,
  filter,
  count,
}) => {
  if (data.length === 0 && filter.project !== '') {
    return (
      <tr className="tbrow-notexisted">
        <td colSpan={9}>
          <div className="flex flex-row items-center">
            <svg
              className="ml-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.0004 12.9708V8.13245M12.0004 16.557V16.5995M18.0483 20.6292H5.95247C4.30023 20.6292 2.90591 19.5249 2.46722 18.0142C2.27996 17.3693 2.51005 16.6976 2.862 16.1257L8.90992 5.09773C10.3269 2.79514 13.6739 2.79514 15.0909 5.09773L21.1388 16.1257C21.4907 16.6976 21.7208 17.3693 21.5336 18.0142C21.0949 19.5249 19.7005 20.6292 18.0483 20.6292Z"
                stroke="#FF4747"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">{`Oops! No results found for keyword “${filter.project}”.`}</span>
          </div>
        </td>
        <td colSpan={1}></td>
      </tr>
    );
  }

  return (
    <>
      {data.length > 0 ? (
        data?.map((item: any, index: number) => {
          return (
            <ProjectRankingDataItem
              key={index}
              item={item}
              index={index}
              userAddress={userAddress}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          );
        })
      ) : count > 0 ? (
        <tr>
          <td colSpan={10}>
            <div className="flex justify-center m-4 max-[1050px]:pr-[50px] max-[900px]:pr-[100px] max-[800px]:pr-[200px] max-[675px]:pr-[300px] max-[500px]:pr-[400px] max-[450px]:pr-[450px] max-[400px]:pr-[500px] max-[350px]:pr-[550px] max-[300px]:pr-[550px]">
              <CircularProgress />
            </div>
          </td>
        </tr>
      ) : (
        <tr className="tbrow-nodata !bg-[#E1FFF4]">
          <td colSpan={9}>
            <div className="flex flex-row items-center">
              <svg
                className="ml-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.0004 12L12.0004 16.8M12.0004 8.44221V8.40002M2.40039 12C2.40039 6.69809 6.69846 2.40002 12.0004 2.40002C17.3023 2.40002 21.6004 6.69809 21.6004 12C21.6004 17.302 17.3023 21.6 12.0004 21.6C6.69846 21.6 2.40039 17.302 2.40039 12Z"
                  stroke="#4185EC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">This category currently has no data. Please come back later!</span>
            </div>
          </td>
          <td colSpan={1}></td>
        </tr>
      )}
    </>
  );
};

export const ProjectRankingDataItem: FC<DefaultFcProps> = ({ item, index, userAddress, favorites, toggleFavorite }) => {
  const [hoveredRow, setHoveredRow] = useState(-1);

  const hoverStyles = (index: number): string => {
    return index === hoveredRow ? 'bg-hover' : 'tbrow-bg';
  };
  const favoriteNum = favorites.map((item: any) => Number(item));

  return (
    <>
      <tr onMouseEnter={() => setHoveredRow(index)} onMouseLeave={() => setHoveredRow(-1)}>
        <td className={hoverStyles(index)}>
          <HtmlTooltip title={index + 1} arrow placement="top">
            <span>{item.rank}</span>
          </HtmlTooltip>
        </td>
        <td className={hoverStyles(index)}>
          <ProjectCard project_name={item.project_name} total_contract={item.total_contract} />
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          <span className="linear-text">{item.total_grs ? formatStringToNumber(item.total_grs, 0) : '-'}</span>
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {item.total_txn ? formatTotalVolume(Number(item.total_txn)) : '-'}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          <div className="justify-items-center">
            {item.total_gas ? `${formatTotalVolume(Number(item.total_gas))}` : '-'}
          </div>
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {item.total_degree ? `${formatTotalVolume(Number(item.total_degree))}` : '-'}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {item.total_tx_volume ? `${formatTotalVolume(Number(item.total_tx_volume))}` : '-'}
        </td>
        <td className={classnames('text-center', hoverStyles(index))}>
          {/* <HtmlTooltip title="Coming soon" arrow placement="top">
            <BtnFollow sx={{ height: '28px', width: '67px' }} variant="outlined">
              Follow
            </BtnFollow>
          </HtmlTooltip> */}

          <div className="flex w-full justify-center">
            <a
              className={classNames('cursor-pointer', !userAddress && 'opacity-[0.3] pointer-events-none')}
              onClick={() => {
                toggleFavorite(item?.project_id);
              }}>
              <img
                src={
                  favorites?.indexOf(item?.project_id) !== -1
                    ? '/assets/images/icons/star-active.svg'
                    : '/assets/images/icons/star.svg'
                }
                className={classNames('w-[24px] cursor-pointer')}
                alt="star"
              />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
};
