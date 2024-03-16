export const formatTotalVolume = (num: number) => {
  if (!num && num !== 0) {
    return '-';
  }
  const formatter = (num: number, maximumFractionDigits = 0) => {
    const formatNum = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits,
    });
    return formatNum.format(num).replace(/,/g, ',');
  };
  if (num >= 1000000000) return `${formatter(num / 1000000000, 1)}B`;
  if (num >= 1000000 && num < 1000000000) return `${formatter(num / 1000000, 1)}M`;
  if (num >= 1000 && num < 1000000) return `${formatter(num / 1000, 1)}K`;
  if (num >= 1 && num < 1000) return `${formatter(num)}`;
  if (num < 1) return `${formatter(num, 3)}`;
};

export const formatRS = (num: number) => {
  if (!num && num !== 0) {
    return '-';
  }
  const formatter = (num: number, maximumFractionDigits = 5) => {
    const formatNum = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits,
    });
    return formatNum.format(num).replace(/,/g, ',');
  };
  if (num >= 10000000) return `${formatter(num / 100, 0)}M`;
  if (num >= 1000 && num < 10000000) return `${formatter(num / 1000, 1)}K`;
  if (num >= 100 && num < 1000) return formatter(num, 0);
  if (num >= 10 && num < 100) return formatter(num, 1);
  if (num >= 1 && num < 10) return formatter(num, 2);
  if (num < 1) return formatter(num);
};
