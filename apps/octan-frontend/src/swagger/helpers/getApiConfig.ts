import { API_URL, RANKING_API_URL } from 'consts';
import { configurableFetch, getAccessToken } from 'utils';
import { Configuration } from '../generated-api';

export const getApiConfig = (accessToken?: string): Configuration | any => {
  accessToken = accessToken || typeof window !== 'undefined' ? getAccessToken() : undefined;
  return {
    basePath: API_URL,
    rankingBasePath: RANKING_API_URL,
    fetchMethod: configurableFetch,
    ...(accessToken
      ? {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      : {}),
  };
};
