import { Network } from '../types/types';

// Default network for the edeXa API
export const DEFAULT_NETWORK = Network.SANDBOX;

// Default maximum number of retries for HTTP requests
export const DEFAULT_MAX_RETRIES = 5;

// Default request timeout in milliseconds (0 = no timeout)
export const DEFAULT_REQUEST_TIMEOUT = 30000;

/**
 * Returns the HTTP URL for the edeXa bStamp API based on the network and API key.
 *
 * @param network - The network to use (e.g., 'mainnet', 'testnet').
 * @returns The HTTP URL for the edeXa bStamp API.
 */
export function getEdexaBstampHttpUrl(network: Network): string {
  return `https://api-edexagw.${network}.com/bstamp`;
}

/**
 * Returns the HTTP URL for the edeXa bStamp v2 API based on the network and API key.
 *
 * @param network - The network to use (e.g., 'mainnet', 'testnet').
 * @returns The HTTP URL for the edeXa bStamp v2 API.
 */
export function getEdexaBstampV2HttpUrl(network: Network): string {
  return `https://api-edexagw.${network}.com/bstamp/v2`;
}

/**
 * Returns the HTTP URL for the edeXa bArchive API based on the network and API key.
 *
 * @param network - The network to use (e.g., 'mainnet', 'testnet').
 * @returns The HTTP URL for the edeXa bArchive.
 */
export function getEdexaBarchiveHttpUrl(network: Network): string {
  return `https://api-edexagw.${network}.com/barchive`;
}

/**
 * Returns the HTTP URL for the edeXa bArchive API based on the network and API key.
 *
 * @param network - The network to use (e.g., 'mainnet', 'testnet').
 * @returns The HTTP URL for the edeXa bArchive.
 */
export function getEdexaERC20HttpUrl(network: Network): string {
  // return `https://api-edexagw.${network}.com/barchive`;
  return `http://localhost:6000`;
}

/**
 * Represents the types of edeXa APIs.
 */
export enum EdexaApiType {
  BSTAMP, // edeXa bStamp API
  BARCHIVE, // edeXa bArchive API
  ERC20, // edeXa erc20 API
}

export enum MODULE_SLUG {
  API = 'api',
  Mint = 'mint',
  BALANCE = 'balance',
  USER = 'user',
  REGISTER = 'register',
  CLIENT = 'client',
  TRANSFER = 'transfer',
  SUPPLY = 'supply',
  BURN = 'burn',
  APPROVE = 'approve',
  ALLOWANCE = 'allowance',
  TRANSFER_FROM = 'transfer-from',
}
export enum TOKEN_TYPE {
  ERC_20 = 'erc20',
}

/**
 * Represents the available API versions.
 */
export enum API_VERSION {
  VERSION_1 = 'v1', // Version 1
  VERSION_2 = 'v2', // Version 2
}

export enum REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const IS_PRIVATE = {
  TRUE: true,
  FALSE: false,
};

export const API_METHOD = {
  AUTHENTICATE: 'authenticate',
  ADD_STAMP: 'addStamp',
  GET_ALL_STAMP: 'getAllStamp',
  STAMP_DETAILS: 'getStampDetail',
  ELECTRONIC_SIGN: 'addElectronicSign',
  ENROLL_USER: 'enrollUser',
  CREATE_WEBHOOK: 'createWebhook',
  GET_WEBHOOK: 'getWebhook',
  FILE: 'file',
  ERC20_AUTHENTICATE: 'api/authenticate',
  MINT_TOKEN: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.Mint}`,
  BALANCEOF: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.BALANCE}`,
  ENROLL_USERS: `${MODULE_SLUG.API}/${MODULE_SLUG.USER}/${MODULE_SLUG.REGISTER}`,
  ACCOUNTID: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.CLIENT}`,
  TRANSFER_TOKEN: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.TRANSFER}`,
  TOTAL_SUPPLY: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.SUPPLY}`,
  BURN_TOKENS: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.BURN}`,
  SET_OPERATOR: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.APPROVE}`,
  CHECK_ALLOWANCE: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.ALLOWANCE}`,
  TRANSFER_FROM: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.TRANSFER_FROM}`,
};
