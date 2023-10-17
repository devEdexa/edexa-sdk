import { addFile, authenticate, deleteFile, getFile, updateFile } from '../internal/barchive-api';
import { EdexaSettings } from '../types/types';
import { CommonConfigDTO } from '../util/interface';
import { Ibarchive, IbarchiveAddFile, IbarchiveDeleteFile, IbarchiveUpdateFile } from '../util/interface/IBarchive';
import { ICommonAuth } from '../util/interface/ICommon';
import { EdexaConfig } from './config';

export class Barchive {
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
   * Adds a file.
   *
   * @param data - Data for adding the file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the added file.
   */
  async addFile(data: any): Promise<any> {
    // console.log({ data });
    return addFile(this.config, data);
  }

  /**
   * Retrieves the details of a specific file.
   *
   * @param data - Data for retrieving the file details.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the file details.
   */
  async getFile(data: any): Promise<IbarchiveAddFile> {
    // console.log({ data });
    return getFile(this.config, data);
  }

  /**
   * Update the file expire time.
   *
   * @param data - Data for updating file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the file updation.
   */
  async updateFile(data: any): Promise<IbarchiveUpdateFile> {
    // console.log({ data });
    return updateFile(this.config, data);
  }

  /**
   * Delete specific file
   *
   * @param data - Data for deleting the file.
   * @param config - Configuration for the request.
   * @returns A Promise that resolves to the deleted file.
   */
  async deleteFile(data): Promise<IbarchiveDeleteFile> {
    // console.log({ data });
    return deleteFile(this.config, data);
  }
}
