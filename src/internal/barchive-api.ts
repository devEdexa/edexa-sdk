import { EdexaConfig } from '../api/config';
import { API_METHOD, API_VERSION, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import { Ibarchive, IbarchiveAddFile, IbarchiveDeleteFile, IbarchiveUpdateFile } from '../util/interface/IBarchive';
import {
  addArchiveFileFromRaw,
  deleteArchiveFileFromRaw,
  getArchiveAuthFromRaw,
  getArchiveFileFromRaw,
  updateArchiveFileFromRaw,
} from '../util/util';
import { requestHttp } from './dispatch';
import * as fs from 'fs';
import FormData from 'form-data';

/**
 * Authenticates the client with the edeXa API.
 *
 * @param settings - Configuration settings for edeXa.
 * @param config - Configuration object with client ID and secret.
 * @param srcMethod - Source method for the authentication request (defaults to 'authenticate').
 * @returns A Promise that resolves to the authentication response.
 */
export async function authenticate(
  settings: EdexaConfig,
  config: { headers: { 'client-id': string; 'client-secret': string } },
  srcMethod = API_METHOD.AUTHENTICATE
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BARCHIVE,
    'authenticate',
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      headers: { ...config.headers },
    }
  );
  return getArchiveAuthFromRaw(response);
}

/**
 * Adds a file.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for adding the file.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the file.
 * @returns A Promise that resolves to the added file.
 */
export async function addFile(
  settings: EdexaConfig,
  data: string | object | any,
  srcMethod = API_METHOD.FILE
): Promise<IbarchiveAddFile> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BARCHIVE,
    'file',
    srcMethod,
    {},
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization, version: '', ...data.getHeaders() },
      'content-type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  return await addArchiveFileFromRaw(response);
}

/**
 * Adds a file.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for adding the stamp.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the file.
 * @returns A Promise that resolves to the added file.
 */
export async function getFile(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD.FILE
): Promise<IbarchiveAddFile> {
  // console.log("settings ======> ", settings)
  const response: any = await requestHttp(settings, EdexaApiType.BARCHIVE, 'file', srcMethod, data, {
    method: REQUEST_METHOD.GET,
    data,
    headers: { authorization: settings.authorization, version: '' },
  });
  return await getArchiveFileFromRaw(response);
}

/**
 * File expire time updation.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for updatig file expire time.
 * @param srcMethod - Source method for updatig file expire time.
 * @returns A Promise that resolves to the file updation.
 */
export async function updateFile(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD.FILE
): Promise<IbarchiveUpdateFile> {
  const response: any = await requestHttp(settings, EdexaApiType.BARCHIVE, 'file', srcMethod, data, {
    method: REQUEST_METHOD.PUT,
    data,
    headers: { authorization: settings.authorization, version: '' },
  });
  return await updateArchiveFileFromRaw(response);
}

/**
 * File deletion.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for deleting the file.
 * @param srcMethod - Source method for deleting the file.
 * @returns A Promise that resolves to the deleting file.
 */
export async function deleteFile(
  settings: EdexaConfig,
  data: string | object,
  srcMethod = API_METHOD.FILE
): Promise<IbarchiveDeleteFile> {
  // console.log("settings ======> ", settings)
  const response: any = await requestHttp(settings, EdexaApiType.BARCHIVE, 'file', srcMethod, data, {
    method: REQUEST_METHOD.DELETE,
    data,
    headers: { authorization: settings.authorization, version: '' },
  });
  return await deleteArchiveFileFromRaw(response);
}
