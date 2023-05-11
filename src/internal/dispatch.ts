import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { EdexaConfig } from '../api/config'
import { EdexaApiType } from '../util/constant'
import { logDebug, logInfo } from '../util/logger'
import { sendAxiosRequest } from '../util/sendRequest'
/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @internal
 */
// TODO: Wrap Axios error in EdexaError.
export async function requestHttp<Req, Res>(
  config: EdexaConfig,
  apiType: EdexaApiType,
  restApiName: string,
  methodName: string,
  data: Req,
  overrides?: AxiosRequestConfig
): Promise<Res> {
  try {
    console.log(config._getRequestUrl(apiType))
    console.log(restApiName, methodName, data, {
      ...overrides,
      timeout: config.requestTimeout,
    })

    const response = await sendAxiosRequest<Req, Res>(config._getRequestUrl(apiType), restApiName, methodName, data, {
      ...overrides,
      timeout: config.requestTimeout,
      headers: { authorization: config.authorization },
    })
    if (response.status === 200) {
      logDebug(restApiName, `Successful request: ${restApiName}`)
      return response.data
    } else {
      logInfo(restApiName, `Request failed: ${restApiName}, ${response.status}, ${response.data}`)
    }
  } catch (err) {
    console.log('err', axios.isAxiosError(err))
    if (!axios.isAxiosError(err) || err.response === undefined) {
      throw err
    }
  }
}
