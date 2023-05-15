import { Ibstamp, IbstampAuth, IbstampGetAllStamp } from '../api/bstamp';

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

export function getAllStampFromRaw(rawGetAllStamp: {
  status: number;
  message: string;
  data?: { count: number; files: object[] };
}): IbstampGetAllStamp {
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
