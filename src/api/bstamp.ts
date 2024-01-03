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
  createWebhook,
  getWebhook,
} from '../internal/bstamp-api';
import {
  AddStampRequestDTO,
  AddStampRequestV2DTO,
  CommonConfigDTO,
  CreateWebhookDTO,
  EnrollUserDTO,
  GetStampDetailsDTO,
  GetStampDetailsV2DTO,
  GetStampV2DTO,
  IGetWebhook,
  Ibstamp,
  IbstampAuth,
  IbstampGetAllStamp,
  IbstampGetStampDetail,
} from '../util/interface';

// Bstamp class
export class Bstamp {
  readonly config: EdexaConfig;

  constructor(settings?: EdexaSettings) {
    // Create a new EdexaConfig instance with the provided settings
    this.config = new EdexaConfig(settings);
  }

  /**
   * Authenticates the client with the edeXa API.
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
  addStamp(data: AddStampRequestDTO | AddStampRequestV2DTO, config: CommonConfigDTO): Promise<Ibstamp> {
    return addStamp(this.config, data, config);
  }

  /**
   * Retrieves all stamps.
   *
   * @param data - Data for retrieving all stamps.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the list of all stamps.
   */
  getAllStamp(data: AddStampRequestDTO | GetStampV2DTO, config: CommonConfigDTO): Promise<IbstampGetAllStamp> {
    return getAllStamp(this.config, data, config);
  }

  /**
   * Retrieves the details of a specific stamp.
   *
   * @param data - Data for retrieving the stamp details.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the stamp details.
   */
  getStampDetail(
    data: GetStampDetailsDTO | GetStampDetailsV2DTO,
    config: CommonConfigDTO
  ): Promise<IbstampGetStampDetail> {
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

  /**
   * Creates a webhook.
   *
   * @param data - Data for creating the webhook.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the result of creation of webhook.
   */
  createWebhook(data: CreateWebhookDTO, config?: CommonConfigDTO): Promise<any> {
    return createWebhook(this.config, data, config);
  }

  /**
   * Get a webhook.
   *
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the result of details of webhook.
   */
  getWebhook(config?: CommonConfigDTO): Promise<IGetWebhook> {
    return getWebhook(this.config, config);
  }
}
