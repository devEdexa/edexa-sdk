import { API_VERSION } from '../util/constant';

export interface EdexaSettings {
  authorization?: string;
  url?: string;
  clientId?: string;
  clientSecret?: string;
  network: Network;
}

export enum Network {
  SANDBOX = 'io-world',
  MAINNET = 'edexa',
}
