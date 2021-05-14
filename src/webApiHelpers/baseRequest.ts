import { isNil } from 'lodash';

export class Builder {

  host: string;
  port: number;
  scheme: string;
  path: string;
  queryParameters: any;
  bodyParameters: any;
  headers: any;

  constructor() {
  }

  build(): BaseRequest {
    return new BaseRequest(this);
  }

  // setter(key: any): any {
  //   return function(value: any) {
  //     this[key] = value;
  //     return this;
  //   }
  // }

  setHost(host: string): void {
    this.host = host;
  }

  setPort(port: number): void {
    this.port = port;
  }

  setScheme(scheme: string): void {
    this.scheme = scheme;
  }

  setPath(path: string): void {
    this.path = path;
  }

  // _assign
  // _assigner
  // withQueryParameters
  // withBodyParameters
  // withHeaders
  // withAuth
  //

}

export class BaseRequest {
  host: string;
  port: number;
  scheme: string;
  queryParameters: any;
  bodyParameters: any;
  headers: any;
  path: string;

  constructor(builder: Builder) {
    this.host = builder.host;
    this.port = builder.port;
    this.scheme = builder.scheme;
    this.queryParameters = builder.queryParameters;
    this.bodyParameters = builder.bodyParameters;
    this.headers = builder.headers;
    this.path = builder.path;
  }

  getURI(): string {
    if (!this.scheme || !this.host || !this.port) {
      throw new Error('Missing components necessary to construct URI');
    }
    let uri = this.scheme + '://' + this.host;
    if (
      (this.scheme === 'http' && this.port !== 80) ||
      (this.scheme === 'https' && this.port !== 443)
    ) {
      uri += ':' + this.port;
    }
    if (this.path) {
      uri += this.path;
    }
    return uri;
  }

  getURL(): string {
    const uri = this.getURI();
    if (!isNil(this.queryParameters)) {
      return uri + this.getQueryParameterString();
    } else {
      return uri;
    }
  }

  getQueryParameterString(): string {
    if (!isNil(this.queryParameters)) {
      return (
        '?' +
        Object.keys(this.queryParameters)
          .filter((key) => {
            return this.queryParameters[key] !== undefined;
          })
          .map((key) => {
            return key + '=' + this.queryParameters[key];
          })
          .join('&')
      );
    }
    return '';
  }

  execute(method: (arg0: any, arg1: any) => any, callback: any): void | Promise<any> {
    if (callback) {
      method(this, callback);
      return;
    }
    const _self = this;
  
    return new Promise((resolve, reject) => {
      method(_self, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
  
}
