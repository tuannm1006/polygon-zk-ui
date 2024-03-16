export const RANKING_API_URL = process.env.REACT_APP_RANKING_API_URL ?? 'https://ranking-testing-v2.octan.network';
export const USING_TESTNET = process.env.REACT_APP_USING_TESTNET === 'true';
export const RANKING_URL = process.env.REACT_APP_RANKING_URL;

export const API_URL = process.env.REACT_APP_API_URL;
export const SCORE_COUNTDOWN = process.env.REACT_APP_SCORE_COUNTDOWN || 60;
export const SBT_MINTER_BSC_CONTRACT_ADDRESS = process.env.REACT_APP_SBT_MINTER_BSC_CONTRACT_ADDRESS;
export const SBT_REPUTATION_BSC_CONTRACT_ADDRESS = process.env.REACT_APP_SBT_REPUTATION_BSC_CONTRACT_ADDRESS;
export const SBT_REPUTATION_SCORE_BSC_CONTRACT_ADDRESS =
  process.env.REACT_APP_SBT_REPUTATION_UPDATER_BSC_CONTRACT_ADDRESS;

export const REPUTATION_RANKING_BASE_PATH =
  process.env.REPUTATION_RANKING_BASE_PATH ?? 'https://sbt-ranking-board.s3.ap-southeast-1.amazonaws.com/';
