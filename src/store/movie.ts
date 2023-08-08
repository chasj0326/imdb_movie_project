import { defineStore } from 'pinia';
import { Movies } from '../types';
import { request } from '../service/apiRequest';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movies,
  }),
  actions: {
    async fetchMovies(title: string) {
      const { Search } = await request({ s: title });
      this.movies = Search;
    },
  },
});
