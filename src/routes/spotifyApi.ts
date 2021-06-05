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
  shufflePlayback,
  skipToPreviousTrack,
} from '../controllers';

const spotifyApiRouter = express.Router();

spotifyApiRouter.get('/getMe', getMe);
spotifyApiRouter.get('/getMyPlaylists', getMyPlaylists);
spotifyApiRouter.get('/getPlaylistTracks/:playlistId', getPlaylistTracks);
spotifyApiRouter.get('/getPlaybackState', getPlaybackState);
spotifyApiRouter.put('/pausePlayback', pausePlayback);
spotifyApiRouter.put('/startPlayback', resumePlayback);
spotifyApiRouter.post('/skipToNextTrack', skipToNextTrack);
spotifyApiRouter.post('/skipToPreviousTrack', skipToPreviousTrack);
spotifyApiRouter.post('/shufflePlayback/:shuffleState', shufflePlayback);

spotifyApiRouter.get('/addPlaylistTracksToQueue/:playlistId/contextUri/:contextUri', addPlaylistTracksToQueue);

export default spotifyApiRouter;
