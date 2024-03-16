import { toJson } from '@octan/common';
import { API_URL } from 'consts';

export const getStatisticChartDashboard = (userName?: string, timeframeType?: string) => {
  return fetch(`${API_URL}/users/${userName}?timeframe_type=${timeframeType || 'year'}`).then(toJson);
};
