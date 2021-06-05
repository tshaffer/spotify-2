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

export const addPlaylistTracksToQueue = async (request: Request, response: Response) => {

  console.log('addPlaylistTracksToQueue invoked');

  const { playlistId, contextUri } = request.params;

  console.log('contextUri');
  console.log(contextUri);

  const accessToken = spotifyWebApi.getAccessToken();

  const playlistTrackData: any = await spotifyWebApi.getPlaylistTracks(accessToken, playlistId);
  const spotifyPlaylistItems: SpotifyPlaylistItems = playlistTrackData.body;
  const spotifyPlaylistTracks: SpotifyPlaylistTrackObject[] = spotifyPlaylistItems.items;

  let playbackStateData: any = await spotifyWebApi.getPlaybackState(accessToken);
  let spotifyPlaybackState: SpotifyPlaybackState = playbackStateData.body;

  // TEDTDOO - check for no devices in playbackState.
  // let deviceId: string;
  // const usersDevices: any = await spotifyWebApi.getUsersDevices(accessToken);
  // if (!isNil(usersDevices) && !isNil(usersDevices.body) && isArray(usersDevices.body.devices)) {
  //   for (const device of usersDevices.body.devices) {
  //     if (device.type === 'Computer') {
  //       deviceId = device.id;
  //       const transferUsersPlaybackResult = await spotifyWebApi.transferUsersPlayback(accessToken, deviceId);
  //       console.log('transferUsersPlayback result: ' + transferUsersPlaybackResult);
  //     }
  //   }
  // } else {
  //   deviceId = spotifyPlaybackState.device.id;
  // }

  const deviceId = spotifyPlaybackState.device.id;
  console.log('deviceId: ' + deviceId);

  const firstTrackUri = spotifyPlaylistTracks[0].track.uri;

  for (const spotifyPlaylistTrack of spotifyPlaylistTracks) {
    console.log('addItemToQueue: ' + spotifyPlaylistTrack.track.artists[0].name + ' ' + spotifyPlaylistTrack.track.name + ' ' + spotifyPlaylistTrack.track.uri);
    await spotifyWebApi.addItemToQueue(accessToken, spotifyPlaylistTrack.track.uri, deviceId);
  }

  let itemUri = spotifyPlaybackState.item.uri;

  while (itemUri !== firstTrackUri) {
    console.log('skip track: ' + spotifyPlaybackState.context.uri);
    await spotifyWebApi.skipToNextTrack(accessToken);
    playbackStateData = await spotifyWebApi.getPlaybackState(accessToken);
    spotifyPlaybackState = playbackStateData.body;
    itemUri = spotifyPlaybackState.item.uri
  }

  console.log('found it');

  return response.json(spotifyPlaybackState);
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

export function resumePlayback(request: Request, response: Response) {

  console.log('resumePlayback invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.resumePlayback(accessToken);
  promise
    .then((result: any) => {
      console.log('resumePlayback');
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

export function skipToPreviousTrack(request: Request, response: Response) {

  console.log('skipToPreviousTrack invoked');

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.skipToPreviousTrack(accessToken);
  promise
    .then((result: any) => {
      console.log('skipToPreviousTrack');
      console.log(result);
      response.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });
}

export function shufflePlayback(request: Request, response: Response) {

  console.log('shufflePlayback invoked');

  const { shuffleState } = request.params;

  const accessToken = spotifyWebApi.getAccessToken();
  const promise = spotifyWebApi.shufflePlayback(accessToken, shuffleState);
  promise
    .then((result: any) => {
      console.log('shufflePlayback');
      console.log(result);
      response.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.toString());
    });
}
