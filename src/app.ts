import { isNil, isString } from 'lodash';

import express from 'express';
import { Request, Response } from 'express';

// import { SpotifyWebApi } from './webApiHelpers';
import { SpotifyWebApi } from './webApiHelpers/spotifyWebApi';

class App {

  public app: express.Application;
  spotifyWebApi: SpotifyWebApi;

  constructor() {

    this.spotifyWebApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:8888/callback',
      clientId: '<client_id>',
      clientSecret: '<client_secret>',
    })

    this.app = express();
    this.config();

    this.app.use(express.json({
      limit: '100mb',
    }));

    console.log('__dirname');
    console.log(__dirname);

    this.app.get('/login', (req, res) => {
      debugger;
      // res.redirect(spotifyApi.createAuthorizeURL(scopes));
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
