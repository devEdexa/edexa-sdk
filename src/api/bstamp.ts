import { EdexaSettings } from '../types/types';
import { EdexaConfig } from './config';
import {
  addElectronicSign,
  addStamp,
  authenticate,
  enrollUser,
  getAllStamp,
  getStampDetail,
} from '../internal/bstamp-api';
import { Ibstamp, IbstampAuth, IbstampGetAllStamp, IbstampGetStampDetail } from '../util/interface';

export class Bstamp {
  readonly config: EdexaConfig;

  constructor(settings?: EdexaSettings) {
    this.config = new EdexaConfig(settings);
  }

  async authenticate(settings): Promise<IbstampAuth> {
    return authenticate(this.config, settings);
  }

  addStamp(data: any, config: any): Promise<Ibstamp> {
    return addStamp(this.config, data, config);
  }

  getAllStamp(data: any, config: any): Promise<IbstampGetAllStamp> {
    return getAllStamp(this.config, data, config);
  }

  getStampDetail(data: any, config: any): Promise<IbstampGetStampDetail> {
    return getStampDetail(this.config, data, config);
  }

  addElectronicSign(data: any, config?: any): Promise<any> {
    return addElectronicSign(this.config, data, config);
  }

  // v2 method
  enrollUser(data: any, config?: any): Promise<any> {
    return enrollUser(this.config, data, config);
  }
}
