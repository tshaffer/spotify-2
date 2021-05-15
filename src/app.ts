import { isNil, isString } from 'lodash';

import express from 'express';
import { readConfig } from './config';
import { spotifyApiConfiguration } from './config';

import { SpotifyWebApi } from './webApiHelpers';

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


class App {

  public app: express.Application;
  spotifyWebApi: SpotifyWebApi;

  constructor() {

    readConfig('/Users/tedshaffer/Documents/Projects/spotify-2/src/config/config.env');

    this.spotifyWebApi = new SpotifyWebApi({
      redirectUri: spotifyApiConfiguration.DEFAULT_REDIRECT_URI,
      clientId: spotifyApiConfiguration.CLIENT_ID,
      clientSecret: spotifyApiConfiguration.CLIENT_SECRET,
    })

    this.app = express();
    this.config();

    this.app.use(express.json({
      limit: '100mb',
    }));

    console.log('__dirname');
    console.log(__dirname);

    this.app.get('/login', (req, res) => {
      const authorizationUrl: string = this.spotifyWebApi.createAuthorizeURL(scopes);
      res.redirect(authorizationUrl);
    });

    this.app.get('/callback', (req, res) => {

      const error = req.query.error;
      const code: string = req.query.code as string;
      const state = req.query.state;

      if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
      }
      const promise = this.spotifyWebApi
        .authorizationCodeGrant(code);
      promise.then((data: any) => {
        const access_token = data.body.access_token;
        const refresh_token = data.body.refresh_token;
        const expires_in = data.body.expires_in;

        this.spotifyWebApi.setAccessToken(access_token);
        this.spotifyWebApi.setRefreshToken(refresh_token);

        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);

        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now c±lose the window.');

        setInterval(async () => {
          const refreshData = await this.spotifyWebApi.refreshAccessToken();
          const accessToken = refreshData.body.access_token;

          console.log('The access token has been refreshed!');
          console.log('access_token:', accessToken);
          this.spotifyWebApi.setAccessToken(accessToken);
        }, expires_in / 2 * 1000);

      }).catch((err: any) => {
        debugger;
      })
    });

  }

  private config(): void {
    let port: any = process.env.PORT;
    if (port === undefined || port === null || port === '') {
      port = 8888;
    }
    this.app.set('port', port);
  }

}

export default new App().app;
