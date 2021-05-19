import { Request, Response } from 'express';

// TEDTODO - really ugly
import { spotifyWebApi } from '../app';

export function getMe(request: Request, response: Response) {

  console.log('getMe invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.getMe(accessToken);
  promise
    .then((data: any) => {
      console.log(data);
      response.send('getMe() Success!');

    })
    .catch((err: Error) => {
      console.log(err);
    });
}
