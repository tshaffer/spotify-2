import { Request, Response } from 'express';

// TEDTODO - really ugly
import { spotifyWebApi } from '../app';

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

export function authenticateUser(request: Request, response: Response) {
  console.log('authenticateUser');
  const authorizationUrl: string = spotifyWebApi.createAuthorizeURL(scopes);
  response.redirect(authorizationUrl);
}

export function authenticateCallbackHandler(request: Request, response: Response) {
  console.log('authenticateCallbackHandler');
  const error = request.query.error;
  const code: string = request.query.code as string;
  const state = request.query.state;

  if (error) {
    console.error('Callback Error:', error);
    response.send(`Callback Error: ${error}`);
    return;
  }
  const promise = spotifyWebApi
    .authorizationCodeGrant(code);
  promise.then((data: any) => {
    const access_token = data.body.access_token;
    console.log('access_token');
    console.log(access_token);
    const refresh_token = data.body.refresh_token;
    const expires_in = data.body.expires_in;

    spotifyWebApi.setAccessToken(access_token);
    spotifyWebApi.setRefreshToken(refresh_token);

    console.log('access_token:', access_token);
    console.log('refresh_token:', refresh_token);

    console.log(
      `Sucessfully retrieved access token. Expires in ${expires_in} s.`
    );
    response.send('Success! You can now c±lose the window.');

    setInterval(async () => {
      const refreshData = await spotifyWebApi.refreshAccessToken();
      const accessToken = refreshData.body.access_token;

      console.log('The access token has been refreshed!');
      console.log('access_token:', accessToken);
      spotifyWebApi.setAccessToken(accessToken);
    }, expires_in / 2 * 1000);

  }).catch((err: any) => {
    debugger;
  })
}
