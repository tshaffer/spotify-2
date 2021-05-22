import { Request, Response } from 'express';
import { isNil } from 'lodash';
import { SpotifyPlaylists } from 'spotifyApi';

// TEDTODO - really ugly
import { spotifyWebApi } from '../app';

export function getMe(request: Request, response: Response) {

  console.log('getMe invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.getMe(accessToken);
  promise
    .then((data: any) => {
      console.log(data.body);
      response.json(data.body);
    })
    .catch((err: Error) => {
      console.log(err);
    });
}

export function getMyPlaylists(request: Request, response: Response) {

  console.log('getMyPlaylists invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.getMyPlaylists(accessToken);
  promise
    .then((data: any) => {
      if (!isNil(data.body)) {
        const spotifyPlaylists: SpotifyPlaylists = data.body as SpotifyPlaylists;
        console.log('spotifyPlaylists');
        console.log(spotifyPlaylists);
        return response.json(spotifyPlaylists);
      } else {
        throw new Error('data.body is null');
      }
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });
}

export function getPlaylistTracks(request: Request, response: Response) {

  console.log('getPlaylistTracks invoked');

  const { playlistId } = request.params;

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.getPlaylistTracks(accessToken, playlistId);
  promise
    .then((data: any) => {
      console.log(data.body);
      response.json(data.body);
    })
    .catch((err: Error) => {
      console.log(err);
    });
}

export function getPlaybackState(request: Request, response: Response) {

  console.log('getPlaybackState invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.getPlaybackState(accessToken);
  promise
    .then((data: any) => {
      if (!isNil(data.body)) {
        console.log(data.body);
        return response.json(data.body);
      } else {
        throw new Error('data.body is null');
      }
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });

}

export function startPlayback(request: Request, response: Response) {

  console.log('startPlayback invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.startPlayback(accessToken);
  promise
    .then((result: any) => {
      console.log('startPlayback');
      console.log(result);
      response.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });

}

export function pausePlayback(request: Request, response: Response) {

  console.log('pausePlayback invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.pausePlayback(accessToken);
  promise
    .then((result: any) => {
      console.log('pausePlayback');
      console.log(result);
      response.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });

}
