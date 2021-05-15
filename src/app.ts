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
      clientId: '039a29e66a4b49508dd6de7ae97a3435',
      clientSecret: '7e624b296e7c4a4f8b52d6e6d4531029',
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
