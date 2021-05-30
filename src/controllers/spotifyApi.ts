import { Request, Response } from 'express';
import { isNil } from 'lodash';
import { SpotifyPlaylistItems, SpotifyPlaylists, SpotifyPlaylistTrackObject, SpotifyPlaybackState } from 'spotifyApi';

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

function addItemToQueue(uri: string) {

  console.log('addItemToQueue invoked');

}

export function addPlaylistTracksToQueue(request: Request, response: Response) {

  console.log('addPlaylistTracksToQueue invoked');

  const { playlistId } = request.params;

  const accessToken = spotifyWebApi.getAccessToken();

  const getPlaylistTracksPromise: Promise<any> = spotifyWebApi.getPlaylistTracks(accessToken, playlistId);
  getPlaylistTracksPromise
    .then((playlistTrackData: any) => {
      console.log('playlistTrackData');
      console.log(playlistTrackData);
      const playbackStatePromise = spotifyWebApi.getPlaybackState(accessToken);
      playbackStatePromise
        .then((playbackStateData: any) => {
          console.log('playbackStateData');
          console.log(playbackStateData);
          response.status(200);
        })
    })
    .catch((err: Error) => {
      console.log(err);
      debugger;
    });

  // let deviceId: string = '';
  // let spotifyPlaylistItems: SpotifyPlaylistItems;

  // const playbackStatePromise = spotifyWebApi.getPlaybackState(accessToken);
  // playbackStatePromise
  //   .then((data: any) => {
  //     console.log(data.body);
  //     const spotifyPlaybackState: SpotifyPlaybackState = data.body as SpotifyPlaybackState;
  //     deviceId = spotifyPlaybackState.device.id;
  //     // http://localhost:8888/api/v1/getPlaylistTracks/37i9dQZF1DX6bJVMtDYJHx
  //     spotifyWebApi.getPlaylistTracks(accessToken, playlistId)
  //   }).then((data: any) => {
  //     console.log(data);
  //     // spotifyPlaylistItems = data.body as SpotifyPlaylistItems;
  //     // debugger;
  //     response.status(200);
  //   })
  //   .catch((err: Error) => {
  //     console.log(err);
  //     debugger;
  //   })

  // const promise = spotifyWebApi.getPlaylistTracks(accessToken, playlistId);
  // promise
  // .then((data: any) => {
  //   console.log(data.body);
  //   const spotifyPlaylistItems: SpotifyPlaylistItems = data.body as SpotifyPlaylistItems;

  //   // add each item in the playlist to the queue
  //   const items: SpotifyPlaylistTrackObject[] = spotifyPlaylistItems.items;
  //   for (const spotifyPlaylistTrack of items) {

  //   }

  //   debugger;
  //   // response.json(data.body);
  // })
  // .catch((err: Error) => {
  //   console.log(err);
  // });

}


export function getPlaybackState(request: Request, response: Response): void {

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

export function skipToNextTrack(request: Request, response: Response) {

  console.log('skipToNextTrack invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.skipToNextTrack(accessToken);
  promise
    .then((result: any) => {
      console.log('skipToNextTrack');
      console.log(result);
      response.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });

}
