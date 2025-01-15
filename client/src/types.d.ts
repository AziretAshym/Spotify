export interface IArtist {
  _id: string;
  name: string;
  image?: string;
  info?: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: string;
  yearOfIssue: number;
  image?: string;
  trackCount: number;
}