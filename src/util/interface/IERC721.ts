export interface IAccount {
  userId?: string;
  channel?: string;
  chaincode?: string;
}

export interface IAccountResponse {
  username: string;
}

export interface IBalanceResponse {
  balance: string;
}

export interface IBalanceResponse {
  balance: string;
}

export interface IMintBody {
  value: string;
  tokenUrl: string;
  channel?: string;
  chaincode?: string;
}

export interface IMintResponse {
  tokenId: string;
  tokenURI: string;
  minter: string;
}

export interface IBurnBody {
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface IBurnResponse {
  burner: string;
}

export interface ISupplyResponse {
  supply: string;
}

export interface IURIBody {
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface IURIResponse {
  URI: string;
}

export interface ITokenTransferBody {
  to: string;
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface ITokenTransferResponse {
  from: string;
  to: string;
  tokenId: string;
}

export interface ITokenTransferFromBody {
  to: string;
  from: string;
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface ITokenTransferFromResponse {
  spender: string;
  to: string;
}

export interface ISetOperatorBody {
  operator: string;
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface ISetOperatorResponse {
  operator: string;
  owner: string;
  tokenId: string;
}

export interface IApproveBody {
  operator: string;
  channel?: string;
  chaincode?: string;
}
export interface IApproveResponse {
  approve: boolean;
}

export interface ISetOperatorAllBody {
  operator: string;
  approve: boolean;
  channel?: string;
  chaincode?: string;
}
export interface ISetOperatorAllResponse {
  operator: string;
  owner: string;
  approve: boolean;
}

export interface IOwnerBody {
  tokenId: string;
  channel?: string;
  chaincode?: string;
}
export interface IOwnerResponse {
  operator: string;
}

export interface IOwnerDetailsBody {
  userId?: string;
  channel?: string;
  chaincode?: string;
}
export interface IOwnerDetailsResponse {
  tokenId: string;
  tokenUri: string;
  owner: string;
}

export interface IERCResponse {
  status: number;
  message: string;
  data: IAccountResponse;
}

export interface ERCBalanceResponse {
  status: number;
  message: string;
  data: IBalanceResponse;
}

export interface ERCMintResponse {
  status: number;
  message: string;
  data: IMintResponse;
}

export interface ERCBurnResponse {
  status: number;
  message: string;
  data: IBurnResponse;
}

export interface ERCSupplyResponse {
  status: number;
  message: string;
  data: ISupplyResponse;
}

export interface ERCURIResponse {
  status: number;
  message: string;
  data: IURIResponse;
}

export interface ERCTokenTransferResponse {
  status: number;
  message: string;
  data: ITokenTransferResponse;
}

export interface ERCTokenTransferFromResponse {
  status: number;
  message: string;
  data: ITokenTransferFromResponse;
}

export interface ERCSetOperatorResponse {
  status: number;
  message: string;
  data: ISetOperatorResponse;
}

export interface ERCSetOperatorAllResponse {
  status: number;
  message: string;
  data: ISetOperatorAllResponse;
}

export interface ERCOwnerResponse {
  status: number;
  message: string;
  data: IOwnerResponse;
}

export interface ERCOwnerDetailsResponse {
  status: number;
  message: string;
  data: [IOwnerDetailsResponse];
}

export interface ERCApproveResponse {
  status: number;
  message: string;
  data: IApproveResponse;
}
