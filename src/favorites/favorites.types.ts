import { Artist } from '../artists/artists.types';
import { Album } from '../albums/albums.types';
import { Track } from '../tracks/tracks.types';

export interface Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoriteResponse {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
