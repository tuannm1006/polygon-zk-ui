import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiListChain = () => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(
    `${basePath}/chain`,
    options
  )
    .then(toJson);
}