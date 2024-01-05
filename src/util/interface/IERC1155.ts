export interface IAccount {
  userId?: string;
  chaincode?: string;
  channel?: string;
}

export interface IAccountResponse {
  username: string;
}

export interface IBalanceResponse {
  balance: string;
}
export interface IBatchBalance {
  userId: Array<string>;
  tokenId: Array<number>;
  chaincode?: string;
  channel?: string;
}

export interface IBatchBalanceResponse {
  balance: Array<number>;
}

export interface IMintBody {
  value: string;
  tokenId?: string;
  chaincode?: string;
  channel?: string;
}
export interface IMintResponse {
  tokenId: string;
  minter: string;
}

export interface IBatchMintBody {
  value: Array<number>;
  tokenId?: Array<number>;
  chaincode?: string;
  channel?: string;
}
export interface IBatchMintResponse {
  tokenId: Array<number>;
  minter: string;
}

export interface IBurnBody {
  tokenId: string;
  value: string;
  chaincode?: string;
  channel?: string;
}

export interface IBatchBurnBody {
  tokenId: Array<number>;
  value: Array<number>;
  chaincode?: string;
  channel?: string;
}

export interface IBurnResponse {
  burner: string;
}

export interface ISetURIBody {
  tokenId: number;
  URL: string;
  hannel?: string;
  chaincode?: string;
}
export interface ISetURIResponse {
  tokenId: number;
  URI: string;
}

export interface IGetURIBody {
  tokenId: number;
  hannel?: string;
  chaincode?: string;
}
export interface IGetURIResponse {
  URI: string;
}

export interface ITokenTransferBody {
  to: string;
  tokenId: string;
  value: string;
  channel?: string;
  chaincode?: string;
}
export interface ITokenTransferResponse {
  from: string;
  to: string;
}

export interface IBatchTokenTransferBody {
  to: string;
  tokenId: Array<number>;
  value: Array<number>;
  channel?: string;
  chaincode?: string;
}

export interface IMultiUserTokenTransferBody {
  to: Array<string>;
  tokenId: Array<number>;
  value: Array<number>;
  channel?: string;
  chaincode?: string;
}

export interface IMultiUserTokenTransferResponse {
  from: string;
  to: Array<string>;
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
  spender: string;
  value: string;
  channel?: string;
  chaincode?: string;
}
export interface IApproveResponse {
  allowanceAmount: number;
  to: string;
}

export interface IApproveStatusBody {
  spender: string;
  channel?: string;
  chaincode?: string;
}
export interface IApproveStatusResponse {
  status: boolean;
  spender: string;
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

export interface ERCBatchBalanceResponse {
  status: number;
  message: string;
  data: IBatchBalanceResponse;
}

export interface ERCMintResponse {
  status: number;
  message: string;
  data: IMintResponse;
}

export interface ERCBatchMintResponse {
  status: number;
  message: string;
  data: IBatchMintResponse;
}

export interface ERCBurnResponse {
  status: number;
  message: string;
  data: IBurnResponse;
}

export interface ERCSetURIResponse {
  status: number;
  message: string;
  data: ISetURIResponse;
}

export interface ERCURIResponse {
  status: number;
  message: string;
  data: IGetURIResponse;
}

export interface ERCTokenTransferResponse {
  status: number;
  message: string;
  data: ITokenTransferResponse;
}
export interface ERCMultiUserTokenTransferResponse {
  status: number;
  message: string;
  data: IMultiUserTokenTransferResponse;
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
