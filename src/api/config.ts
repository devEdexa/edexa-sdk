import { EdexaSettings, Network } from '../types/types'
import { DEFAULT_NETWORK, EdexaApiType, getEdexaBstampHttpUrl } from '../util/constant'

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
export class EdexaConfig {
  /** The Edexa API key. */
  readonly apiKey: string

  /** The Network that this SDK is associated with. */
  readonly network: Network

  /**
   * The optional hardcoded URL to send requests to instead of using the network
   * and apiKey.
   */
  readonly url?: string

  /** The optional Edexa auth token to use when sending requests with the Notify API. */
  readonly authorization?: string

  /**
   * The optional Request timeout provided in `ms` for NFT and NOTIFY API. Defaults to 0.
   */
  readonly requestTimeout?: number

  constructor(config?: EdexaSettings) {
    this.network = config?.network || DEFAULT_NETWORK
    this.authorization = config?.authorization
  }

  /**
   * Returns the URL endpoint to send the HTTP request to. If a custom URL was
   * provided in the config, that URL is returned. Otherwise, the default URL is
   * from the network and API key.
   *
   * @param apiType - The type of API to get the URL for.
   * @internal
   */
  _getRequestUrl(apiType: EdexaApiType): string {
    if (this.url !== undefined) {
      return this.url
    } else if (apiType === EdexaApiType.BSTAMP) {
      return getEdexaBstampHttpUrl(this.network, this.apiKey)
    }
  }
}
