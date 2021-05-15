import { AuthenticationRequest } from './authenticationRequest';
import { BaseRequest } from './baseRequest';
import { httpManagerPost } from './httpManager';

import { spotifyApiConfiguration } from '../config';

export class SpotifyWebApi {

  credentials: any;

  constructor(credentials: any) {
    this.credentials = credentials;
  }

  //  * Retrieve a URL where the user can give the application permissions.
  //  * @param {string[]} scopes The scopes corresponding to the permissions the application needs.
  //  * @param {string} state A parameter that you can use to maintain a value between the request and the callback to redirect_uri.It is useful to prevent CSRF exploits.
  //  * @param {boolean} showDialog A parameter that you can use to force the user to approve the app on each login rather than being automatically redirected.
  //  * @param {string} responseType An optional parameter that you can use to specify the code response based on the authentication type - can be set to 'code' or 'token'. Default 'code' to ensure backwards compatability.
  //  * @returns {string} The URL where the user can give application permissions.
  createAuthorizeURL(scopes: any, state?: any, showDialog?: any, responseType = 'code'): string {

    const authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    authenticationRequest.path = '/authorize';
    authenticationRequest.queryParameters = {
      client_id: this.credentials.clientId,
      response_type: responseType,
      redirect_uri: spotifyApiConfiguration.DEFAULT_REDIRECT_URI,
      scope: scopes.join('%20'),
      state,
      show_dialog: showDialog && !!showDialog
    }

    const baseRequest: BaseRequest = new BaseRequest(
      authenticationRequest.host,
      authenticationRequest.port,
      authenticationRequest.scheme,
      authenticationRequest.queryParameters,
      undefined,
      undefined,
      authenticationRequest.path,
    );

    const url: string = baseRequest.getURL();
    return url;
  }

  /**
   * Request an access token using the Authorization Code flow.
   * Requires that client ID, client secret, and redirect URI has been set previous to the call.
   * @param {string} code The authorization code returned in the callback in the Authorization Code flow.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} A promise that if successful, resolves into an object containing the access token,
   *          refresh token, token type and time to expiration. If rejected, it contains an error object.
   *          Not returned if a callback is given.
   */
   authorizationCodeGrant(code: string, callback?: any): any {
    const authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    authenticationRequest.path = '/api/token';
    authenticationRequest.bodyParameters = {
      grant_type: 'authorization_code',
      redirect_uri: spotifyApiConfiguration.DEFAULT_REDIRECT_URI,
      code,
      client_id: spotifyApiConfiguration.CLIENT_ID,
      client_secret: spotifyApiConfiguration.CLIENT_SECRET,
    };
    authenticationRequest.headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };

    const baseRequest: BaseRequest = new BaseRequest(
      authenticationRequest.host,
      authenticationRequest.port,
      authenticationRequest.scheme,
      undefined,
      authenticationRequest.bodyParameters,
      authenticationRequest.headers,
      authenticationRequest.path,
    );

    return baseRequest.execute(httpManagerPost, callback);

  };
}