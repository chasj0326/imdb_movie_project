<script setup lang="ts">
import { useMovieStore } from '../store/movie';
const movieStore = useMovieStore();
</script>

<template>
  <div>
    <div
      v-for="movie in movieStore.movies"
      :key="movie.imdbID">
      <strong>{{ movie.Title }}</strong>
      <p>{{ movie.Year }}</p>
      <p>{{ movie.Type }}</p>
      <img
        :src="movie.Poster"
        :alt="movie.Title" />
    </div>
  </div>
</template>
