import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiPostMint = () => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(`${basePath}/user/mintsbt`, {
    ...options,
    method: 'POST',
    body: JSON.stringify({})
  })
    .then(toJson)
}