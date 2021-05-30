import express from 'express';
import {
  addPlaylistTracksToQueue,
  getMe,
  getMyPlaylists,
  getPlaybackState,
  getPlaylistTracks,
  pausePlayback,
  skipToNextTrack,
  resumePlayback,
} from '../controllers';

const spotifyApiRouter = express.Router();

spotifyApiRouter.get('/getMe', getMe);
spotifyApiRouter.get('/getMyPlaylists', getMyPlaylists);
spotifyApiRouter.get('/getPlaylistTracks/:playlistId', getPlaylistTracks);
spotifyApiRouter.get('/getPlaybackState', getPlaybackState);
spotifyApiRouter.put('/pausePlayback', pausePlayback);
spotifyApiRouter.put('/startPlayback', resumePlayback);
spotifyApiRouter.post('/skipToNextTrack', skipToNextTrack);

spotifyApiRouter.get('/addPlaylistTracksToQueue/:playlistId/contextUri/:contextUri', addPlaylistTracksToQueue);

export default spotifyApiRouter;
