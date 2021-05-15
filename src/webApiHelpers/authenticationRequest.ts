import { timeStamp } from 'console';
import { Builder } from './baseRequest';

const DEFAULT_HOST = 'accounts.spotify.com';
const DEFAULT_PORT = 443;
const DEFAULT_SCHEME = 'https';

export class AuthenticationRequest {

  private _host: string;
  private _port: number;
  private _scheme: string;

  private _path: string;
  private _queryParameters: any;

  constructor() {
    this.host = DEFAULT_HOST;
    this.port = DEFAULT_PORT;
    this.scheme = DEFAULT_SCHEME;
  }
  
  public get host(): string {
    return this._host;
  }

  public set host(theHost: string) {
    this._host = theHost;
  }

  public get port(): number {
    return this._port;
  }

  public set port(thePort: number) {
    this._port = thePort;
  }

  public get scheme(): string {
    return this._scheme;
  }

  public set scheme(theScheme: string) {
    this._scheme = theScheme;
  }

  public get path(): string {
    return this._path;
  }

  public set path(thePath: string) {
    this._path = thePath;
  }

  public get queryParameters(): any {
    return this._queryParameters;
  }

  public set queryParameters(theQueryParameters: any) {
    this._queryParameters = theQueryParameters;
  }

  // builder() {
  //   const newBuilder: Builder = new Builder();
  //   newBuilder.setHost(DEFAULT_HOST);
  //   newBuilder.setPort(DEFAULT_PORT);
  //   newBuilder.setScheme(DEFAULT_SCHEME);
  //   return newBuilder;
  // }
}
