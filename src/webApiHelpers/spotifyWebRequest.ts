import { isNil } from 'lodash';
import { SpotifyWebRequest } from '../types';

import { spotifyApiConfiguration } from '../config';

export const swrCreateSpotifyWebRequest = (
  swrHost: string,
  swrPort: number,
  swrScheme: string,
  swrPath: string,
  swrHeaders: any,
  swrQueryParameters: any,
  swrBodyParameters: any,
): SpotifyWebRequest => {

  const host: string = isNil(swrHost) ? spotifyApiConfiguration.DEFAULT_HOST : swrHost;
  const port: number = isNil(swrPort) ? spotifyApiConfiguration.DEFAULT_PORT : swrPort;
  const scheme: string = isNil(swrScheme) ? spotifyApiConfiguration.DEFAULT_SCHEME : swrScheme;
  const path: string = swrPath;
  const headers: any = swrHeaders;
  const queryParameters: any = swrQueryParameters;
  const bodyParameters: any = swrBodyParameters;

  return {
    host,
    port,
    scheme,
    path,
    headers,
    queryParameters,
    bodyParameters
  };
}

export const swrGetURI = (spotifyWebRequest: SpotifyWebRequest): string => {
  if (!spotifyWebRequest.scheme || !spotifyWebRequest.host || !spotifyWebRequest.port) {
    throw new Error('Missing components necessary to construct URI');
  }
  let uri = spotifyWebRequest.scheme + '://' + spotifyWebRequest.host;
  if (
    (spotifyWebRequest.scheme === 'http' && spotifyWebRequest.port !== 80) ||
    (spotifyWebRequest.scheme === 'https' && spotifyWebRequest.port !== 443)
  ) {
    uri += ':' + spotifyWebRequest.port;
  }
  if (spotifyWebRequest.path) {
    uri += spotifyWebRequest.path;
  }
  return uri;
}

export const swrGetURL = (spotifyWebRequest: SpotifyWebRequest): string => {
  const uri = swrGetURI(spotifyWebRequest);
  if (!isNil(spotifyWebRequest.queryParameters)) {
    return uri + swrGetQueryParameterString(spotifyWebRequest);
  } else {
    return uri;
  }
}

export const swrGetHeaders = (spotifyWebRequest: SpotifyWebRequest): any => {
  return spotifyWebRequest.headers;
}

export const swrGetBodyParameters = (spotifyWebRequest: SpotifyWebRequest): any => {
  return spotifyWebRequest.bodyParameters;
}

export const swrGetQueryParameters = (spotifyWebRequest: SpotifyWebRequest): any => {
  return spotifyWebRequest.queryParameters;
}

export const swrGetQueryParameterString = (spotifyWebRequest: SpotifyWebRequest): string => {
  if (!isNil(spotifyWebRequest.queryParameters)) {
    return (
      '?' +
      Object.keys(spotifyWebRequest.queryParameters)
        .filter((key) => {
          return spotifyWebRequest.queryParameters[key] !== undefined;
        })
        .map((key) => {
          return key + '=' + spotifyWebRequest.queryParameters[key];
        })
        .join('&')
    );
  }
  return '';
}

export const swrExecute = (spotifyWebRequest: SpotifyWebRequest, method: (arg0: any, arg1: any) => any): Promise<any> => {
  return new Promise((resolve, reject) => {
    method(spotifyWebRequest, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

