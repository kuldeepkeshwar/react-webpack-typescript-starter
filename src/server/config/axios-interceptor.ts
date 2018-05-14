import * as _ from 'lodash';
import * as querystring from 'querystring';
import axios, { AxiosRequestConfig } from 'axios';
// import { getConfigurationValue } from 'config/config';
import { appLogs } from 'config/logger';

interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  responseTime?: number;
  startTime?: number;
}

// axios.defaults.headers.common['User-Agent'] = getConfigurationValue('app.name');
axios.defaults.headers.common['User-Agent'] = 'testApp';
axios.defaults.paramsSerializer = params => querystring.stringify(params);

// Add a request interceptor
axios.interceptors.request.use(
  (req: any) => {
    // appLogs.info({ req });
    req.startTime = Date.now();
    return req;
  },
  error => {
    // appLogs.error({ reqError: error });
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    const { data, status, statusText, headers } = response;
    const config: ICustomAxiosRequestConfig = response.config;
    if (config && config.startTime) {
      config.responseTime = Date.now() - config.startTime;
    }
    delete config.startTime;
    const res = { data, status, statusText, headers, config };
    // appLogs.info({ res });

    // if (config.url && Number(_.get(data, 'response.errorCode')) === 503
    // ) {
    //   const error = new ErrorWrapper();
    //   error.message = _.get(data, 'response.message', 'Not Found');
    //   error.authErrorCode = ERROR_FLAGS.AUTH.SERVICE_AUTH_ERROR.CODE;
    //   return Promise.reject(error);
    // }

    return res;
  },
  error => {
    const { response, config } = error;
    if (response) {
      const { data, status, statusText, headers } = response;
      config.responseTime = Date.now() - config.startTime;
      delete config.startTime;
      const errorResponse = { data, status, statusText, headers, config };
      // appLogs.error({ errorResponse });
      error.status = error.response.status;
      // if (
      //   config.url &&
      //   ((Number(response.status) === 403) ||
      //     (Number(response.status) === 401) ||
      //     Number(response.status) === 500 &&
      //       _.get(data, 'error.app_error_code') === 'SEC_5000'))
      // ) {
      //   error.authErrorCode = ERROR_FLAGS.AUTH.SERVICE_AUTH_ERROR.CODE;
      // }
    } else {
      const { request, ...rest } = error;
      // appLogs.error({ errorResponse: rest });
    }
    return Promise.reject(error);
  }
);
