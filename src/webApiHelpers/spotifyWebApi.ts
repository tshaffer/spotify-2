import { AuthenticationRequest } from './authenticationRequest';
import { httpManagerGet, httpManagerPost, httpManagerPut } from './httpManager';

import { spotifyApiConfiguration } from '../config';
import { SpotifyCredentials, SpotifyWebRequest } from '../types';
import {
  swrCreateSpotifyWebRequest,
  swrExecute,
  swrGetURL
} from './spotifyWebRequest';

export class SpotifyWebApi {

  credentials: SpotifyCredentials;

  constructor(credentials: SpotifyCredentials) {
    this.credentials = credentials;
  }

  setAccessToken(accessToken: string) {
    this.credentials.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.credentials.accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.credentials.refreshToken = refreshToken;
  };

  getRefreshToken(): string {
    return this.credentials.refreshToken;
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

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      authenticationRequest.host,
      authenticationRequest.port,
      authenticationRequest.scheme,
      authenticationRequest.path,
      undefined,
      authenticationRequest.queryParameters,
      undefined,
    );

    const url: string = swrGetURL(spotifyWebRequest);
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
  authorizationCodeGrant(code: string): Promise<any> {
    const authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    authenticationRequest.path = '/api/token';
    authenticationRequest.bodyParameters = {
      grant_type: 'authorization_code',
      redirect_uri: spotifyApiConfiguration.DEFAULT_REDIRECT_URI,
      code,
      client_id: spotifyApiConfiguration.CLIENT_ID,
      client_secret: spotifyApiConfiguration.CLIENT_SECRET,
    };
    authenticationRequest.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      authenticationRequest.host,
      authenticationRequest.port,
      authenticationRequest.scheme,
      authenticationRequest.path,
      authenticationRequest.headers,
      undefined,
      authenticationRequest.bodyParameters,
    );

    return swrExecute(spotifyWebRequest, httpManagerPost);
  };

  /**
   * Refresh the access token given that it hasn't expired.
   * Requires that client ID, client secret and refresh token has been set previous to the call.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} A promise that if successful, resolves to an object containing the
   *          access token, time to expiration and token type. If rejected, it contains an error object.
   *          Not returned if a callback is given.
   */
  refreshAccessToken(callback?: any): Promise<any> {
    const authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    authenticationRequest.path = '/api/token';
    authenticationRequest.bodyParameters = {
      grant_type: 'refresh_token',
      refresh_token: this.getRefreshToken()
    };
    authenticationRequest.headers = {
      Authorization:
        'Basic ' +
        new Buffer(
          this.credentials.clientId + ':' + this.credentials.clientSecret
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'

    };

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      authenticationRequest.host,
      authenticationRequest.port,
      authenticationRequest.scheme,
      authenticationRequest.path,
      authenticationRequest.headers,
      undefined,
      authenticationRequest.bodyParameters,
    );

    return swrExecute(spotifyWebRequest, httpManagerPost);
  }

  getMe(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerGet);
  }

  // https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
  getMyPlaylists(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/playlists',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerGet);
  }

  // https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlists-tracks
  async getPlaylistTracks(accessToken: string, playlistId: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/playlists/' + playlistId + '/tracks?market=US',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerGet);
  }

  async getPlaybackState(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerGet);
  }

  startPlayback(accessToken: string, deviceId: string, contextUri: string): Promise<any> {
    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player/play?device_id=' + deviceId,
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      {
        context_uri: contextUri,
      },
    );

    return swrExecute(spotifyWebRequest, httpManagerPut);
  }
  
  resumePlayback(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player/play',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerPut);
  }

  pausePlayback(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player/pause',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerPut);
  }

  async skipToNextTrack(accessToken: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player/next',
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerPost);
  }

  async addItemToQueue(accessToken: string, uri: string, deviceId: string): Promise<any> {

    const spotifyWebRequest: SpotifyWebRequest = swrCreateSpotifyWebRequest(
      'api.spotify.com',
      spotifyApiConfiguration.DEFAULT_PORT,
      spotifyApiConfiguration.DEFAULT_SCHEME,
      '/v1/me/player/queue?uri=' + uri + '&device_id=' + deviceId,
      { Authorization: 'Bearer ' + accessToken },
      undefined,
      undefined,
    );

    return swrExecute(spotifyWebRequest, httpManagerPost);
  }
}

