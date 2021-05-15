// var superagent = require('superagent'),
//   { TimeoutError, 
//     WebapiError, 
//     WebapiRegularError, 
//     WebapiAuthenticationError,
//     WebapiPlayerError 
//   } =  require('./response-error');

import superagent from 'superagent';

import { BaseRequest } from './baseRequest';

import {
  TimeoutError,
  WebapiError,
  WebapiRegularError,
  WebapiAuthenticationError,
  WebapiPlayerError
} from './responseError';

export class HttpManager {

  getParametersFromRequest(request: BaseRequest): any {

    const options: any = {};

    if (request.getQueryParameters()) {
      options.query = request.getQueryParameters();
    }

    if (request.getHeaders() && request.getHeaders()['Content-Type'] === 'application/json') {
      options.data = JSON.stringify(request.getBodyParameters());
    } else if (request.getBodyParameters()) {
      options.data = request.getBodyParameters();
    }

    if (request.getHeaders()) {
      options.headers = request.getHeaders();
    }
    return options;
  }

  toError(response: any): any {
    if (typeof response.body === 'object' && response.body.error && typeof response.body.error === 'object' && response.body.error.reason) {
      return new WebapiPlayerError(response.body, response.headers, response.statusCode);
    }

    if (typeof response.body === 'object' && response.body.error && typeof response.body.error === 'object') {
      return new WebapiRegularError(response.body, response.headers, response.statusCode);
    }

    if (typeof response.body === 'object' && response.body.error && typeof response.body.error === 'string') {
      return new WebapiAuthenticationError(response.body, response.headers, response.statusCode);
    }

    /* Other type of error, or unhandled Web API error format */
    return new WebapiError(response.body, response.headers, response.statusCode, response.body);
  };

  /* Make the request to the Web API */
  makeRequest(method: any, options: any, uri: any, callback: any) {

    const req = method.bind(superagent)(uri);

    if (options.query) {
      req.query(options.query);
    }

    if (options.headers) {
      req.set(options.headers);
    }

    if (options.data) {
      req.send(options.data);
    }

    req.end((err: any, response: any) => {
      if (err) {
        if (err.timeout) {
          return callback(new TimeoutError());
        } else if (err.response) {
          return callback(this.toError(err.response));
        } else {
          return callback(err);
        }
      }

      return callback(null, {
        body: response.body,
        headers: response.headers,
        statusCode: response.statusCode
      });
    });
  };

  /**
   * Make a HTTP GET request.
   * @param {BaseRequest} The request.
   * @param {Function} The callback function.
   */
  get(request: any, callback: any) {
    const options = this.getParametersFromRequest(request);
    const method = superagent.get;

    this.makeRequest(method, options, request.getURI(), callback);
  };

  /**
   * Make a HTTP POST request.
   * @param {BaseRequest} The request.
   * @param {Function} The callback function.
   */
  post(request: any, callback: any) {
    const options = this.getParametersFromRequest(request);
    const method = superagent.post;

    this.makeRequest(method, options, request.getURI(), callback);
  }

  /*
    Make a HTTP DELETE request.
    @param {BaseRequest} The request.
    @param {Function} The callback function.
  */
  del(request: any, callback: any) {
    const options = this.getParametersFromRequest(request);
    const method = superagent.del;

    this.makeRequest(method, options, request.getURI(), callback);
  };

  /**
   * Make a HTTP PUT request.
   * @param {BaseRequest} The request.
   * @param {Function} The callback function.
   */
  put(request: any, callback: any) {
    const options = this.getParametersFromRequest(request);
    const method = superagent.put;

    this.makeRequest(method, options, request.getURI(), callback);
  };

}