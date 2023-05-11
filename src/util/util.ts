import { Bstamp, Ibstamp, RawBstamp } from '../api/bstamp'

export function getStampFromRaw(rawStamp): Ibstamp {
  try {
    return {
      id: rawStamp?.data?.id,
      txId: rawStamp?.data?.txid,
      code: rawStamp?.data?.code,
      hash: rawStamp?.data?.hash,
      filename: rawStamp?.data?.filename,
    }
  } catch (e) {
    throw new Error('Error parsing the NFT response: ' + e)
  }
}
