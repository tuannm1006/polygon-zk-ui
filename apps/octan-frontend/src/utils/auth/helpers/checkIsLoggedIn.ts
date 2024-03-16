import { isNotEmpty } from "@octan/common";
import { getAccessToken } from "./getAccessToken";

export const checkIsLoggedIn = () => {
  const accessToken = getAccessToken();
  
  return isNotEmpty(accessToken)
};
