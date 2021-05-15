import { AuthenticationRequest } from './authenticationRequest';
import { HttpManager } from './httpManager';

  /**
   * Retrieve a URL where the user can give the application permissions.
   * @param {string[]} scopes The scopes corresponding to the permissions the application needs.
   * @param {string} state A parameter that you can use to maintain a value between the request and the callback to redirect_uri.It is useful to prevent CSRF exploits.
   * @param {boolean} showDialog A parameter that you can use to force the user to approve the app on each login rather than being automatically redirected.
   * @param {string} responseType An optional parameter that you can use to specify the code response based on the authentication type - can be set to 'code' or 'token'. Default 'code' to ensure backwards compatability.
   * @returns {string} The URL where the user can give application permissions.
   */
  //  export const createAuthorizeURL = (scopes: any, state: any, showDialog: any, responseType = 'code') => {
  //   return AuthenticationRequest.builder()
  //     .withPath('/authorize')
  //     .withQueryParameters({
  //       client_id: this.getClientId(),
  //       response_type: responseType,
  //       redirect_uri: this.getRedirectURI(),
  //       scope: scopes.join('%20'),
  //       state: state,
  //       show_dialog: showDialog && !!showDialog
  //     })
  //     .build()
  //     .getURL();
  // },
