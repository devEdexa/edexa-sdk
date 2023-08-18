// Import necessary dependencies and types
import { EdexaConfig } from '../api/config';
import { API_METHOD, API_VERSION, EdexaApiType, REQUEST_METHOD } from '../util/constant';
import {
  IbstampGetStampDetail,
  Ibstamp,
  IbstampGetAllStampRaw,
  IbstampGetStampDetailRaw,
  GetWebhookDetailsDTO,
  IbstampCreateWebhook,
} from '../util/interface';
import { getAllStampFromRaw, getStampAuthFromRaw, getStampDetailFromRaw, getStampFromRaw } from '../util/util';
import { requestHttp } from './dispatch';

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
    EdexaApiType.BSTAMP,
    'authenticate',
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      headers: { version: API_VERSION.VERSION_1, ...config.headers },
    }
  );
  return getStampAuthFromRaw(response);
}

/**
 * Adds a stamp.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for adding the stamp.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the stamp (defaults to 'addStamp').
 * @returns A Promise that resolves to the added stamp.
 */
export async function addStamp(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.ADD_STAMP
): Promise<Ibstamp> {
  const response = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'hash',
    srcMethod,
    {},
    {
      ...config,
      method: REQUEST_METHOD.POST,
      data,
      headers: { authorization: settings.authorization, version: config.version },
    }
  );
  return getStampFromRaw(response);
}

/**
 * Retrieves all stamps.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for retrieving all stamps.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for retrieving all stamps (defaults to 'getAllStamp').
 * @returns A Promise that resolves to the list of all stamps.
 */
export async function getAllStamp(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.GET_ALL_STAMP
): Promise<any> {
  const response: IbstampGetAllStampRaw = await requestHttp(settings, EdexaApiType.BSTAMP, 'hash', srcMethod, data, {
    ...config,
    method: REQUEST_METHOD.GET,
    headers: { authorization: settings.authorization, version: config.version },
  });

  return getAllStampFromRaw(response);
}

/**
 * Retrieves the details of a specific stamp.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for retrieving the stamp details.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for retrieving the stamp details (defaults to 'getStampDetail').
 * @returns A Promise that resolves to the stamp details.
 */
export async function getStampDetail(
  settings: EdexaConfig,
  data: string | object,
  config?: any,
  srcMethod = API_METHOD.STAMP_DETAILS
): Promise<IbstampGetStampDetail> {
  const response: IbstampGetStampDetailRaw = await requestHttp(settings, EdexaApiType.BSTAMP, 'hash', srcMethod, data, {
    ...config,
    method: REQUEST_METHOD.GET,
    headers: { authorization: settings.authorization, version: config.version },
  });

  return getStampDetailFromRaw(response);
}

/**
 * Adds an electronic signature.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for adding the electronic signature.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the electronic signature (defaults to 'addElectronicSign').
 * @returns A Promise that resolves to the result of adding the electronic signature.
 */
export async function addElectronicSign(
  settings: EdexaConfig,
  data: any,
  config?: any,
  srcMethod = API_METHOD.ELECTRONIC_SIGN
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'hash',
    srcMethod,
    {},
    {
      ...config,
      data,
      method: REQUEST_METHOD.POST,
      headers: { authorization: settings.authorization, version: config.version },
      'content-type': 'multipart/form-data',
    }
  );
  return response;
}

/**
 * Enrolls a user.
 *
 * @param settings - Configuration settings for edeXa.
 * @param data - Data for enrolling the user.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for enrolling the user (defaults to 'enrollUser').
 * @returns A Promise that resolves to the result of enrolling the user.
 */
export async function enrollUser(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.ENROLL_USER
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'api/webhooks',
    srcMethod,
    {},
    {
      ...config,
      data,
      method: REQUEST_METHOD.POST,
      headers: { authorization: settings.authorization, version: API_VERSION.VERSION_2 },
    }
  );
  return response;
}

export async function createWebhook(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.CREATE_WEBHOOK
): Promise<IbstampCreateWebhook> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'api/webhooks',
    srcMethod,
    {},
    {
      ...config,
      data,
      method: REQUEST_METHOD.POST,
      headers: {
        authorization: settings.authorization,
        version: API_VERSION.VERSION_2,
      },
    }
  );
  return response;
}

export async function getWebhook(
  settings: EdexaConfig,
  data: object,
  config?: any,
  srcMethod = API_METHOD.GET_WEBHOOK
): Promise<any> {
  const response: GetWebhookDetailsDTO = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'api/webhooks',
    srcMethod,
    {},
    {
      ...config,
      data,
      method: REQUEST_METHOD.GET,
      headers: {
        authorization: settings.authorization,
        version: API_VERSION.VERSION_2,
      },
    }
  );
  return response;
}
