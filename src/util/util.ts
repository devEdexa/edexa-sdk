import {
  Ibstamp,
  IbstampAuth,
  IbstampGetAllStamp,
  IbstampGetAllStampRaw,
  IbstampGetStampDetail,
  IbstampGetStampDetailRaw,
} from './interface';
import { IbarchiveAddFile, IbarchiveAddFileData, IbarchiveGetFile, IbarchiveGetFileData } from './interface/IBarchive';
import { CommonResponse, ICommonAuth } from './interface/ICommon';
import {
  erc20AccountIdDTO,
  erc20AccountIdData,
  erc20BurnTokenDTO,
  erc20BurnTokenData,
  erc20EnrollUsersDTO,
  erc20EnrollUsersData,
  erc20GetBalanceOfDTO,
  erc20GetBalanceOfData,
  erc20MintTokenDTO,
  erc20MintTokenData,
  erc20commonData,
  erc20TotalSupplyData,
  erc20TransferTokenDTO,
  erc20TransferTokenData,
  erc20commonDTO,
} from './interface/erc20';

/**
 * Parses the raw stamp data and returns a formatted Ibstamp object.
 *
 * @param rawStamp - Raw stamp data.
 * @returns The parsed Ibstamp object.
 */
export function getStampFromRaw(rawStamp: any): Ibstamp {
  try {
    return {
      id: rawStamp?.data?.id,
      txId: rawStamp?.data?.txid,
      code: rawStamp?.data?.code,
      hash: rawStamp?.data?.hash,
      filename: rawStamp?.data?.filename,
    };
  } catch (e) {
    throw new Error('Error parsing the Bstamp response: ' + e);
  }
}

/**
 * Parses the raw stamp authentication data and returns a formatted IbstampAuth object.
 *
 * @param rawStampAuth - Raw stamp authentication data.
 * @returns The parsed IbstampAuth object.
 */
export function getStampAuthFromRaw(rawStampAuth: {
  data: { _id: string; token: string; username: string; name: string };
}): IbstampAuth {
  try {
    return {
      id: rawStampAuth?.data?._id,
      token: rawStampAuth?.data?.token,
      username: rawStampAuth?.data?.username,
      name: rawStampAuth?.data?.name,
    };
  } catch (e) {
    throw new Error('Error parsing the Bstamp auth response: ' + e);
  }
}

/**
 * Parses the raw data from getAllStamp API and returns a formatted IbstampGetAllStamp object.
 *
 * @param rawGetAllStamp - Raw data from getAllStamp API.
 * @returns The parsed IbstampGetAllStamp object.
 */
export function getAllStampFromRaw(rawGetAllStamp: IbstampGetAllStampRaw): IbstampGetAllStamp {
  try {
    const stamps = [];
    for (const rawStamp of rawGetAllStamp.data.files) {
      stamps.push(rawStamp);
    }
    const stampData: any = {};
    stampData.count = rawGetAllStamp.data.count;
    stampData.stamps = stamps;
    return stampData;
  } catch (e) {
    throw new Error('Error parsing the Bstamp response: ' + e);
  }
}

/**
 * Parses the raw data from getStampDetail API and returns a formatted IbstampGetStampDetail object.
 *
 * @param rawGetStampDetail - Raw data from getStampDetail API.
 * @returns The parsed IbstampGetStampDetail object.
 */
export function getStampDetailFromRaw(rawGetStampDetail: IbstampGetStampDetailRaw): IbstampGetStampDetail {
  try {
    return {
      hash: rawGetStampDetail?.data?.hash,
      originalDocHash: rawGetStampDetail?.data?.originalDocHash,
      metaData: rawGetStampDetail?.data?.metaData,
      filename: rawGetStampDetail?.data?.filename,
      type: rawGetStampDetail?.data?.type,
      txid: rawGetStampDetail?.data?.txid,
      timestamp: rawGetStampDetail?.data?.timestamp,
      code: rawGetStampDetail?.data?.code,
      username: rawGetStampDetail?.data?.username,
      userVerify: rawGetStampDetail?.data?.userVerify,
      isEsign: rawGetStampDetail?.data?.isEsign,
      isPrivateBc: rawGetStampDetail?.data?.isPrivateBc,
    };
  } catch (e) {
    throw new Error('Error parsing the Bstamp response: ' + e);
  }
}

/**
 * Parses the raw archive authentication data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveAuth - Raw archive authentication data.
 * @returns The parsed IbarchiveAuth object.
 */
export function getArchiveAuthFromRaw(rawArchiveAuth: {
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
    throw new Error('Error parsing the Barchive auth response: ' + e);
  }
}

/**
 * Parses the raw archive authentication data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveAddFile - Raw archive authentication data.
 * @returns The parsed IbarchiveAuth object.
 */
export async function addArchiveFileFromRaw(rawArchiveAddFile: IbarchiveAddFileData): Promise<Array<IbarchiveAddFile>> {
  try {
    return rawArchiveAddFile?.data;
  } catch (e) {
    throw new Error('Error parsing the Barchive addFile response: ' + e);
  }
}

/**
 * Parses the raw archive authentication data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveAddFile - Raw archive authentication data.
 * @returns The parsed IbarchiveAuth object.
 */
export async function getArchiveFileFromRaw(rawArchiveAddFile: IbarchiveGetFileData): Promise<Array<IbarchiveGetFile>> {
  try {
    return rawArchiveAddFile.data;
  } catch (e) {
    throw new Error('Error parsing the Barchive getFile response: ' + e);
  }
}

/**
 * Parses the raw archive file updation data and returns a formatted CommonResponse object.
 *
 * @param rawArchiveUpdateFile - Raw archive file updation data.
 * @returns The parsed CommonResponse object.
 */
export async function updateArchiveFileFromRaw(rawArchiveUpdateFile: CommonResponse): Promise<CommonResponse> {
  try {
    return {
      status: rawArchiveUpdateFile?.status,
      message: rawArchiveUpdateFile?.message,
    };
  } catch (e) {
    throw new Error('Error parsing the Barchive update file response: ' + e);
  }
}

/**
 * Parses the raw archive file delete data and returns a formatted IbarchiveAuth object.
 *
 * @param rawArchiveDeleteFile - Raw archive file delation data.
 * @returns The parsed CommonResponse object.
 */
export async function deleteArchiveFileFromRaw(rawArchiveDeleteFile: CommonResponse): Promise<CommonResponse> {
  try {
    return {
      status: rawArchiveDeleteFile?.status,
      message: rawArchiveDeleteFile?.message,
    };
  } catch (e) {
    throw new Error('Error parsing the Barchive delete file response: ' + e);
  }
}

/**
 * Parses the raw token engine authentication data and returns a formatted ITokenEngineAuth object.
 *
 * @param rawTokenEngineAuth - Raw token engine authentication data.
 * @returns The parsed ITokenEngineAuth object.
 */
export function getTokenEngineAuthFromRaw(rawTokenEngineAuth: {
  data: { _id: string; token: string; username: string; email: string };
}): ICommonAuth {
  try {
    return {
      id: rawTokenEngineAuth?.data?._id,
      token: rawTokenEngineAuth?.data?.token,
      username: rawTokenEngineAuth?.data?.username,
      email: rawTokenEngineAuth?.data?.email,
    };
  } catch (e) {
    throw new Error('Error parsing the token engine auth response: ' + e);
  }
}

/**
 * Parses the raw mint token data and returns a formatted minted token object.
 *
 * @param rawErc20MintToken - Raw erc 20 mint Token.
 * @returns The parsed minted token object.
 */
export async function mintTokenFromRaw(rawErc20MintToken: erc20MintTokenData): Promise<erc20MintTokenDTO> {
  try {
    return rawErc20MintToken?.data;
  } catch (e) {
    throw new Error('Error parsing mint token response: ' + e);
  }
}

/**
 * Parses the raw balance data and returns a formatted balanceOf object.
 *
 * @param rawErc20balanceOf - Raw erc 20 balanceOf.
 * @returns The parsed balanceOf object.
 */
export async function balanceFromRaw(rawErc20balanceOf: erc20GetBalanceOfData): Promise<erc20GetBalanceOfDTO> {
  try {
    return rawErc20balanceOf?.data;
  } catch (e) {
    throw new Error('Error parsing balanceOf response: ' + e);
  }
}

/**
 * Parses the raw enroll user data and returns a formatted enroll user object.
 *
 * @param rawErc20enrollUsers - Raw erc 20 enroll user.
 * @returns The parsed balanceOf object.
 */
export async function enrollUsersFromRaw(rawErc20enrollUsers: erc20EnrollUsersData): Promise<erc20EnrollUsersDTO> {
  try {
    return rawErc20enrollUsers?.data;
  } catch (e) {
    throw new Error('Error parsing enroll user response: ' + e);
  }
}

/**
 * Parses the raw accountId data and returns a accountId of user object.
 *
 * @param rawErc20AccountId - Raw erc 20 accountId of user.
 * @returns The parsed accountId of user object.
 */
export async function accountIdFromRaw(rawErc20AccountId: erc20AccountIdData): Promise<erc20AccountIdDTO> {
  try {
    return rawErc20AccountId?.data;
  } catch (e) {
    throw new Error('Error parsing account Id response: ' + e);
  }
}

/**
 * Parses the raw transfer token data and returns a transfer token to which user object.
 *
 * @param rawErc20TransferToken - Raw erc 20 transfer token to user.
 * @returns The parsed transfer token to user object.
 */
export async function transferTokenRaw(rawErc20TransferToken: erc20TransferTokenData): Promise<erc20TransferTokenDTO> {
  try {
    return rawErc20TransferToken?.data;
  } catch (e) {
    throw new Error('Error parsing transfer token response: ' + e);
  }
}

/**
 * Parses the raw total supply data and returns a total supply object.
 *
 * @param rawErc20TotalSupply - Raw erc 20 total supply.
 * @returns The parsed total supply object.
 */
export async function totalSupplyFromRaw(rawErc20TotalSupply: erc20TotalSupplyData): Promise<erc20TransferTokenDTO> {
  try {
    return rawErc20TotalSupply?.data;
  } catch (e) {
    throw new Error('Error parsing total supply response: ' + e);
  }
}

/**
 * Parses the raw burn tokens data and returns a burn tokens object.
 *
 * @param rawErc20BurnTokens - Raw erc 20 burn tokens.
 * @returns The parsed burn tokens object.
 */
export async function burnTokenFromRaw(rawErc20BurnTokens: erc20BurnTokenData): Promise<erc20BurnTokenDTO> {
  try {
    return rawErc20BurnTokens?.data;
  } catch (e) {
    throw new Error('Error parsing burn token response: ' + e);
  }
}

/**
 * Parses the raw set operator for token data and returns set token operator object.
 *
 * @param rawErc20SetOperator - Raw erc 20 set operator for token.
 * @returns The parsed set token operator object.
 */
export async function setOperatorFromRaw(rawErc20SetOperator: erc20commonData): Promise<erc20commonDTO> {
  try {
    return rawErc20SetOperator?.data;
  } catch (e) {
    throw new Error('Error parsing set operator for token response: ' + e);
  }
}

/**
 * Parses the raw check spender allowance limit for token data and returns spender allowance limit object.
 *
 * @param rawErc20CheckAllowanceLimit - Raw erc 20 check spender allowance limit for token.
 * @returns The parsed set token operator object.
 */
export async function checkAllowanceFromRaw(rawErc20CheckAllowanceLimit: erc20commonData): Promise<erc20commonDTO> {
  try {
    return rawErc20CheckAllowanceLimit?.data;
  } catch (e) {
    throw new Error('Error parsing check spender allowance limit for token response: ' + e);
  }
}

/**
 * Parses the raw transfer token from data and returns transfer token from object.
 *
 * @param rawErc20TransferTokenFrom - Raw erc 20 transfer token from.
 * @returns The parsed transfer token from object.
 */
export async function transferTokenFromRaw(rawErc20TransferTokenFrom: erc20commonData): Promise<erc20commonDTO> {
  try {
    return rawErc20TransferTokenFrom?.data;
  } catch (e) {
    throw new Error('Error parsing transfer token from response: ' + e);
  }
}
