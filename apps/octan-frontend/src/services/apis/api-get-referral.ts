import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiGetReferral = () => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetchMethod(`${basePath}/user/referral`, options)
    .then(toJson);
}