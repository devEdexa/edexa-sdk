// Import necessary dependencies and types
import { EdexaConfig } from '../api/config';
import { API_VERSION, EdexaApiType } from '../util/constant';
import { IbstampGetStampDetail, Ibstamp, IbstampGetAllStampRaw, IbstampGetStampDetailRaw } from '../util/interface';
import { getAllStampFromRaw, getStampAuthFromRaw, getStampDetailFromRaw, getStampFromRaw } from '../util/util';
import { requestHttp } from './dispatch';

/**
 * Authenticates the client with the Edexa API.
 *
 * @param settings - Configuration settings for Edexa.
 * @param config - Configuration object with client ID and secret.
 * @param srcMethod - Source method for the authentication request (defaults to 'authenticate').
 * @returns A Promise that resolves to the authentication response.
 */
export async function authenticate(
  settings: EdexaConfig,
  config: { headers: { 'client-id': string; 'client-secret': string } },
  srcMethod = 'authenticate'
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'authenticate',
    srcMethod,
    {},
    {
      ...config,
      method: 'POST',
      headers: { version: API_VERSION.VERSION_1, ...config.headers },
    }
  );
  return getStampAuthFromRaw(response);
}

/**
 * Adds a stamp.
 *
 * @param settings - Configuration settings for Edexa.
 * @param data - Data for adding the stamp.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the stamp (defaults to 'addStamp').
 * @returns A Promise that resolves to the added stamp.
 */
export async function addStamp(
  settings: EdexaConfig,
  data: string,
  config?: any,
  srcMethod = 'addStamp'
): Promise<Ibstamp> {
  const response = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'hash',
    srcMethod,
    {},
    {
      ...config,
      method: 'POST',
      data,
      headers: { authorization: settings.authorization, version: config.version },
    }
  );
  return getStampFromRaw(response);
}

/**
 * Retrieves all stamps.
 *
 * @param settings - Configuration settings for Edexa.
 * @param data - Data for retrieving all stamps.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for retrieving all stamps (defaults to 'getAllStamp').
 * @returns A Promise that resolves to the list of all stamps.
 */
export async function getAllStamp(
  settings: EdexaConfig,
  data: string,
  config?: any,
  srcMethod = 'getAllStamp'
): Promise<any> {
  const response: IbstampGetAllStampRaw = await requestHttp(settings, EdexaApiType.BSTAMP, 'hash', srcMethod, data, {
    ...config,
    method: 'GET',
    headers: { authorization: settings.authorization, version: config.version },
  });

  return getAllStampFromRaw(response);
}

/**
 * Retrieves the details of a specific stamp.
 *
 * @param settings - Configuration settings for Edexa.
 * @param data - Data for retrieving the stamp details.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for retrieving the stamp details (defaults to 'getStampDetail').
 * @returns A Promise that resolves to the stamp details.
 */
export async function getStampDetail(
  settings: EdexaConfig,
  data: string,
  config?: any,
  srcMethod = 'getStampDetail'
): Promise<IbstampGetStampDetail> {
  const response: IbstampGetStampDetailRaw = await requestHttp(settings, EdexaApiType.BSTAMP, 'hash', srcMethod, data, {
    ...config,
    method: 'GET',
    headers: { authorization: settings.authorization, version: config.version },
  });

  return getStampDetailFromRaw(response);
}

/**
 * Adds an electronic signature.
 *
 * @param settings - Configuration settings for Edexa.
 * @param data - Data for adding the electronic signature.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for adding the electronic signature (defaults to 'addElectronicSign').
 * @returns A Promise that resolves to the result of adding the electronic signature.
 */
export async function addElectronicSign(
  settings: EdexaConfig,
  data: any,
  config?: any,
  srcMethod = 'addElectronicSign'
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
      method: 'POST',
      headers: { authorization: settings.authorization, version: config.version },
      'content-type': 'multipart/form-data',
    }
  );
  return response;
}

/**
 * Enrolls a user.
 *
 * @param settings - Configuration settings for Edexa.
 * @param data - Data for enrolling the user.
 * @param config - Configuration for the request.
 * @param srcMethod - Source method for enrolling the user (defaults to 'enrollUser').
 * @returns A Promise that resolves to the result of enrolling the user.
 */
export async function enrollUser(
  settings: EdexaConfig,
  data: any,
  config?: any,
  srcMethod = 'enrollUser'
): Promise<any> {
  const response: any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'enroll-user',
    srcMethod,
    {},
    {
      ...config,
      data,
      method: 'POST',
      headers: { authorization: settings.authorization, version: API_VERSION.VERSION_2 },
    }
  );
  return response;
}
