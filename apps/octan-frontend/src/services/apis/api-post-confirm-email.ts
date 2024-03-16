import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiPostConfirmEmail = (code: string) => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  return fetch(`${basePath}/user/confirmemail`, {
    ...options,
    method: 'POST',
    body: JSON.stringify({
      code
    })
  })
    .then(toJson);
}