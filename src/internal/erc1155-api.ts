import { EdexaConfig } from '../api/config';
import { API_METHOD, API_METHOD_ERC1155, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import {
  getERCAccountFromRaw,
  getERCApproveStatusFromRaw,
  // getERCAuthFromRaw,
  getERCBalanceFromRaw,
  getERCBatchBalanceFromRaw,
  getERCBatchMintedFromRaw,
  getERCBurnFromRaw,
  getERCMintedFromRaw,
  getERCMultiUserTokenTransferRaw,
  getERCOperatorAllFromRaw,
  getERCOperatorFromRaw,
  getERCOwnerDetailsFromRaw,
  getERCOwnerFromRaw,
  getERCTokenTransferFromRaw,
  getERCTokenTransferRaw,
  getERCURIFromRaw,
  setERCTokenURIFromRaw,
} from '../util/util_erc1155';
import { requestHttp } from './dispatch';
import {
  ERCApproveResponse,
  ERCBatchBalanceResponse,
  ERCBatchMintResponse,
  ERCBurnResponse,
  ERCMintResponse,
  ERCMultiUserTokenTransferResponse,
  ERCOwnerDetailsResponse,
  ERCOwnerResponse,
  ERCSetOperatorAllResponse,
  ERCSetOperatorResponse,
  ERCSetURIResponse,
  ERCTokenTransferFromResponse,
  ERCTokenTransferResponse,
  ERCURIResponse,
  IAccountResponse,
  IApproveResponse,
  IBatchMintResponse,
  IBurnResponse,
  IERCResponse,
  IGetURIResponse,
  IMintResponse,
  IMultiUserTokenTransferResponse,
  IOwnerDetailsResponse,
  IOwnerResponse,
  ISetOperatorAllResponse,
  ISetOperatorResponse,
  ISetURIResponse,
  ITokenTransferFromResponse,
  ITokenTransferResponse,
} from '../util/interface/IERC1155';
import { getERCAuthFromRaw } from '../util/util_erc721';

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
  srcMethod = API_METHOD.AUTHENTICATE
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD.AUTHENTICATE,
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      headers: {
        ...config,
        'client-id': config.clientId,
        'secret-key': config.secretKey,
      },
    }
  );
  return getERCAuthFromRaw(response);
}

/**
 * Geting a username of admin or user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for geting a file.
 * @param srcMethod - Source method for geting a file.
 * @returns A Promise that resolves to the geting a file.
 */
export async function getAccount(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.ACCOUNT
): Promise<IAccountResponse> {
  const response: IERCResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.ACCOUNT,
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
 * @param data - Data for geting a balance of user and admin.
 * @param srcMethod - Source method for geting a balance of users or admin.
 * @returns A Promise that resolves to the getBalance method data.
 */
export async function getBalance(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.BALANCE
): Promise<any> {
  const response: IERCResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BALANCE,
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
 * Geting a balance of multiple users or admin.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for geting a balance of multiple users or admin.
 * @param srcMethod - Source method for getBatchBalance.
 * @returns A Promise that resolves to the geting multiple users and admin balance method data.
 */
export async function getBatchBalance(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.BATCH_BALANCE
): Promise<any> {
  const response: ERCBatchBalanceResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BATCH_BALANCE,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCBatchBalanceFromRaw(response);
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
  srcMethod = API_METHOD_ERC1155.MINT
): Promise<IMintResponse> {
  const response: ERCMintResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.MINT,
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
 * Minting multiple token at a same time or single function call.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for minting new token.
 * @param srcMethod - Source method for minting new token.
 * @returns A Promise that resolves to the minted data.
 */
export async function batchMint(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.BATCH_MINT
): Promise<IBatchMintResponse> {
  const response: ERCBatchMintResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BATCH_MINT,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCBatchMintedFromRaw(response);
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
  srcMethod = API_METHOD_ERC1155.BURN
): Promise<IBurnResponse> {
  const response: ERCBurnResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BURN,
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
 * Burn multiple token using single api or function by admin.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for destroy or burn muultiple token.
 * @param srcMethod - Source method for batchBurn token.
 * @returns A Promise that resolves to the batchBurn data.
 */
export async function batchBurn(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.BATCH_BURN
): Promise<IBurnResponse> {
  const response: ERCBurnResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BATCH_BURN,
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
 * Set token URI.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for set token URI.
 * @param srcMethod - Source method for set token URI.
 * @returns A Promise that resolves to the setToken URI data.
 */
export async function setTokenURI(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.SET_URI
): Promise<ISetURIResponse> {
  const response: ERCSetURIResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.SET_URI,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await setERCTokenURIFromRaw(response);
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
  srcMethod = API_METHOD_ERC1155.GET_URI
): Promise<IGetURIResponse> {
  const response: ERCURIResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.GET_URI,
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
  srcMethod = API_METHOD_ERC1155.TRANSFER
): Promise<ITokenTransferResponse> {
  const response: ERCTokenTransferResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.TRANSFER,
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
 * Multiple Token transfer to the user at single api and function call.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for multiple token transfer to the user.
 * @param srcMethod - Source method for Batch Token Transfer.
 * @returns A Promise that resolves to the BatchTokenTransfer data.
 */
export async function batchTokenTransfer(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.BATCH_TRANSFER
): Promise<ITokenTransferResponse> {
  const response: ERCTokenTransferResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.BATCH_TRANSFER,
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
 * Multiple Token transfer to the multiple user at single api and function call.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for multiple token transfer to the multiple user.
 * @param srcMethod - Source method for Batch Token Transfer.
 * @returns A Promise that resolves to the tokenTransferMultiUsers data.
 */
export async function tokenTransferMultiUsers(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.MULTI_USER_TRANSFER
): Promise<IMultiUserTokenTransferResponse> {
  const response: ERCMultiUserTokenTransferResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.MULTI_USER_TRANSFER,
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization },
    }
  );
  return await getERCMultiUserTokenTransferRaw(response);
}

/**
 * Token transfer to the user.s
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for token transfer to the user.
 * @param srcMethod - Source method for Token Transfer.
 * @returns A Promise that resolves to the Transfer data.
 */
export async function approveTokenAccess(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.APPROVE
): Promise<IApproveResponse> {
  const response: ERCApproveResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.APPROVE,
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

/**
 * Token transfer to the user.s
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for token transfer to the user.
 * @param srcMethod - Source method for Token Transfer.
 * @returns A Promise that resolves to the Transfer data.
 */
export async function getApproveStatus(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD_ERC1155.APPROVE_STATUS
): Promise<IApproveResponse> {
  const response: ERCApproveResponse = await requestHttp(
    settings,
    EdexaApiType.ERC721,
    API_METHOD_ERC1155.APPROVE_STATUS,
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
