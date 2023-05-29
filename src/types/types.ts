/**
 * Configuration settings for the Edexa SDK.
 */
export interface EdexaSettings {
  authorization?: string; // Optional Edexa auth token for sending requests with the Notify API
  url?: string; // Optional custom URL to send requests to instead of using the network and apiKey
  clientId?: string; // Optional client ID for authentication
  clientSecret?: string; // Optional client secret for authentication
  network: Network; // The network that the SDK is associated with
  requestTimeout?: number; // Optional timeout is ms for api call
}

/**
 * Enum defining different network options for the Edexa SDK.
 */
export enum Network {
  SANDBOX = 'io-world', // Sandbox network
  MAINNET = 'edexa', // Mainnet network
}
