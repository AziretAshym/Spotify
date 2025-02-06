export interface IArtist {
  _id: string;
  name: string;
  image?: string;
  info?: string;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  image?: File;
  info?: string;
  isPublished: boolean;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: IArtist;
  yearOfIssue: number;
  image?: string;
  trackCount: number;
  isPublished: boolean;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  yearOfIssue: number;
  image?: File;
  trackCount?: number;
  isPublished: boolean;
}

export interface ITrack {
  _id: string;
  title: string;
  album: IAlbum;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface TracksMutation {
  title: string;
  album: string;
  duration: string;
  isPublished: boolean;
}

export interface ITrackHistory {
  _id: string;
  user: User;
  albums: IAlbum;
  track: ITrack;
  datetime: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar?: File;
}

export interface LoginMutation {
  username: string;
  password: string;
}


export interface User {
  _id: string;
  username: string;
  displayName: string;
  role: string;
  avatar?: string | File;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
