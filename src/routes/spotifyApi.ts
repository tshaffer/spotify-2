import express from 'express';
import { getMe, getMyPlaylists, getPlaylistTracks } from '../controllers';

const spotifyApiRouter = express.Router();

spotifyApiRouter.get('/getMe', getMe);
spotifyApiRouter.get('/getMyPlaylists', getMyPlaylists);
spotifyApiRouter.get('/getPlaylistTracks/:playlistId', getPlaylistTracks);

export default spotifyApiRouter;
