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
  // return `http://localhost:4011`;
}

/**
 * Returns the HTTP URL for the edeXa Token Engine API based on the network and API key.
 *
 * @param network - The network to use (e.g., 'mainnet', 'testnet').
 * @returns The HTTP URL for the edeXa Token Engine.
 */
export function getEdexaTokenEngineHttpUrl(network: Network): string {
  return `https://apitokenengine.io-world.com/token-platform`;
}

/**
 * Represents the types of edeXa APIs.
 */
export enum EdexaApiType {
  BSTAMP, // edeXa bStamp API
  BARCHIVE, // edeXa bArchive API
  TOKEN_ENGINE, // edeXa Token Engine API
}

export enum MODULE_SLUG {
  API = 'api',
  MINT = 'mint',
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

const ERC_SERVICE = {
  ERC721: 'erc721',
  ERC20: 'erc20',
  ERC1155: 'erc1155',
};

export const API_METHOD_ERC = {
  AUTHENTICATE: `${MODULE_SLUG.API}/authenticate`,
  ACCOUNT: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/client`,
  BALANCE: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/balance`,
  MINT: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/mint`,
  BURN: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/burn`,
  SUPPLY: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/supply`,
  URI: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/uri`,
  TRANSFER: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/transfer`,
  OWNER: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/owner`,
  OWNER_DETAIL: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/owner/detail`,
  OPERATOR: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/operator`,
  OPERATOR_ALL: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/operator/All`,
  APPROVE: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/approve`,
  TRANSFER_FROM: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC721}/transfer-from`,
};

export const API_METHOD_ERC1155 = {
  ACCOUNT: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/client`,
  BALANCE: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/balance`,
  BATCH_BALANCE: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/batch/balance`,
  MINT: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/mint`,
  BATCH_MINT: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/batch/mint`,
  BURN: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/burn`,
  BATCH_BURN: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/batch/burn`,
  SET_URI: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/setTokenURI`,
  GET_URI: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/getURI`,
  TRANSFER: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/transfer`,
  BATCH_TRANSFER: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/batch/transfer`,
  MULTI_USER_TRANSFER: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/batch/multiUser-transfer`,
  APPROVE: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/approve`,
  APPROVE_STATUS: `${MODULE_SLUG.API}/${ERC_SERVICE.ERC1155}/approve/check`,
};

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
  // AUTHENTICATE: `${MODULE_SLUG.API}/authenticate`,
  MINT_TOKEN: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.MINT}`,
  BALANCE_OF: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.BALANCE}`,
  ENROLL_USERS: `${MODULE_SLUG.API}/${MODULE_SLUG.USER}/${MODULE_SLUG.REGISTER}`,
  ACCOUNT_ID: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.CLIENT}`,
  TRANSFER_TOKEN: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.TRANSFER}`,
  TOTAL_SUPPLY: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.SUPPLY}`,
  BURN_TOKENS: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.BURN}`,
  SET_OPERATOR: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.APPROVE}`,
  CHECK_ALLOWANCE: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.ALLOWANCE}`,
  TRANSFER_FROM: `${MODULE_SLUG.API}/${TOKEN_TYPE.ERC_20}/${MODULE_SLUG.TRANSFER_FROM}`,
};
