export interface Iauthenticate {
  headers: {
    'client-id': string;
    'client-secret': string;
  };
}

export interface Ibstamp {
  id: string;
  hash: string;
  txId: string;
  code: string;
  filename: string;
}
export interface IbstampAuth {
  token: string;
  name: string;
  username: string;
  id: string;
}

export interface IbstampGetAllStamp {
  count: number;
  stamps: any[]; 
}

export interface IbstampGetAllStampRaw {
  status: number;
  message: string;
  data?: { count: number; files: object[] };
}
export interface IbstampGetStampDetailRaw {
  status: number;
  message: string;
  data?: {
    hash: string;
    originalDocHash: string;
    metaData: string;
    filename: string;
    type: string;
    txid: string;
    timestamp: string;
    code: string;
    username: string;
    userVerify: number;
    isEsign: boolean;
    isPrivateBc: boolean;
  };
}
export interface IbstampGetStampDetail {}