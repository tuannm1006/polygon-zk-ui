/// <reference types="react-scripts" />
import { provider } from 'web3-core';

declare global {
  interface Window {
    ethereum: any,
    timeoutToReload?: any
  }
}
