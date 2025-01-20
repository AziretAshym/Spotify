export interface IArtist {
  _id: string;
  name: string;
  image?: string;
  info?: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: IArtist;
  yearOfIssue: number;
  image?: string;
  trackCount: number;
}

export interface ITrack {
  _id: string;
  title: string;
  album: IAlbum;
  duration: string;
  number: number;
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
}

export interface LoginMutation {
  username: string;
  password: string;
}


export interface User {
  _id: string;
  username: string;
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
