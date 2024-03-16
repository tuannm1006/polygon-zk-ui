import { SELECT_ROWS_DEFAULT_VALUE } from 'common';

export const formatAddress = (addr: string, length = 12, leadingLength: number | undefined = undefined): string => {
  if (addr.length < 10) return addr;
  return (
    addr.substring(0, leadingLength ? leadingLength : length) +
    '...' +
    addr.substring(addr.length - length, addr.length)
  );
};
export const formatBigRanking = (value: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};

export function formatStringToNumber(value: number, maximumFractionDigits = 2) {
  if (!value && value !== 0) {
    return '-';
  }
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  return formatter.format(value).replace(/,/g, ',');
}

export const convertSearchParamsToObject = (search: string | undefined) => {
  if (search) {
    const value = search.slice(1);
    const obj: any = {};
    value.split('&').forEach((item) => {
      const [key, val] = item.split('=');
      obj[key] = val;
    });
    return obj;
  }
  return {};
};

export const extractFilterParams = (search: string | undefined) => {
  const so = convertSearchParamsToObject(search);
  return {
    textSearch: so.address ?? '',
    pageSize: so.rows ?? SELECT_ROWS_DEFAULT_VALUE,
    project: so.project ?? '',
    page: so.page ?? 1,
    username: so.username ?? '',
  };
};

export const convertObjectToSearchParams = (values: any) => {
  if (values) {
    // console.log(values)
    const search = Object.entries(values)
      .filter((entry) => entry[1])
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `?${search}`;
  }
  return '';
};
