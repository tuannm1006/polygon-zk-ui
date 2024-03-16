import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiPostProfile = (data: any) => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(`${basePath}/user/profile`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(toJson);
}