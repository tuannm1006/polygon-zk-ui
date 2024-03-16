import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiGetProfile = () => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetchMethod(`${basePath}/user/profile`, options)
    .then(toJson);
}