// https://developer.spotify.com/documentation/web-api/reference/#object-pagingobject
export interface SpotifyPagingObject {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number; 
}

export interface SpotifyPlaylists extends SpotifyPagingObject {
  items: SpotifyPlaylist[];
}

export interface SpotifyPlaylistItems extends SpotifyPagingObject {
  items: SpotifyPlaylistTrackObject[];
}

// https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedplaylistobject
export interface SpotifyPlaylist {  // SimplifiedPlaylistObject
  collaborative: boolean;
  description: boolean | null;
  external_urls: SpotifyExternalUrlObject[]; // ExternalUrlObject TEDTODO - array?
  href: string;
  id: string;
  images: SpotifyImageObject[]; // Array[ImageObject]
  name: string;
  owner: SpotifyPublicUserObject; // PublicUserObject
  primary_color?: any;  // undocumented
  public: boolean;
  snapshot_id: string;
  tracks: any[]; // PlaylistTracksRefObject
  type: string;
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-externalurlobject
export interface SpotifyExternalUrlObject {
  spotify: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-imageobject
export interface SpotifyImageObject {
  height: number | null;
  url: string;
  width: number | null;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-publicuserobject
export interface SpotifyPublicUserObject {
  display_name: string;
  external_urls: SpotifyExternalUrlObject;
  followers: any; // FollowersObject
  href: string;
  id: string;
  images: SpotifyImageObject[];
  type:	string
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-followersobject
export interface SpotifyFollowersObject {
  href: string;
  total: number;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-playlisttracksrefobject
export interface SpotifyPlaylistTracksRefObject {
  href: string;
  total: number;
}

// https://developer.spotify.com/documentation/web-api/reference/#category-player
export interface SpotifyPlaybackState {
  // ?? part of CurrentlyPlayingContextObject
  // https://developer.spotify.com/documentation/web-api/reference/#object-currentlyplayingcontextobject
  // https://developer.spotify.com/documentation/web-api/reference/#object-disallowsobject
  actions?: any; 
  context: SpotifyPlaybackContext;
  currently_playing_type: string;
  device: SpotifyDevice;
  is_playing: boolean;
  item: SpotifyTrackObject;
  progress_ms: number;
  repeat_state: boolean;
  shuffle_state: boolean;
  timestamp: number;
}

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyPlaybackContext {
  external_urls: SpotifyExternalUrlObject;
  href: string;
  type: string;
  uri: string;
}

export interface SpotifyPlaylistTrackObject {
  added_at: any; // Timestamp
  added_by: any; // PublicUserObject
  is_local: boolean;
  primary_color?: any;
  track: SpotifyTrackObject;
  video_thumbnail?: any;
}

export interface SpotifySimplifiedTrackObject {
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrlObject;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: any; // LinkedTrackObject
  name: string;
  preview_url: string;
  restrictions: any; // TrackRestrictionObject
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifyTrackObject {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: any;  // TEDTODO - ??
  external_urls: SpotifyExternalUrlObject;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: any; // ??
  name: string;
  popularity: number;
  preview_url: string;
  restrictions: any; // TrackRestrictionObject
  track?: boolean;
  track_number: number;
  type: string;
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-albumobject
export interface SpotifyAlbum {
  album_type: 'string';
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrlObject;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrlObject[]; // TEDTODO - array?
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
