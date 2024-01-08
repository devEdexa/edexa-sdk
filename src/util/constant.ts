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
export function getEdexaERC721HttpUrl(network: Network): string {
  // return `https://api-edexagw.${network}.com/barchive`;
  return `http://localhost:6000`;
}

/**
 * Represents the types of edeXa APIs.
 */
export enum EdexaApiType {
  BSTAMP, // edeXa bStamp API
  BARCHIVE, // edeXa bArchive API
  ERC721, // edeXa ERC-Token-Engine API
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
  AUTHENTICATE: 'authenticate',
  ACCOUNT: `${ERC_SERVICE.ERC721}/client`,
  BALANCE: `${ERC_SERVICE.ERC721}/balance`,
  MINT: `${ERC_SERVICE.ERC721}/mint`,
  BURN: `${ERC_SERVICE.ERC721}/burn`,
  SUPPLY: `${ERC_SERVICE.ERC721}/supply`,
  URI: `${ERC_SERVICE.ERC721}/uri`,
  TRANSFER: `${ERC_SERVICE.ERC721}/transfer`,
  OWNER: `${ERC_SERVICE.ERC721}/owner`,
  OWNER_DETAIL: `${ERC_SERVICE.ERC721}/owner/detail`,
  OPERATOR: `${ERC_SERVICE.ERC721}/operator`,
  OPERATOR_ALL: `${ERC_SERVICE.ERC721}/operator/All`,
  APPROVE: `${ERC_SERVICE.ERC721}/approve`,
  TRANSFER_FROM: `${ERC_SERVICE.ERC721}/transfer-from`,
};

export const API_METHOD_ERC1155 = {
  AUTHENTICATE: 'authenticate',
  ACCOUNT: `${ERC_SERVICE.ERC1155}/client`,
  BALANCE: `${ERC_SERVICE.ERC1155}/balance`,
  BATCH_BALANCE: `${ERC_SERVICE.ERC1155}/batch/balance`,
  MINT: `${ERC_SERVICE.ERC1155}/mint`,
  BATCH_MINT: `${ERC_SERVICE.ERC1155}/batch/mint`,
  BURN: `${ERC_SERVICE.ERC1155}/burn`,
  BATCH_BURN: `${ERC_SERVICE.ERC1155}/batch/burn`,
  SET_URI: `${ERC_SERVICE.ERC1155}/setTokenURI`,
  GET_URI: `${ERC_SERVICE.ERC1155}/getURI`,
  TRANSFER: `${ERC_SERVICE.ERC1155}/transfer`,
  BATCH_TRANSFER: `${ERC_SERVICE.ERC1155}/batch/transfer`,
  MULTI_USER_TRANSFER: `${ERC_SERVICE.ERC1155}/batch/multiUser-transfer`,
  APPROVE: `${ERC_SERVICE.ERC1155}/approve`,
  APPROVE_STATUS: `${ERC_SERVICE.ERC1155}/approve/check`,
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
  MINT_TOKEN: 'erc20/mint',
  BALANCEOF: 'erc20/balance',
  ENROLL_USERS: 'user/register',
  ACCOUNTID: 'erc20/client',
  TRANSFER_TOKEN: 'erc20/transfer',
  TOTAL_SUPPLY: 'erc20/supply',
  BURN_TOKENS: 'erc20/burn',
  SET_OPERATOR: 'erc20/approve',
  CHECK_ALLOWANCE: 'erc20/allowance',
  TRANSFER_FROM: 'erc20/transfer-from',
};
