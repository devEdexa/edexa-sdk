export interface erc20MintTokenDTO {
  balance?: number | string;
  minter?: string;
}

export interface erc20MintTokenData {
  status: number;
  message: string;
  data: erc20MintTokenDTO;
}

export interface erc20GetBalanceOfDTO {
  userId?: string;
  chaincode?: string;
  channel?: string;
  balance?: number;
}

export interface erc20GetBalanceOfData {
  status: number;
  message: string;
  data: { balance };
}
export interface erc20EnrollUsersDTO {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  countryCode: string;
  location?: string;
  email: string;
  id?: string;
  profilePic?: any;
  uuid?: string;
  chaincode?: string;
  channel?: string;
  serviceName?: string;
  username?: string;
  loginType?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  status?: string;
}

export interface erc20EnrollUsersData {
  status: number;
  message: string;
  data: erc20EnrollUsersDTO;
}

export interface erc20AccountIdDTO {
  userId?: string;
  username?: string;
}

export interface erc20AccountIdData {
  status: number;
  message: string;
  data: { username };
}

export interface erc20TransferTokenDTO {
  to?: string;
  from?: string;
  value?: string;
  chaincode?: string;
  channel?: string;
  updatedBalance?: number;
}

export interface erc20TransferTokenData {
  status: number;
  message: string;
  data: erc20TransferTokenDTO;
}

export interface erc20TotalSupplyDTO {
  chaincode?: string;
  channel?: string;
  supply?: number;
}

export interface erc20TotalSupplyData {
  status: number;
  message: string;
  data: erc20TotalSupplyDTO;
}

export interface erc20BurnTokenDTO {
  chaincode?: string;
  channel?: string;
  value?: string;
  burner?: string;
  updatedBalance?: number;
}

export interface erc20BurnTokenData {
  status: number;
  message: string;
  data: erc20BurnTokenDTO;
}

export interface erc20commonDTO {
  chaincode?: string;
  to?: string;
  channel?: string;
  value?: string;
  spender?: string;
  from?: string;
  allowanceAmount?: number;
  allowanceLimit?: number;
  updatedBalance?: number;
}

export interface erc20commonData {
  status: number;
  message: string;
  data: erc20commonDTO;
}
