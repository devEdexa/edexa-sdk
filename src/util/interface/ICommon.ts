export interface Iauthenticate {
  headers: {
    'client-id': string;
    'client-secret': string;
  };
}

export interface ICommonAuth {
  token: string;
  name?: string;
  username: string;
  id: string;
  email?: string;
}

export interface GetDetailsByIdDTO {
  id: string;
}

export interface CommonResponse {
  status: number;
  message: string;
}

export interface IEnrollUsersDTO {
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

export interface IERCEnrollUsersData {
  status: number;
  message: string;
  data: IEnrollUsersDTO;
}
