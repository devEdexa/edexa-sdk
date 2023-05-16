import { Ibstamp } from '../api/bstamp';
import { EdexaConfig } from '../api/config';

import { EdexaApiType } from '../util/constant';
import { getAllStampFromRaw, getStampAuthFromRaw, getStampFromRaw } from '../util/util';
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
      headers: { authorization: settings.authorization },
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
  const response:any = await requestHttp(
    settings,
    EdexaApiType.BSTAMP,
    'hash',
    srcMethod,
    {},
    {
      ...config,
      method: 'GET',
      data,
      headers: { authorization: settings.authorization },
    }
  );

  return getAllStampFromRaw(response);
}
