// Import necessary dependencies and types
import {
  authenticate,
  burnToken,
  checkAllowanceLimit,
  enrollUsers,
  getAccountId,
  getBalance,
  mintToken,
  setOperator,
  totalSupply,
  transferToken,
  transferTokenFrom,
} from '../internal/erc20-api';
import { EdexaSettings } from '../types/types';
import { ICommonAuth } from '../util/interface/ICommon';
import {
  IAccountIdDTO,
  IBurnTokenDTO,
  IERC20AccountId,
  IERC20BurnToken,
  IERC20Common,
  IERC20GetBalance,
  IERC20MintToken,
  IERC20TotalSupply,
  IERC20TransferToken,
  IERC20TransferTokenFrom,
  IEnrollUsersDTO,
  IGetAllowanceDTO,
  IMintTokenDTO,
  ISetOperatorDTO,
  ITotalSupplyDTO,
  ITransferTokenDTO,
  ITransferTokenFromDTO,
} from '../util/interface/erc20';
import { EdexaConfig } from './config';

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
  async mintToken(data: IMintTokenDTO): Promise<IERC20MintToken> {
    return mintToken(this.config, data);
  }

  /**
   * BalanceOf.
   *
   * @param data - Data for checking the balance.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the balanceOf.
   */
  async getBalance(data: IERC20GetBalance): Promise<IERC20GetBalance> {
    return getBalance(this.config, data);
  }

  /**
   * enroll User.
   *
   * @param data - Data for enrolling the user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the enroll user.
   */
  async enrollUser(data: IEnrollUsersDTO): Promise<IEnrollUsersDTO> {
    return enrollUsers(this.config, data);
  }

  /**
   * Account Id of.
   *
   * @param data - Data for get account Id.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the accountId of user.
   */
  async getAccountId(data: IAccountIdDTO): Promise<IERC20AccountId> {
    return getAccountId(this.config, data);
  }

  /**
   * Transfer Token to users
   *
   * @param data - Data for transfering the token.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the transfer token to users.
   */
  async transferToken(data: ITransferTokenDTO): Promise<IERC20TransferToken> {
    return transferToken(this.config, data);
  }

  /**
   * Total supply
   *
   * @param data - Data for getting the total supply.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the total supply.
   */
  async totalSupply(data: ITotalSupplyDTO): Promise<IERC20TotalSupply> {
    return totalSupply(this.config, data);
  }

  /**
   * Burn Token
   *
   * @param data - Data for burn the tokens.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the burn token.
   */
  async burnToken(data: IBurnTokenDTO): Promise<IERC20BurnToken> {
    return burnToken(this.config, data);
  }

  /**
   * Set operator for token
   *
   * @param data - Data for set token operator.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the set operator for token.
   */
  async setOperator(data: ISetOperatorDTO): Promise<IERC20Common> {
    return setOperator(this.config, data);
  }

  /**
   * check spender allowance limit
   *
   * @param data - Data for check allowance limit.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the spender allowance limit.
   */
  async checkAllowanceLimit(data: IGetAllowanceDTO): Promise<IERC20Common> {
    return checkAllowanceLimit(this.config, data);
  }

  /**
   * Transfer token from
   *
   * @param data - Data for transfer token from one to another user.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves the transfer token from one.
   */
  async transferTokenFrom(data: ITransferTokenFromDTO): Promise<IERC20TransferTokenFrom> {
    return transferTokenFrom(this.config, data);
  }
}
