import { EdexaConfig } from '../api/config';
import { API_VERSION, EdexaApiType } from '../util/constant';
import { IbstampGetStampDetail, Ibstamp, IbstampGetAllStampRaw, IbstampGetStampDetailRaw } from '../util/interface';
import { getAllStampFromRaw, getStampAuthFromRaw, getStampDetailFromRaw, getStampFromRaw } from '../util/util';
import { requestHttp } from './dispatch';

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
