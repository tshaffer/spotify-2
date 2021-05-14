import { Builder } from './baseRequest';

const DEFAULT_HOST = 'accounts.spotify.com';
const DEFAULT_PORT = 443;
const DEFAULT_SCHEME = 'https';

export class AuthenticationRequest {

  builder() {
    const newBuilder: Builder = new Builder();
    newBuilder.setHost(DEFAULT_HOST);
    newBuilder.setPort(DEFAULT_PORT);
    newBuilder.setScheme(DEFAULT_SCHEME);
    return newBuilder;
  }
}
