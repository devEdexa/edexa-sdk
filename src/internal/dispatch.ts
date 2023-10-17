import axios, { AxiosRequestConfig } from 'axios';
import { EdexaConfig } from '../api/config';
import { API_VERSION, EdexaApiType } from '../util/constant';
import { logDebug, logInfo } from '../util/logger';
import { sendAxiosRequest } from '../util/sendRequest';

/**
 * Makes an HTTP request using Axios and returns the response data.
 *
 * @param config - The EdexaConfig instance containing the API configuration.
 * @param apiType - The type of API to make the request to.
 * @param restApiName - The name of the REST API being called.
 * @param methodName - The name of the method being called.
 * @param data - The request payload data.
 * @param overrides - Optional AxiosRequestConfig overrides.
 * @returns A Promise that resolves to the response data.
 */
export async function requestHttp<Req, Res>(
  config: EdexaConfig,
  apiType: EdexaApiType,
  restApiName: string,
  methodName: string,
  data: Req,
  overrides?: any
): Promise<Res> {
  try {
    // Send the Axios request using the provided configuration
    const response = await sendAxiosRequest<Req, Res>(
      config._getRequestUrl(apiType, overrides.headers.version),
      restApiName,
      methodName,
      data,
      {
        ...overrides,
        timeout: config.requestTimeout,
      }
    );

    // Check the response status and return the data if successful
    if (response.status >= 200 && response.status <= 300) {
      logDebug(restApiName, `Successful request: ${restApiName}`);
      return response.data;
    } else {
      // Log an info message if the request failed
      logInfo(restApiName, `Request failed: ${restApiName}, ${response.status}, ${response.data}`);
    }
  } catch (err) {
    // Handle Axios errors and throw the response data if available
    if (!axios.isAxiosError(err) || err.response === undefined) {
      throw err;
    }
    if (err.response?.data) {
      throw err.response.data;
    }
  }
}
