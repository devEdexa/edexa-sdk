import { Network } from '../types/types'

export const DEFAULT_NETWORK = Network.SANDBOX
export const DEFAULT_MAX_RETRIES = 5
export const DEFAULT_REQUEST_TIMEOUT = 0 // 0 = no timeout

export function getEdexaBstampHttpUrl(network: Network, apiKey: string): string {
  return `https://api-edexagw.${network}.com/bstamp`
}

export function getEdexaBstampV2HttpUrl(network: Network, apiKey: string): string {
  return `https://api-edexagw.${network}.com/bstamp/v2`
}

export enum EdexaApiType {
  BSTAMP,
}

export enum API_VERSION {
  VERSION_1 = 'v1',
  VERSION_2 = 'v2',
}
