import {
  Ibstamp,
  IbstampAuth,
  IbstampGetAllStamp,
  IbstampGetAllStampRaw,
  IbstampGetStampDetail,
  IbstampGetStampDetailRaw,
} from './interface';

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
