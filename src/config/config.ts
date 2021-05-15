import * as dotenv from 'dotenv';
import { isNil } from 'lodash';
import { SpotifyApiConfiguration } from '../types';

export let spotifyApiConfiguration: SpotifyApiConfiguration;

export const readConfig = (pathToConfigFile: string): void => {

  try {
    const configOutput: dotenv.DotenvConfigOutput = dotenv.config({ path: pathToConfigFile });
    const parsedConfig: dotenv.DotenvParseOutput | undefined = configOutput.parsed;

    if (!isNil(parsedConfig)) {
      spotifyApiConfiguration = {
        CLIENT_ID: parsedConfig.CLIENT_ID,
        CLIENT_SECRET: parsedConfig.CLIENT_SECRET,
        DEFAULT_REDIRECT_URI: parsedConfig.DEFAULT_REDIRECT_URI,
        DEFAULT_HOST: parsedConfig.DEFAULT_HOST,
        DEFAULT_PORT: parseInt(parsedConfig.DEFAULT_PORT, 10),
        DEFAULT_SCHEME: parsedConfig.DEFAULT_SCHEME,
      };
      console.log(spotifyApiConfiguration);
    }
  }
  catch (err) {
    console.log('Dotenv config error: ' + err.message);
  }
};
