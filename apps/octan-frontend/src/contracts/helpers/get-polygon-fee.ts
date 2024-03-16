export const getPolygonFee = (args: any) => {
  const { chainId } = args;
  if (chainId === 80001)
    return fetch('https://gasstation-mumbai.matic.today/v2')
      .then((response) => response.json())
      .then((data) => data.fast.maxFee * 1e9);
  if (chainId === 137)
    return fetch('https://gasstation-mainnet.matic.network/v2')
      .then((response) => response.json())
      .then((data) => data.fast.maxFee * 1e9);
};