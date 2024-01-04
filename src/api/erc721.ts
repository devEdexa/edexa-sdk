import {
  authenticate,
  burnToken,
  getAccount,
  getApproveStatus,
  getBalance,
  getOwner,
  getOwnerDetails,
  getTokenURI,
  getTotalSupply,
  mintToken,
  setOperator,
  setOperatorForAll,
  tokenTransfer,
  tokenTransferFrom,
} from '../internal/erc721-api';
import { EdexaSettings } from '../types/types';
import { CommonConfigDTO } from '../util/interface';
import { Ibarchive } from '../util/interface/IBarchive';
import { CommonResponse, ICommonAuth } from '../util/interface/ICommon';
import {
  ERCBalanceResponse,
  ERCMintResponse,
  IAccount,
  IApproveBody,
  IApproveResponse,
  IBalanceResponse,
  IBurnBody,
  IBurnResponse,
  IERCResponse,
  IMintBody,
  IMintResponse,
  IOwnerBody,
  IOwnerDetailsBody,
  IOwnerDetailsResponse,
  IOwnerResponse,
  ISetOperatorAllBody,
  ISetOperatorAllResponse,
  ISetOperatorBody,
  ISetOperatorResponse,
  ISupplyResponse,
  ITokenTransferBody,
  ITokenTransferFromBody,
  ITokenTransferFromResponse,
  ITokenTransferResponse,
  IURIBody,
  IURIResponse,
} from '../util/interface/IERC721';
import { EdexaConfig } from './config';

export class ERC721 {
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
   * @param data - Data for adding the file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the added file.
   */
  async getBalance(data: IAccount): Promise<IBalanceResponse> {
    return getBalance(this.config, data);
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
   * Getting total minted token or total supply with the help of edeXa API.
   *
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the supply data.
   */
  async getTotalSupply(): Promise<ISupplyResponse> {
    return getTotalSupply(this.config);
  }

  /**
   * Getting token URI with the help of edeXa API.
   *
   * @param data - Data for getting token URI.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the token URI data.
   */
  async getTokenURI(data: IURIBody): Promise<IURIResponse> {
    return getTokenURI(this.config, data);
  }

  /**
   * Set any user to as a Operator with the help of edeXa API.
   *
   * @param data - Data for set operator.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the set operator data.
   */
  async setOperator(data: ISetOperatorBody): Promise<ISetOperatorResponse> {
    return setOperator(this.config, data);
  }

  /**
   * Set Operator for all with the help of edeXa API.
   *
   * @param data - Data for set operatorAll.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the setOperatorAll data.
   */
  async setOperatorForAll(data: ISetOperatorAllBody): Promise<ISetOperatorAllResponse> {
    return setOperatorForAll(this.config, data);
  }

  /**
   * Get the owner of token with the help of edeXa API.
   *
   * @param data - Data for getting the owner of token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the getOwner data.
   */
  async getOwner(data: IOwnerBody): Promise<IOwnerResponse> {
    return getOwner(this.config, data);
  }

  /**
   * Getting list of all token with owner name with the help of edeXa API.
   *
   * @param data - Data for getting list of all token with owner name .
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the transfer data.
   */
  async getOwnerDetails(data: IOwnerDetailsBody): Promise<Array<IOwnerDetailsResponse>> {
    return getOwnerDetails(this.config, data);
  }

  /**
   * Check approve status with the help of edeXa API.
   *
   * @param data - Data for checking approve status.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the check approve data.
   */
  async getApproveStatus(data: IApproveBody): Promise<IApproveResponse> {
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
   * Token Transfer from one user to another user with the help of edeXa API.
   *
   * @param data - Data for token transfer from one user to another user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the tokenTransferFrom data.
   */
  async tokenTransferFrom(data: ITokenTransferFromBody): Promise<ITokenTransferFromResponse> {
    return tokenTransferFrom(this.config, data);
  }
}
