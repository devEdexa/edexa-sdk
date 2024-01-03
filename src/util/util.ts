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
