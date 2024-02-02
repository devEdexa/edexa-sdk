import {
  approveTokenAccess,
  authenticate,
  batchBurn,
  batchMint,
  batchTokenTransfer,
  burnToken,
  getAccount,
  getApproveStatus,
  getBalance,
  getBatchBalance,
  getTokenURI,
  mintToken,
  setTokenURI,
  tokenTransfer,
  tokenTransferMultiUsers,
} from '../internal/erc1155-api';
import { enrollUsers } from '../internal/erc20-api';
import { EdexaSettings } from '../types/types';
import { ICommonAuth, IERCEnrollUsersData, IEnrollUsersDTO } from '../util/interface/ICommon';
import {
  IAccount,
  IApproveBody,
  IApproveResponse,
  IApproveStatusBody,
  IApproveStatusResponse,
  IBalance,
  IBalanceResponse,
  IBatchBalance,
  IBatchBalanceResponse,
  IBatchBurnBody,
  IBatchMintBody,
  IBatchMintResponse,
  IBatchTokenTransferBody,
  IBurnBody,
  IBurnResponse,
  IGetURIBody,
  IGetURIResponse,
  IMintBody,
  IMintResponse,
  IMultiUserTokenTransferBody,
  IMultiUserTokenTransferResponse,
  ISetURIBody,
  ISetURIResponse,
  ITokenTransferBody,
  ITokenTransferResponse,
} from '../util/interface/IERC1155';
import { EdexaConfig } from './config';

export class ERC1155 {
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
  async authenticate(settings): Promise<ICommonAuth> {
    return authenticate(this.config, settings);
  }

  /**
   * enroll User.
   * @param data - Data for enrolling the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the enroll user.
   * */
  async enrollUser(data: IEnrollUsersDTO): Promise<IEnrollUsersDTO> {
    return enrollUsers(this.config, data);
  }

  /**
   * Get Account data.
   *
   * @param data - Data for adding the file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the added file.
   */
  async getAccount(data: IAccount): Promise<any> {
    return getAccount(this.config, data);
  }

  /**
   * Getting the admin and users balance with the edeXa API.
   *
   * @param data - Data for getting balance of admin and users.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the getBalance method data.
   */
  async getBalance(data: IBalance): Promise<IBalanceResponse> {
    return getBalance(this.config, data);
  }

  /**
   * Getting multiple users or admin balance using single api or function call with the edeXa API.
   *
   * @param data - Data for getting multiple users and admin balance.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the getBatchBalance method data.
   */
  async getBatchBalance(data: IBatchBalance): Promise<IBatchBalanceResponse> {
    return getBatchBalance(this.config, data);
  }

  /**
   * Mint new token by admin with the help of edeXa API.
   *
   * @param data - Data for creating or minting new token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the minting data.
   */
  async mintToken(data: IMintBody): Promise<IMintResponse> {
    return mintToken(this.config, data);
  }

  /**
   * Mint new token by admin with the help of edeXa API.
   *
   * @param data - Data for creating or minting new token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the minting data.
   */
  async batchMint(data: IBatchMintBody): Promise<IBatchMintResponse> {
    return batchMint(this.config, data);
  }

  /**
   * Burn token by admin with the help of edeXa API.
   *
   * @param data - Data for destroy or burn token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the burn data.
   */
  async burnToken(data: IBurnBody): Promise<IBurnResponse> {
    return burnToken(this.config, data);
  }

  /**
   * Burn multiple token at same time by admin with the help of edeXa API.
   *
   * @param data - Data for destroy or burn multiple token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the batchBurn data.
   */
  async batchBurn(data: IBatchBurnBody): Promise<IBurnResponse> {
    return batchBurn(this.config, data);
  }

  /**
   * Getting token URI with the help of edeXa API.
   *
   * @param data - Data for getting token URI.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the token URI data.
   */
  async setTokenURI(data: ISetURIBody): Promise<ISetURIResponse> {
    return setTokenURI(this.config, data);
  }

  /**
   * Getting token URI with the help of edeXa API.
   *
   * @param data - Data for getting token URI.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the token URI data.
   */
  async getTokenURI(data: IGetURIBody): Promise<IGetURIResponse> {
    return getTokenURI(this.config, data);
  }

  /**
   * Check approve status with the help of edeXa API.
   *
   * @param data - Data for checking approve status.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the check approve data.
   */
  async approveTokenAccess(data: IApproveBody): Promise<IApproveResponse> {
    return approveTokenAccess(this.config, data);
  }

  /**
   * Check approve status with the help of edeXa API.
   *
   * @param data - Data for checking approve status.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the check approve data.
   */
  async getApproveStatus(data: IApproveStatusBody): Promise<IApproveStatusResponse> {
    return getApproveStatus(this.config, data);
  }

  /**
   * Token Transfer to the user with the help of edeXa API.
   *
   * @param data - Data for token transfer to the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the transfer data.
   */
  async tokenTransfer(data: ITokenTransferBody): Promise<ITokenTransferResponse> {
    return tokenTransfer(this.config, data);
  }

  /**
   * Multiple Token Transfer to the user with the help of edeXa API.
   *
   * @param data - Data for Multiple token transfer to the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the batchTokenTransfer data.
   */
  async batchTokenTransfer(data: IBatchTokenTransferBody): Promise<ITokenTransferResponse> {
    return batchTokenTransfer(this.config, data);
  }

  /**
   * Multiple Token Transfer to the multiple user with the help of edeXa API.
   *
   * @param data - Data for Multiple token transfer to the multiple user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the batchTokenTransfer data.
   */
  async tokenTransferMultiUsers(data: IMultiUserTokenTransferBody): Promise<IMultiUserTokenTransferResponse> {
    return tokenTransferMultiUsers(this.config, data);
  }
}
