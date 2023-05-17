import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { VERSION } from '../version';

/**
 * Sends an HTTP request using Axios.
 *
 * @param baseUrl - The base URL of the API.
 * @param restApiName - The name of the REST API.
 * @param methodName - The name of the method being called.
 * @param params - The request parameters.
 * @param overrides - Optional overrides for the Axios request configuration.
 * @returns A Promise that resolves to the AxiosResponse.
 */
export function sendAxiosRequest<Req, Res>(
  baseUrl: string,
  restApiName: string,
  methodName: string,
  params: Req,
  overrides?: AxiosRequestConfig
): Promise<AxiosResponse<Res>> {
  // Construct the full request URL
  const requestUrl = baseUrl + '/' + restApiName;

  // Create the Axios request configuration
  const config: AxiosRequestConfig = {
    ...overrides,
    headers: {
      ...overrides.headers,
      'Edexa-Sdk-Method': methodName, // Include the SDK method in the headers
      'sdk-version': VERSION, // Add the SDK version (can be customized)
    },
    method: overrides?.method ?? 'GET', // Use the specified HTTP method, default to 'GET'
    url: requestUrl, // Set the request URL
    params, // Set the request parameters
  };

  // Send the Axios request and return the Promise
  return axios(config);
}
