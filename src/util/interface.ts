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
export interface IbstampGetStampDetail {
  hash: string;
  originalDocHash: string;
  metaData: object | string;
  filename: string;
  type: string;
  txid: string;
  timestamp: string;
  code: string;
  username: string;
  userVerify: number;
  isEsign: boolean;
  isPrivateBc: boolean;
}

export interface AddStampRequestDTO {
  hash: string;
  isPrivate: boolean;
}

export interface AddStampRequestV2DTO {
  hash: string;
  userId: string;
}

export interface GetStampDetailsDTO {
  id: string;
}

export interface GetStampDetailsV2DTO {
  userId: string;
  id: string;
}
export interface GetStampV2DTO {
  userId: string;
  search?: string;
  page: string;
  number: string;
}

export interface EnrollUserDTO {
  userId: string;
  username: string;
  email: string;
}

export interface CommonConfigDTO {
  version: string;
}

export interface IbstampCreateWebhook {
  redirectUrl: string;
  description: string;
  action: string[];
}

export interface CreateWebhookDTO {
  redirectUrl: string;
  description: string;
  action: string[];
}

class UsersDto {
  _id: string;
  name: string;
  clientId: string;
  orgId: string;
  username: string;
  email: string;
  status: string;
  loginType: string;
  profilePicture: string;
  language: string;
  viewType: string;
  totalStamps: string;
  watermark: string;
  usedStamps: string;
  align: string;
  publicAddress: string;
  createdAt: string;
  updatedAt: string;
}
class GetWebhookDTO {
  _id: string;
  userId: string;
  redirectUrl: string;
  description: string;
  action: string[];
  status: number;
  createdAt: string;
  updatedAt: string;
  event: any[];
  users: UsersDto;
}

export interface GetWebhookDetailsDTO {
  status: number;
  message: string;
  data: GetWebhookDTO;
}

export interface IGetWebhook {
  status: number;
  message: number;
  data: any[];
}
