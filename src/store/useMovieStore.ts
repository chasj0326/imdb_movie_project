import { defineStore } from 'pinia';
import { Movies, MovieInfo } from '../types';
import axios from 'axios';

interface StoreState {
  movies: null | Movies;
  movie: null | MovieInfo;
  loading: boolean;
  movieFull: boolean;
}

export const useMovieStore = defineStore('movie', {
  state: (): StoreState => ({
    movies: null,
    movie: null,
    loading: false,
    movieFull: false,
  }),
  actions: {
    async fetchMovies(title: string, page = 1) {
      this.loading = true;
      try {
        const { data } = await axios.post<SearchResult>('/api/movie', {
          s: title,
          page,
        });
        if (!data.Search || data.Search.length < 10) {
          this.movieFull = true;
        }
        this.movies = this.movies
          ? this.movies.concat(data.Search)
          : data.Search;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchMovie(id: string) {
      this.loading = true;
      try {
        const { data } = await axios.post<MovieInfo>('/api/movie', {
          i: id,
        });
        this.movie = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
