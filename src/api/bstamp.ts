import { EdexaSettings } from '../types/types';
import { EdexaConfig } from './config';
import { addStamp, authenticate, getAllStamp } from '../internal/bstamp-api';
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
  stamps: object[];
}

export class Bstamp {
  readonly config: EdexaConfig;

  constructor(settings?: EdexaSettings) {
    this.config = new EdexaConfig(settings);
  }

  async authenticate(settings): Promise<IbstampAuth> {
    return authenticate(this.config, settings);
  }

  addStamp(data: any, config?: any): Promise<Ibstamp> {
    return addStamp(this.config, data, config);
  }

  getAllStamp(data: any, config?: any): Promise<any> {
    return getAllStamp(this.config, data, config);
  }
}
