import { EdexaConfig } from '../api/config';
import { API_METHOD, API_METHOD_ERC, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import {
  getERCAccountFromRaw,
  getERCApproveStatusFromRaw,
  getERCAuthFromRaw,
  getERCBalanceFromRaw,
  getERCBurnFromRaw,
  getERCMintedFromRaw,
  getERCOperatorAllFromRaw,
  getERCOperatorFromRaw,
  getERCOwnerDetailsFromRaw,
  getERCOwnerFromRaw,
  getERCSupplyFromRaw,
  getERCTokenTransferFromRaw,
  getERCTokenTransferRaw,
  getERCURIFromRaw,
} from '../util/util_erc721';
import { requestHttp } from './dispatch';
import {
  ERCApproveResponse,
  ERCBurnResponse,
  ERCMintResponse,
  ERCOwnerDetailsResponse,
  ERCOwnerResponse,
  ERCSetOperatorAllResponse,
  ERCSetOperatorResponse,
  ERCSupplyResponse,
  ERCTokenTransferFromResponse,
  ERCTokenTransferResponse,
  ERCURIResponse,
  IAccountResponse,
  IApproveResponse,
  IBurnResponse,
  IERCResponse,
  IMintResponse,
  IOwnerDetailsResponse,
  IOwnerResponse,
  ISetOperatorAllResponse,
  ISetOperatorResponse,
  ISupplyResponse,
  ITokenTransferFromResponse,
  ITokenTransferResponse,
  IURIResponse,
} from '../util/interface/IERC721';

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
  return getERCAuthFromRaw(response);
}

/**
 * Geting a name of admin or user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for geting a file.
 * @param srcMethod - Source method for geting a file.
 * @returns A Promise that resolves to the geting a file.
 */
export async function getAccount(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.ACCOUNT
): Promise<IAccountResponse> {
  const response: IERCResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.ACCOUNT,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCAccountFromRaw(response);
}

/**
 * Geting a balance of admin or user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for geting a file.
 * @param srcMethod - Source method for geting a file.
 * @returns A Promise that resolves to the geting a file.
 */
export async function getBalance(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.BALANCE
): Promise<any> {
  const response: IERCResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.BALANCE,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCBalanceFromRaw(response);
}

/**
 * Minting new token by admin.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for minting new token.
 * @param srcMethod - Source method for minting new token.
 * @returns A Promise that resolves to the minted data.
 */
export async function mintToken(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.MINT
): Promise<IMintResponse> {
  const response: ERCMintResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.MINT,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCMintedFromRaw(response);
}

/**
 * Burn token by admin.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for destroy or burn token.
 * @param srcMethod - Source method for burn token.
 * @returns A Promise that resolves to the burn data.
 */
export async function burnToken(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.BURN
): Promise<IBurnResponse> {
  const response: ERCBurnResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.BURN,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCBurnFromRaw(response);
}

/**
 * Get Total Supply or total minted token count.
 *
 * @param settings - Configuration settings for edeXa.
 * @param srcMethod - Source method for getting total supply count.
 * @returns A Promise that resolves to the total supply data.
 */
export async function getTotalSupply(
  settings: EdexaConfig,
  data: object,
  srcMethod = API_METHOD_ERC.SUPPLY
): Promise<ISupplyResponse> {
  const response: ERCSupplyResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.SUPPLY,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCSupplyFromRaw(response);
}

/**
 * Getting token URI.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for getting token URI.
 * @param srcMethod - Source method for token URI.
 * @returns A Promise that resolves to the token URI data.
 */
export async function getTokenURI(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.URI
): Promise<IURIResponse> {
  const response: ERCURIResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.URI,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCURIFromRaw(response);
}

/**
 * Token transfer to the user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for token transfer to the user.
 * @param srcMethod - Source method for Token Transfer.
 * @returns A Promise that resolves to the Transfer data.
 */
export async function tokenTransfer(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.TRANSFER
): Promise<ITokenTransferResponse> {
  const response: ERCTokenTransferResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.TRANSFER,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCTokenTransferRaw(response);
}

/**
 * Token transfer from one user to another user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for Token Transfer from one user to another user.
 * @param srcMethod - Source method for tokenTransferFrom.
 * @returns A Promise that resolves to the TransferFrom data.
 */
export async function tokenTransferFrom(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.TRANSFER_FROM
): Promise<ITokenTransferFromResponse> {
  const response: ERCTokenTransferFromResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.TRANSFER_FROM,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCTokenTransferFromRaw(response);
}

/**
 * Set any user to as a token Operator.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for set Operator.
 * @param srcMethod - Source method for Set Operator.
 * @returns A Promise that resolves to the token setOperator data.
 */
export async function setOperator(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.OPERATOR
): Promise<ISetOperatorResponse> {
  const response: ERCSetOperatorResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.OPERATOR,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCOperatorFromRaw(response);
}

/**
 * Set any user to as a token Operator.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for set Operator.
 * @param srcMethod - Source method for Set Operator.
 * @returns A Promise that resolves to the token setOperator data.
 */
export async function setOperatorForAll(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.OPERATOR_ALL
): Promise<ISetOperatorAllResponse> {
  const response: ERCSetOperatorAllResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.OPERATOR_ALL,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCOperatorAllFromRaw(response);
}

/**
 * Get the Owner of token.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for get owner.
 * @param srcMethod - Source method for get owner.
 * @returns A Promise that resolves to the token getOwner data.
 */
export async function getOwner(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.OWNER
): Promise<IOwnerResponse> {
  const response: ERCOwnerResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.OWNER,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCOwnerFromRaw(response);
}

/**
 * Get the Owner details of token.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for getting owner details.
 * @param srcMethod - Source method for getting owner details.
 * @returns A Promise that resolves to the token getOwnerDetails data.
 */
export async function getOwnerDetails(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.OWNER_DETAIL
): Promise<Array<IOwnerDetailsResponse>> {
  const response: ERCOwnerDetailsResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.OWNER_DETAIL,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCOwnerDetailsFromRaw(response);
}

/**
 * Token transfer to the user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for token transfer to the user.
 * @param srcMethod - Source method for Token Transfer.
 * @returns A Promise that resolves to the Transfer data.
 */
export async function getApproveStatus(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC.APPROVE
): Promise<IApproveResponse> {
  const response: ERCApproveResponse = await requestHttp(
    settings,
    EdexaApiType.TOKEN_ENGINE,
    API_METHOD_ERC.APPROVE,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCApproveStatusFromRaw(response);
}
