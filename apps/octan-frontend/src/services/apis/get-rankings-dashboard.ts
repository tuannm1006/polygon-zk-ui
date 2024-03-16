import { toJson } from '@octan/common';
import { DataKeys, RANKING_API_URL } from 'consts';
import dayjs from 'dayjs';
import { times } from 'ramda';

export const timeFrameNumber = 7;

export const getRankingsDashboard = (userAddresses: string[], dataKey: DataKeys) => {
  const addressQuery = userAddresses.map((address) => `address[]=${address}`).join('&');

  return fetch(
    `${RANKING_API_URL}/rankings/dashboard?${addressQuery}&chain_key=${'BSC'}&data_keys=${dataKey}&timeframe_number=${timeFrameNumber}&timeframe_type=1D`
  ).then(toJson);
};

export const createDummyData = () =>
  times(
    (index) => ({
      isDummyData: true,
      index: index + 1,
      timeDisplay: dayjs()
        .add(-1 * (index + 1), 'day')
        .format('YYYY-MM-DD HH:mm'),
      value: 0,
    }),
    timeFrameNumber
  );
