import { isString } from 'lodash-es';
import { defineMessages } from 'react-intl';
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { iAxios } from './iAxios';
import { checkStatus } from './axiosStatus';
import { errorData } from './errorConfig';
import { createErrorModal, createErrorMsg } from '@/hooks/web/useMessage';

/**
 * @description: Please adjust the following interceptors according to your own usage scenarios.
 */
const interceptor: AxiosInterceptor = {
  /**
   * @description: Handle request data. If the data is not in the expected format, you can directly throw an error.
   */
  requestHook: (res, options) => {
    /**
     * This method is used to handle the data returned from a request，
     * You can modify it based on your own usage scenario.
     */
    const { data } = res;
    const { errorMessageMode } = options;
    if (data) {
      if (data.code === -1) {
        if (errorMessageMode === 'modal') {
          createErrorModal(data.message);
        } else if (errorMessageMode === 'message') {
          createErrorMsg(data.message);
        }
        return errorData(res);
      } else {
        const { code, data: dataInfo, message } = data;
        if (!code && !dataInfo && !message) {
          const toData = {
            code: 1,
            data: data,
            message: 'ok',
          };
          return toData;
        }
      }
    }
    return data;
  },

  /**
   * @description: Error handling for failed requests
   */
  requestCatchHook: (e, _options) => {
    return Promise.reject(e);
  },

  /**
   * @description: Handle the config before making the request.
   */
  beforeRequestHook: (config, options) => {
    const { urlPrefix } = options;
    if (urlPrefix && isString(urlPrefix)) config.url = `${urlPrefix}${config.url}`;
    return config;
  },

  /**
   * @description: Request interceptor processing.
   */
  requestInterceptors: (config) => {
    const { requestOptions } = config;
    // if (requestOptions?.withToken) {
    //   (config as Recordable).headers._token = 'myToken';
    //   if (requestOptions?.specialToken)
    //     (config as Recordable).headers._token = requestOptions?.specialToken;
    // }
    if (requestOptions?.useBearerToken) {
      (config as Recordable).headers.Authorization = `Bearer ${requestOptions.bearerToken}`;
    }

    return config;
  },

  /**
   * @description: Error handling for request interceptors.
   */
  requestInterceptorsCatch: (error) => {
    return error;
  },

  /**
   * @description: Response interceptor processing.
   */
  responseInterceptors: (res) => {
    return res;
  },

  /**
   * @description: Error handling for response interceptors.
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, message, config } = error || {};
    const errorMessageMode = config.requestOptions.errorMessageMode || 'none';
    checkStatus(response ? response.status : 404, message, errorMessageMode);
    return error;
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new iAxios({
    ...{
      acoisadmisf: '',
      // Time of Request
      timeout: 10 * 1000,
      // Data Processing Method (Interceptor)
      interceptor,
      headers: { 'Content-Type': 'application/json' },
      // These are configuration options that need to be handled in the interceptors. These options can be overridden in individual API requests.
      requestOptions: {
        withToken: true,
        errorMessageMode: 'message',
      },
    },
    ...(opt || {}),
  });
}
export const deffHttp = createAxios();
