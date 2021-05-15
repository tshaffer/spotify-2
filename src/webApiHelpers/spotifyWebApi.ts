import { AuthenticationRequest } from './authenticationRequest';

const DEFAULT_REDIRECT_URI = 'http://localhost:8888/callback';

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
  createAuthorizeURL(scopes: any, state: any, showDialog: any, responseType = 'code') {

    const authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    authenticationRequest.path = '/authorize';
    authenticationRequest.queryParameters = {
      client_id: this.credentials.clientId,
      response_type: responseType,
      redirect_uri: DEFAULT_REDIRECT_URI,
      scope: scopes.join('%20'),
      state,
      show_dialog: showDialog && !!showDialog
    }

  }
}