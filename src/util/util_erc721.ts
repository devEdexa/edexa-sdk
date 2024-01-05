import { ICommonAuth } from './interface/ICommon';
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
  IBalanceResponse,
  IBurnResponse,
  IMintResponse,
  IOwnerDetailsResponse,
  IOwnerResponse,
  ISetOperatorAllResponse,
  ISetOperatorResponse,
  ISupplyResponse,
  ITokenTransferFromResponse,
  ITokenTransferResponse,
  IURIResponse,
} from './interface/IERC721';

/**
 * Parses the raw archive authentication data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveAuth - Raw archive authentication data.
 * @returns The parsed IbarchiveAuth object.
 */
export function getERCAuthFromRaw(rawArchiveAuth: {
  data: { _id: string; token: string; username: string; name: string };
}): ICommonAuth {
  try {
    return {
      id: rawArchiveAuth?.data?._id,
      token: rawArchiveAuth?.data?.token,
      username: rawArchiveAuth?.data?.username,
      name: rawArchiveAuth?.data?.name,
    };
  } catch (e) {
    throw new Error('Error parsing the ERC721 auth response: ' + e);
  }
}

/**
 * Parses the raw archive authentication data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveAuth - Raw archive authentication data.
 * @returns The parsed IbarchiveAuth object.
 */
export function getERCAccountFromRaw(rawArchiveAuth: {
  data: { /* _id: string; token: string; */ username: string /* name: string */ };
}): IAccountResponse {
  try {
    return {
      username: rawArchiveAuth?.data?.username,
    };
  } catch (e) {
    throw new Error('Error parsing the ERC721 account response: ' + e);
  }
}

/**
 * Parses the raw archive authentication data and returns a formatted IBalanceResponse object.
 *
 * @param rawArchiveAuth - Raw archive authentication data.
 * @returns The parsed IBalanceResponse object.
 */
export function getERCBalanceFromRaw(rawArchiveAuth: {
  data: { balance?: string; username?: string };
}): IBalanceResponse {
  try {
    return {
      balance: rawArchiveAuth?.data?.balance,
    };
  } catch (e) {
    throw new Error('Error parsing the ERC721 balance response: ' + e);
  }
}

/**
 * Parses the raw minted authentication data and returns a formatted IMintResponse object.
 *
 * @param rawMintData - Raw Mint token data.
 * @returns The parsed IMintResponse object.
 */
export function getERCMintedFromRaw(rawMintData: ERCMintResponse): IMintResponse {
  try {
    return rawMintData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 mint token response: ' + e);
  }
}

/**
 * Parses the raw burn data and returns a formatted IBurnResponse object.
 *
 * @param rawBurnData - Raw burn token data.
 * @returns The parsed IBurnResponse object.
 */
export function getERCBurnFromRaw(rawBurnData: ERCBurnResponse): IBurnResponse {
  try {
    return rawBurnData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 burn token response: ' + e);
  }
}

/**
 * Parses the raw suuply data and returns a formatted ISupplyResponse object.
 *
 * @param rawSupplyData - Raw archive authentication data.
 * @returns The parsed ISupplyResponse object.
 */
export function getERCSupplyFromRaw(rawSupplyData: ERCSupplyResponse): ISupplyResponse {
  try {
    return rawSupplyData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 total supply response: ' + e);
  }
}

/**
 * Parses the raw token URI data and returns a formatted IURIResponse object.
 *
 * @param rawURIData - Raw token URI data.
 * @returns The parsed IURIResponse object.
 */
export function getERCURIFromRaw(rawURIData: ERCURIResponse): IURIResponse {
  try {
    return rawURIData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 token URI response: ' + e);
  }
}

/**
 * Parses the raw token URI data and returns a formatted ITokenTransferResponse object.
 *
 * @param rawTokenTransferData - Raw token URI data.
 * @returns The parsed ITokenTransferResponse object.
 */
export function getERCTokenTransferRaw(rawTokenTransferData: ERCTokenTransferResponse): ITokenTransferResponse {
  try {
    return rawTokenTransferData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 token transfer response: ' + e);
  }
}

/**
 * Parses the raw data of tokenTransferFrom and returns a formatted ITokenTransferResponse object.
 *
 * @param rawTokenTransferFromData - Raw token URI data.
 * @returns The parsed ITokenTransferResponse object.
 */
export function getERCTokenTransferFromRaw(
  rawTokenTransferFromData: ERCTokenTransferFromResponse
): ITokenTransferFromResponse {
  try {
    return rawTokenTransferFromData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 token transfer response: ' + e);
  }
}

/**
 * Parses the raw set operator data and returns a formatted ISetOperatorResponse object.
 *
 * @param rawSetOperatorData - Raw set operator data.
 * @returns The parsed ISetOperatorResponse object.
 */
export function getERCOperatorFromRaw(rawSetOperatorData: ERCSetOperatorResponse): ISetOperatorResponse {
  try {
    return rawSetOperatorData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 set Operator response: ' + e);
  }
}

/**
 * Parses the raw data of setOperatorForAll and returns a formatted ISetOperatorAllResponse object.
 *
 * @param rawSetOperatorForAllData - Raw set operator data.
 * @returns The parsed ISetOperatorAllResponse object.
 */
export function getERCOperatorAllFromRaw(rawSetOperatorForAllData: ERCSetOperatorAllResponse): ISetOperatorAllResponse {
  try {
    return rawSetOperatorForAllData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 set Operator response: ' + e);
  }
}

/**
 * Parses the raw data of owner and returns a formatted IOwnerResponse object.
 *
 * @param rawOwnerData - Raw Owner data.
 * @returns The parsed IOwnerResponse object.
 */
export function getERCOwnerFromRaw(rawOwnerData: ERCOwnerResponse): IOwnerResponse {
  try {
    return rawOwnerData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 set Operator response: ' + e);
  }
}

/**
 * Parses the raw data of owner details and returns a formatted ISetOperatorResponse object.
 *
 * @param rawOwnerDetailsData - Raw set operator data.
 * @returns The parsed ISetOperatorResponse object.
 */
export function getERCOwnerDetailsFromRaw(rawOwnerDetailsData: ERCOwnerDetailsResponse): Array<IOwnerDetailsResponse> {
  try {
    return rawOwnerDetailsData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 set Operator response: ' + e);
  }
}

/**
 * Parses the raw data of owner details and returns a formatted ISetOperatorResponse object.
 *
 * @param rawOwnerDetailsData - Raw set operator data.
 * @returns The parsed ISetOperatorResponse object.
 */
export function getERCApproveStatusFromRaw(rawOwnerDetailsData: ERCApproveResponse): IApproveResponse {
  try {
    return rawOwnerDetailsData?.data;
  } catch (e) {
    throw new Error('Error parsing the ERC721 set Operator response: ' + e);
  }
}
