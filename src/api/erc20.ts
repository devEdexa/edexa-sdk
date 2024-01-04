// Import necessary dependencies and types
import {
  accountId,
  authenticate,
  balanceOf,
  burnToken,
  checkAllowanceLimit,
  enrollUsers,
  mintToken,
  setOperator,
  totalSupply,
  transferToken,
  transferTokenFrom,
} from '../internal/erc20-api';
import { EdexaSettings } from '../types/types';
// import { GetBalanceOfDTO } from '../util/interface';
import { ICommonAuth } from '../util/interface/ICommon';
import {
  erc20AccountIdDTO,
  erc20BurnTokenDTO,
  erc20EnrollUsersDTO,
  erc20GetBalanceOfDTO,
  erc20TotalSupplyDTO,
  erc20TransferTokenDTO,
  erc20commonDTO,
} from '../util/interface/erc20';
// import {  mintToken } from '../util/interface/erc20';
import { EdexaConfig } from './config';

// Bstamp class
export class ERC20 {
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
   * Mint Token.
   *
   * @param data - Data for creating the  file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the added file.
   */
  async mintToken(data: any) {
    return mintToken(this.config, data);
  }

  /**
   * BalanceOf.
   *
   * @param data - Data for checking the balance.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the balanceOf.
   */
  async balanceOf(data: erc20GetBalanceOfDTO) {
    return balanceOf(this.config, data);
  }

  /**
   * enroll User.
   *
   * @param data - Data for enrolling the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the enroll user.
   */
  async enrollUser(data: erc20EnrollUsersDTO) {
    return enrollUsers(this.config, data);
  }

  /**
   * Account Id of.
   *
   * @param data - Data for get account Id.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the accountId of user.
   */
  async accountId(data: erc20AccountIdDTO) {
    return accountId(this.config, data);
  }

  /**
   * Transfer Token to users
   *
   * @param data - Data for transfering the token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the transfer token to users.
   */
  async transferToken(data: erc20TransferTokenDTO) {
    return transferToken(this.config, data);
  }

  /**
   * Total supply
   *
   * @param data - Data for getting the total supply.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the total supply.
   */
  async totalSupply(data: erc20TotalSupplyDTO) {
    return totalSupply(this.config, data);
  }

  /**
   * Burn Token
   *
   * @param data - Data for burn the tokens.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the burn token.
   */
  async burnToken(data: erc20BurnTokenDTO) {
    return burnToken(this.config, data);
  }

  /**
   * Set operator for token
   *
   * @param data - Data for set token operator.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the set operator for token.
   */
  async setOperator(data: erc20commonDTO) {
    return setOperator(this.config, data);
  }

  /**
   * check spender allowance limit
   *
   * @param data - Data for check allowance limit.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the spender allowance limit.
   */
  async checkAllowanceLimit(data: erc20commonDTO) {
    return checkAllowanceLimit(this.config, data);
  }

  /**
   * Transfer token from
   *
   * @param data - Data for transfer token from one to another user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the transfer token from one.
   */
  async transferTokenFrom(data: erc20commonDTO) {
    return transferTokenFrom(this.config, data);
  }
}
