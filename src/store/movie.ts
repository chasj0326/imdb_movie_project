import { defineStore } from 'pinia';
import { Movies, MovieInfo } from '../types';
import axios from 'axios';
import { LocationQueryValue } from 'vue-router';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movies,
    movie: {} as MovieInfo,
    loading: false,
  }),
  getters: {
    isSearched(): number {
      return this.movies.length;
    },
    isSelected(): number {
      return Object.keys(this.movie).length;
    },
  },
  actions: {
    async fetchMovies(title: string, page = 1) {
      this.loading = true;
      try {
        const { data } = await axios.post('/api/movie', {
          s: title,
          page: String(page),
        });
        this.movies = this.movies.concat(data.Search);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchMovie(id: string) {
      this.loading = true;
      try {
        const { data } = await axios.post('/api/movie', {
          i: id,
          plot: 'full',
        });
        this.movie = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    initMovies() {
      this.movies = [] as Movies;
    },
    initMovie() {
      this.movie = {} as MovieInfo;
    },
    scrollIntoMovie(movie: LocationQueryValue | LocationQueryValue[]) {
      if (movie) {
        const target = document.querySelector(`#${movie}`);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    },
  },
});
