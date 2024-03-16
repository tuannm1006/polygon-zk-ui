import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import {
  sbtMinterBscAbi,
  sbtReputationBscAbi,
  sbtReputationScoreBscAbi,
} from './abis';

export const web3 = new Web3((window as any).ethereum);
export const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
export const getSbtMinterBscContract = (address: string) => new web3.eth.Contract(sbtMinterBscAbi as AbiItem[], address);
export const getSbtReputationBscContract = (address: string) => new web3.eth.Contract(sbtReputationBscAbi as AbiItem[], address);
export const getSbtReputationScoreBscContract = (address: string) =>
  new web3.eth.Contract(sbtReputationScoreBscAbi as AbiItem[], address);
