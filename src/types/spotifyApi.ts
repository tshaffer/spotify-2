// https://developer.spotify.com/documentation/web-api/reference/#object-pagingobject
export interface SpotifyPagingObject {
  href: string;
  items: SpotifyPlaylist[];
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number; 
}

export interface SpotifyPlaylists extends SpotifyPagingObject {
  items: SpotifyPlaylist[];
}

// https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedplaylistobject
export interface SpotifyPlaylist {  // SimplifiedPlaylistObject
  collaborative: boolean;
  description: boolean | null;
  external_urls: SpotifyExternalUrlObject[]; // ExternalUrlObject
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