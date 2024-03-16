import { Configuration } from "../generated-api";
import { bindService } from "./bindService";
import { getApiConfig } from "./getApiConfig";

const apiServices: { [key: string]: any } = {};

export function getApiService<T>(
  serviceName: string,
  serviceClass: { new(config: Configuration | any): T },
  accessToken?: string
): T {
  const apiConfig = getApiConfig(accessToken);
  if (!apiServices[serviceName]) {
    apiServices[serviceName] = bindService(new serviceClass(apiConfig));
  } else {
    apiServices[serviceName].setConfig(apiConfig);
  }

  return apiServices[serviceName] as T;
}
