import { EdexaSettings, Network } from '../types/types';
import {
  API_VERSION,
  DEFAULT_NETWORK,
  DEFAULT_REQUEST_TIMEOUT,
  EdexaApiType,
  getEdexaBarchiveHttpUrl,
  getEdexaBstampHttpUrl,
  getEdexaBstampV2HttpUrl,
  getEdexaTokenEngineHttpUrl,
} from '../util/constant';

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
export class EdexaConfig {
  /** The Network that this SDK is associated with. */
  readonly network: Network;

  /** The optional edeXa auth token to use when sending requests with the Notify API. */
  readonly authorization?: string;

  /**
   * The optional Request timeout provided in `ms` for NFT and NOTIFY API. Defaults to 0.
   */
  readonly requestTimeout?: number;

  readonly version: API_VERSION;

  constructor(config?: EdexaSettings) {
    this.network = config?.network || DEFAULT_NETWORK;
    this.authorization = config?.authorization;
    this.requestTimeout = config?.requestTimeout || DEFAULT_REQUEST_TIMEOUT;
  }

  /**
   * Returns the URL endpoint to send the HTTP request to. If a custom URL was
   * provided in the config, that URL is returned. Otherwise, the default URL is
   * from the network and API key.
   *
   * @param apiType - The type of API to get the URL for.
   * @param version - The version of the API to get the URL for.
   * @internal
   */
  _getRequestUrl(apiType: EdexaApiType, version: API_VERSION): string {
    if (apiType === EdexaApiType.BSTAMP && version == API_VERSION.VERSION_1) {
      return getEdexaBstampHttpUrl(this.network);
    } else if (apiType === EdexaApiType.BSTAMP && version == API_VERSION.VERSION_2) {
      return getEdexaBstampV2HttpUrl(this.network);
    } else if (apiType === EdexaApiType.BARCHIVE) {
      return getEdexaBarchiveHttpUrl(this.network);
    } else if (apiType === EdexaApiType.TOKEN_ENGINE) {
      return getEdexaTokenEngineHttpUrl(this.network);
    }
  }
}
