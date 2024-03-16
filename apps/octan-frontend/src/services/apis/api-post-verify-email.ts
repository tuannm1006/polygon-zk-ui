import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiPostVerifyEmail = (email: string) => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(`${basePath}/user/email`, {
    ...options,
    method: 'POST',
    body: JSON.stringify({
      email
    })
  })
    .then(toJson);
}