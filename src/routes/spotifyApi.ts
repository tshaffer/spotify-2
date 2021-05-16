import express from 'express';
import { getMe } from '../controllers';

const spotifyApiRouter = express.Router();

spotifyApiRouter.get('/getMe', getMe);

export default spotifyApiRouter;
