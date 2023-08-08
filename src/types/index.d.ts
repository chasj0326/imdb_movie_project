export type Movies = Movie[];

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchRequestParams {
  s: string;
  y?: string;
  page?: string;
}

export interface DetailRequestParams {
  i: string;
  plot?: 'short' | 'full';
}
