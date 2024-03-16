// @ts-nocheck
import { getApiService } from '../helpers';

/*
    Soulbound 1ID API generated
    RESTful API for Octan Soulbound 1ID
    version: 1.5

*/

export class Configuration {
  basePath? = '';
  fetchMethod = fetch;
  headers?: any = {};
  getHeaders: any = () => {
    return {};
  };
  responseHandler: any = null;
  errorHandler: any = null;

  constructor(config: Configuration | any) {
    if (config) {
      if (config.basePath) {
        this.basePath = config.basePath;
      }
      if (config.fetchMethod) {
        this.fetchMethod = config.fetchMethod;
      }
      if (config.headers) {
        this.headers = config.headers;
      }
      if (config.getHeaders) {
        this.getHeaders = config.getHeaders;
      }
      if (config.responseHandler) {
        this.responseHandler = config.responseHandler;
      }
      if (config.errorHandler) {
        this.errorHandler = config.errorHandler;
      }
    }
  }
}

export const setAdditionalParams = (params = [], additionalParams = {}) => {
  Object.keys(additionalParams).forEach((key) => {
    if (additionalParams[key]) {
      params.append(key, additionalParams[key]);
    }
  });
};

export class LoginWalletDto {
  chainKey?: string;
  address?: string;
  signature?: string;
  referralCode?: string;

  constructor(obj: LoginWalletDto) {
    this.chainKey = obj.chainKey;
    this.address = obj.address;
    this.signature = obj.signature;
    this.referralCode = obj.referralCode;
  }
}

export class UserWallet {
  id?: string;
  chainKey?: string;
  address?: string;
  userId?: string;

  constructor(obj: UserWallet) {
    this.id = obj.id;
    this.chainKey = obj.chainKey;
    this.address = obj.address;
    this.userId = obj.userId;
  }
}

export class WalletAddressDto {
  walletAddress?: string;

  constructor(obj: WalletAddressDto) {
    this.walletAddress = obj.walletAddress;
  }
}

export class AddWalletDto {
  walletAddress?: string;
  chainKey?: string;
  signature?: string;

  constructor(obj: AddWalletDto) {
    this.walletAddress = obj.walletAddress;
    this.chainKey = obj.chainKey;
    this.signature = obj.signature;
  }
}

export class DeleteWalletDto {
  walletAddress?: string;

  constructor(obj: AddWalletDto) {
    this.walletAddress = obj.walletAddress;
  }
}

export class AddComputedWalletDto {
  computedWallets?: string[];
  chainKey?: string;

  constructor(obj: AddWalletDto) {
    this.walletAddress = obj.walletAddress;
    this.chainKey = obj.chainKey;
  }
}

export class SendVerifyEmailDto {
  email?: string;

  constructor(obj: SendVerifyEmailDto) {
    this.email = obj.email;
  }
}

export class GenCodeDto {
  provider?: string;
  username?: string;

  constructor(obj: GenCodeDto) {
    this.provider = obj.provider;
    this.username = obj.username;
  }
}
export class ValidateUsernameDto {
  username?: string;

  constructor(obj: ValidateUsernameDto) {
    this.username = obj.username;
  }
}

export class VerifyEmailDto {
  username?: string;
  email?: string;
  code?: string;

  constructor(obj: VerifyEmailDto) {
    this.username = obj.username;
    this.email = obj.email;
    this.code = obj.code;
  }
}

export class SignSignatureIssueSbtDto {
  chainKey?: string;
  primaryWallet?: string;
  computedWallets: string[];
  constructor(obj: SignSignatureIssueSbtDto) {
    this.chainKey = obj.chainKey;
    this.primaryWallet = obj.primaryWallet;
    this.computedWallets = obj.computedWallets;
  }
}

export class ResultSignSignatureIssueOrRevokeSbt {
  sbtId?: number;
  expiry?: number;
  signature?: string;

  constructor(obj: ResultSignSignatureIssueOrRevokeSbt) {
    this.sbtId = obj.sbtId;
    this.expiry = obj.expiry;
    this.signature = obj.signature;
  }
}

export class SignSignatureRevokeSbtDto {
  chainKey?: string;
  sbtId?: number;
  address?: string;

  constructor(obj: SignSignatureRevokeSbtDto) {
    this.chainKey = obj.chainKey;
    this.sbtId = obj.sbtId;
    this.address = obj.address;
  }
}

export class SignSignatureChangeSbtDto {
  chainKey?: string;
  sbtId?: number;
  to?: string;

  constructor(obj: SignSignatureChangeSbtDto) {
    this.chainKey = obj.chainKey;
    this.sbtId = obj.sbtId;
    this.to = obj.to;
  }
}

export class ResultSignSignatureChangeSbt {
  sbtId?: number;
  expiry?: number;
  signature?: string;
  to?: string;

  constructor(obj: ResultSignSignatureChangeSbt) {
    this.sbtId = obj.sbtId;
    this.expiry = obj.expiry;
    this.signature = obj.signature;
    this.to = obj.to;
  }
}

export class UserIssueRevokeSbtDto {
  option?: string;
  chainKey?: string;
  address?: string;
  sbtId?: number;
  txHash?: string;

  constructor(obj: UserIssueRevokeSbtDto) {
    this.option = obj.option;
    this.chainKey = obj.chainKey;
    this.address = obj.address;
    this.sbtId = obj.sbtId;
    this.txHash = obj.txHash;
  }
}

export class UserChangeSbtDto {
  chainKey?: string;
  sbtId?: number;
  from?: string;
  to?: string;
  txHash?: string;

  constructor(obj: UserChangeSbtDto) {
    this.chainKey = obj.chainKey;
    this.sbtId = obj.sbtId;
    this.from = obj.from;
    this.to = obj.to;
    this.txHash = obj.txHash;
  }
}

export class SoulBoundToken {
  id?: string;
  sbtId?: number;
  chainKey?: string;
  txHash?: string;
  status?: string;
  serverStatus?: string;
  error?: string;
  createdAt?: string;

  constructor(obj: SoulBoundToken) {
    this.id = obj.id;
    this.sbtId = obj.sbtId;
    this.chainKey = obj.chainKey;
    this.txHash = obj.txHash;
    this.status = obj.status;
    this.serverStatus = obj.serverStatus;
    this.error = obj.error;
    this.createdAt = obj.createdAt;
  }
}

export class CreateFavoriteDto {
  chainKey?: string;
  address?: string;

  constructor(obj: CreateFavoriteDto) {
    this.chainKey = obj.chainKey;
    this.address = obj.address;
  }
}

export class Favorite {
  constructor(obj: Favorite) {}
}

export class MethodOptions {
  headers?: any = {};
  returnResponse?: boolean = false;

  constructor(options: MethodOptions) {
    if (options.headers) {
      this.headers = options.headers;
    }
    if (options.returnResponse) {
      this.returnResponse = options.returnResponse;
    }
  }
}

export class AuthNonceGetArgs {
  chainKey?: string;
  address?: string;

  constructor(args: AuthNonceGetArgs) {
    this.chainKey = args.chainKey;
    this.address = args.address;
  }
}

export class FavoritesGetArgs {
  chainKey?: string;

  constructor(args: FavoritesGetArgs) {
    this.chainKey = args.chainKey;
  }
}

export class FavoritesDeleteArgs {
  chainKey?: string;
  address?: string;

  constructor(args: FavoritesDeleteArgs) {
    this.chainKey = args.chainKey;
    this.address = args.address;
  }
}

export class Api {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  setConfig(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  authNonceGet(args: AuthNonceGetArgs, options: MethodOptions | any = {}): Promise<any> {
    const { chainKey, address } = args;
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/auth/nonce';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    if (chainKey !== undefined) {
      params.append('chainKey', chainKey as any);
    }
    if (address !== undefined) {
      params.append('address', address as any);
    }
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  authLoginPost(body?: LoginWalletDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/auth/login';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsGet(options: MethodOptions | any = {}): Promise<UserWallet[]> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  walletsValidateWalletPost(body?: WalletAddressDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/validate-wallet';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsChangePrimaryWalletPost(body?: WalletAddressDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/change-primary-wallet';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsAddWalletPost(body?: AddWalletDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/add-wallet';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsDeleteWalletPost(body?: DeleteWalletDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  signComputedWalletsPost(body?: AddComputedWalletDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/sign-computed-wallets';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsAddComputedWalletPost(body?: AddComputedWalletDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/computed-wallets-rs';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  walletsComputedWalletsRSGet(options: MethodOptions | any = {}): Promise<string[]> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/wallets/computed-wallets-rs';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  referralsDetailsGet(options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/referrals/details';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  usersSendVerifyEmailPost(body?: SendVerifyEmailDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/users/send-verify-email';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  linkSocialGenCodePost(body?: GenCodeDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/link-social/gen-code';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  usersValidateUsernamePost(body?: ValidateUsernameDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/users/validate-username';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  usersVerifyEmailPost(body?: VerifyEmailDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/users/verify-email';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  usersCurrentGet(options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/users/current';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  sbtsSignIssuePost(body?: SignSignatureIssueSbtDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts/sign-issue';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  sbtsSignRevokePost(body?: SignSignatureRevokeSbtDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts/sign-revoke';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  sbtsSignChangePost(body?: SignSignatureChangeSbtDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts/sign-change';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  sbtsUserIssueRevokePost(body?: UserIssueRevokeSbtDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts/user-issue-revoke';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  sbtsUserChangePost(body?: UserChangeSbtDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts/user-change';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  sbtsGet(options: MethodOptions | any = {}): Promise<SoulBoundToken[]> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/sbts';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  socialsAccountGet(options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/users/social-accounts';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  favoritesPost(body?: CreateFavoriteDto, options: MethodOptions | any = {}): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/favorites';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'post',
        headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers },
        body: 'object' === typeof body ? JSON.stringify(body) : body,
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  favoritesGet(args: FavoritesGetArgs, options: MethodOptions | any = {}): Promise<Favorite[]> {
    const { chainKey } = args;
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/favorites';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    if (chainKey !== undefined) {
      params.append('chainKey', chainKey as any);
    }
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'get',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }

  favoritesDelete(args: FavoritesDeleteArgs, options: MethodOptions | any = {}): Promise<any> {
    const { chainKey, address } = args;
    const { fetchMethod, basePath, headers, getHeaders, responseHandler, errorHandler } = this.config;
    const url = '/favorites';
    const params = new URLSearchParams();
    setAdditionalParams(params, options.params);
    if (chainKey !== undefined) {
      params.append('chainKey', chainKey as any);
    }
    if (address !== undefined) {
      params.append('address', address as any);
    }
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
        method: 'delete',
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      !!responseHandler && promise.then(responseHandler);
      !!errorHandler && promise.catch(errorHandler);
      promise.then((response) => {
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }
}

export const getApi = (accessToken?: string) => getApiService('Api', Api, accessToken);
