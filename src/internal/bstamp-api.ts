import { EdexaConfig } from '../api/config'

import { EdexaApiType } from '../util/constant'
import { getStampFromRaw } from '../util/util'
import { requestHttp } from './dispatch'

export async function addStamp(settings: EdexaConfig, data: string, config: any, srcMethod = 'addStamp'): Promise<any> {
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
      authorization: settings.authorization,
    }
  )
  console.log(response)
  return getStampFromRaw(response) // data normilziation and error handling
}
