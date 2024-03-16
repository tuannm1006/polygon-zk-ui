import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiLogin = (chainId: string, addr: string) => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(
    `${basePath}/login?wallet_address=${addr}&chain_id=${chainId}`,
    options
  )
    .then(toJson);
}