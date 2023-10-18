export interface Iauthenticate {
  headers: {
    'client-id': string;
    'client-secret': string;
  };
}

export interface ICommonAuth {
  token: string;
  name: string;
  username: string;
  id: string;
}

export interface GetDetailsByIdDTO {
  id: string;
}