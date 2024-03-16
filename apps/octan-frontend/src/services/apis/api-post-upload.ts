import { toJson } from "@octan/common";
import { getApiConfig } from "swagger";

export const apiPostUploadAvatar = (file: File) => {
  const {
    fetchMethod,
    basePath,
    ...options
  } = getApiConfig()

  const body = new FormData()
  body.append('file', file)

  return fetch(`${basePath}/user/avatar`, {
    ...options,
    method: 'POST',
    body
  })
    .then(toJson);
}