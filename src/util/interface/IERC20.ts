export interface IMintTokenDTO {
  value: string;
}

export interface IERC20MintToken {
  balance: number;
  minter: string;
}

export interface IERC20MintTokenData {
  status: number;
  message: string;
  data: IERC20MintToken;
}

export interface IERC20GetBalance {
  userId?: string;
  chaincode?: string;
  channel?: string;
  balance?: number;
}

export interface IERC20GetBalanceOfData {
  status: number;
  message: string;
  data: { balance };
}

export interface IAccountIdDTO {
  userId: string;
}
export interface IERC20AccountId {
  username: string;
}

export interface IERC20AccountIdData {
  status: number;
  message: string;
  data: IERC20AccountId;
}

export interface ITransferTokenDTO {
  to: string;
  value: string;
  chaincode?: string;
  channel?: string;
}

export interface IERC20TransferToken {
  to: string;
  from: string;
  updatedBalance: number;
}

export interface IERC20TransferTokenData {
  status: number;
  message: string;
  data: IERC20TransferToken;
}

export interface ITotalSupplyDTO {
  chaincode?: string;
  channel?: string;
}
export interface IERC20TotalSupply {
  supply?: number;
}

export interface IERC20TotalSupplyData {
  status: number;
  message: string;
  data: IERC20TotalSupply;
}

export interface IBurnTokenDTO {
  chaincode?: string;
  channel?: string;
  value: string;
}
export interface IERC20BurnToken {
  burner: string;
  updatedBalance: number;
}

export interface IERC20BurnTokenData {
  status: number;
  message: string;
  data: IERC20BurnToken;
}

export interface ISetOperatorDTO {
  chaincode?: string;
  channel?: string;
  spender: string;
  value: string;
}
export interface IERC20Common {
  allowanceAmount: number;
  to: string;
  allowanceLimit?: string;
}

export interface IERC20SetOperatorData {
  status: number;
  message: string;
  data: IERC20Common;
}

export interface IGetAllowanceDTO {
  chaincode?: string;
  channel?: string;
  spender: string;
}

export interface IERC20AllowanceData {
  status: number;
  message: string;
  data: IERC20Common;
}

export interface ITransferTokenFromDTO {
  chaincode?: string;
  channel?: string;
  value: string;
  to: string;
  from: string;
}
export interface IERC20TransferTokenFrom {
  to: string;
  spender: string;
  updatedBalance: number;
}

export interface IERC20TransferTokenFromData {
  status: number;
  message: string;
  data: IERC20TransferTokenFrom;
}
