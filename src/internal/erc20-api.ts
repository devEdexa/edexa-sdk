import { EdexaConfig } from '../api/config';
import { API_METHOD, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import {
  erc20AccountIdDTO,
  erc20BurnTokenDTO,
  erc20EnrollUsersDTO,
  erc20GetBalanceOfDTO,
  erc20MintTokenDTO,
  erc20TotalSupplyDTO,
  erc20TransferTokenDTO,
  erc20commonDTO,
} from '../util/interface/erc20';
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
  config: { headers: { 'client-id': string; 'secret-key': string } },
  srcMethod = API_METHOD.AUTHENTICATE
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
    API_METHOD.AUTHENTICATE,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      headers: { ...config.headers },
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
  data: string,
  config?: any,
  srcMethod = API_METHOD.MINT_TOKEN
): Promise<erc20MintTokenDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
export async function balanceOf(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.BALANCEOF
): Promise<erc20GetBalanceOfDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
    API_METHOD.BALANCEOF,
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
): Promise<erc20EnrollUsersDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
export async function accountId(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.ACCOUNTID
): Promise<erc20AccountIdDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
    API_METHOD.ACCOUNTID,
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
): Promise<erc20TransferTokenDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
): Promise<erc20TotalSupplyDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
): Promise<erc20BurnTokenDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
): Promise<erc20commonDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
): Promise<erc20commonDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
): Promise<erc20commonDTO> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC20,
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
