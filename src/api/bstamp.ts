// Import necessary dependencies and types
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
import { AddStampRequestDTO, CommonConfigDTO, EnrollUserDTO, GetStampDetailsDTO, Iauthenticate, Ibstamp, IbstampAuth, IbstampGetAllStamp, IbstampGetStampDetail } from '../util/interface';

// Bstamp class
export class Bstamp {
  readonly config: EdexaConfig;

  constructor(settings?: EdexaSettings) {
    // Create a new EdexaConfig instance with the provided settings
    this.config = new EdexaConfig(settings);
  }

  /**
   * Authenticates the client with the Edexa API.
   *
   * @param settings - Configuration settings for the authentication request.
   * @returns A Promise that resolves to the authentication response.
   */
  async authenticate(settings): Promise<IbstampAuth> {
    return authenticate(this.config, settings);
  }

  /**
   * Adds a stamp.
   *
   * @param data - Data for adding the stamp.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the added stamp.
   */
  addStamp(data, config: CommonConfigDTO): Promise<Ibstamp> {
    return addStamp(this.config, data, config);
  }

  /**
   * Retrieves all stamps.
   *
   * @param data - Data for retrieving all stamps.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the list of all stamps.
   */
  getAllStamp(data, config:CommonConfigDTO): Promise<IbstampGetAllStamp> {
    return getAllStamp(this.config, data, config);
  }

  /**
   * Retrieves the details of a specific stamp.
   *
   * @param data - Data for retrieving the stamp details.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the stamp details.
   */
  getStampDetail(data, config:CommonConfigDTO): Promise<IbstampGetStampDetail> {
    return getStampDetail(this.config, data, config);
  }

  /**
   * Adds an electronic signature.
   *
   * @param data - Data for adding the electronic signature.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the result of adding the electronic signature.
   */
  addElectronicSign(data: any, config?: CommonConfigDTO): Promise<any> {
    return addElectronicSign(this.config, data, config);
  }

  /**
   * Enrolls a user.
   *
   * @param data - Data for enrolling the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the result of enrolling the user.
   */
  enrollUser(data: EnrollUserDTO, config?: CommonConfigDTO): Promise<any> {
    return enrollUser(this.config, data, config);
  }
}