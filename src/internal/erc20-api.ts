import { EdexaConfig } from '../api/config';
import { API_METHOD, API_METHOD_ERC, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import { IEnrollUsersDTO } from '../util/interface/ICommon';
import {
  IERC20AccountId,
  IERC20BurnToken,
  IERC20Common,
  IERC20GetBalance,
  IERC20MintToken,
  IERC20TotalSupply,
  IERC20TransferToken,
  IERC20TransferTokenFrom,
} from '../util/interface/IERC20';
import {
  accountIdFromRaw,
  balanceFromRaw,
  burnTokenFromRaw,
  checkAllowanceFromRaw,
  enrollUsersFromRaw,
  getTokenEngineAuthFromRaw,
  mintTokenFromRaw,
  setOperatorFromRaw,
  totalSupplyFromRaw,
  transferTokenFromRaw,
  transferTokenRaw,
} from '../util/util';
import { requestHttp } from './dispatch';

/**
 * Authenticates the client with the edeXa API.
 *
 * @param settings - Configuration settings for edeXa.
 * @param config - Configuration object with client ID and secret.
 * @param srcMethod - Source method for the authentication request (defaults to 'authenticate').
 * @returns A Promise that resolves to the authentication response.
 */
export async function authenticate(
  settings: EdexaConfig,
  config: { clientId: string; secretKey: string },
  srcMethod = API_METHOD_ERC.AUTHENTICATE
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.AUTHENTICATE,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      headers: { ...config, 'client-id': config.clientId, 'secret-key': config.secretKey },
    }
  );
  return getTokenEngineAuthFromRaw(response);
}

/**
 * Mint Token
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for minting the token.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for minting the token.
 * @returns A Promise that resolves to the mint token.
 */
export async function mintToken(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.MINT_TOKEN
): Promise<IERC20MintToken> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.MINT_TOKEN,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return mintTokenFromRaw(response);
}

/**
 * Balance Of
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for checking the balance.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for balanceOf.
 * @returns A Promise that resolves to the balanceOf.
 */
export async function getBalance(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.BALANCE_OF
): Promise<IERC20GetBalance> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.BALANCE_OF,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return balanceFromRaw(response);
}

/**
 *Enroll users
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for enrolling the users.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for enrolling users.
 * @returns A Promise that resolves to the enroll users.
 */
export async function enrollUsers(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.ENROLL_USERS
): Promise<IEnrollUsersDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.ENROLL_USERS,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return enrollUsersFromRaw(response);
}

/**
 * AccountId of user
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for getting the accountId of user.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for accountId of user.
 * @returns A Promise that resolves to the accountId of user.
 */
export async function getAccountId(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.ACCOUNT_ID
): Promise<IERC20AccountId> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.ACCOUNT_ID,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return accountIdFromRaw(response);
}

/**
 * Transfer token to users
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for transfering token to  users.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for transfer token to  user.
 * @returns A Promise that resolves to the transfer token to  user.
 */
export async function transferToken(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.TRANSFER_TOKEN
): Promise<IERC20TransferToken> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.TRANSFER_TOKEN,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return transferTokenRaw(response);
}

/** Total Supply
 *
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for getting the total supply.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for total supply.
 * @returns A Promise that resolves to the total supply.
 */
export async function totalSupply(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.TOTAL_SUPPLY
): Promise<IERC20TotalSupply> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.TOTAL_SUPPLY,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return totalSupplyFromRaw(response);
}

/** Burn Token
 *
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for burn tokens.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for burn tokens.
 * @returns A Promise that resolves to the burn tokens.
 */
export async function burnToken(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.BURN_TOKENS
): Promise<IERC20BurnToken> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.BURN_TOKENS,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return burnTokenFromRaw(response);
}

/** Set operator for Token
 *
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for set operator for token.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for set opeartor for token.
 * @returns A Promise that resolves to the set operator for token.
 */
export async function setOperator(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.SET_OPERATOR
): Promise<IERC20Common> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.SET_OPERATOR,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return setOperatorFromRaw(response);
}

/** check spender allowance limit
 *
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for checking spender allowance limit.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for check spender allowance limit.
 * @returns A Promise that resolves to the checking spender allowance limit.
 */
export async function checkAllowanceLimit(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.CHECK_ALLOWANCE
): Promise<IERC20Common> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.CHECK_ALLOWANCE,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return checkAllowanceFromRaw(response);
}

/** Transfer token from one to another user
 *
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for transfer token from one to another user.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for transfer token from.
 * @returns A Promise that resolves to the  transfer token from one to another user.
 */
export async function transferTokenFrom(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.TRANSFER_FROM
): Promise<IERC20TransferTokenFrom> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD.TRANSFER_FROM,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return transferTokenFromRaw(response);
}
