<script setup lang="ts">
import { MovieDetail, MovieList, SearchBar } from '../components';
import { useMovieStore } from '../store/movie';
import { watch } from 'vue';
import { LocationQueryValue, useRoute } from 'vue-router';
const movieStore = useMovieStore();
const route = useRoute();

const handleQueryQ = async (q: LocationQueryValue | LocationQueryValue[]) => {
  movieStore.initMovies();
  q && (await movieStore.fetchMovies(q.toString()));
};

const handleQueryMovie = async (
  movie: LocationQueryValue | LocationQueryValue[],
) => {
  movie
    ? await movieStore.fetchMovie(movie.toString())
    : movieStore.initMovie();
};

watch(route, async () => {
  const { q, movie } = route.query;
  await handleQueryQ(q);
  await handleQueryMovie(movie);
});

handleQueryQ(route.query.q);
handleQueryMovie(route.query.movie);
</script>

<template>
  <div
    class="app__inner"
    :class="{ movieSelected: movieStore.isSelected }">
    <div class="app__search">
      <SearchBar />
      <MovieList />
    </div>
    <div
      v-if="movieStore.isSelected"
      class="app__detail">
      <MovieDetail />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app__inner {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  background-color: black;
  justify-content: center;
  height: 100vh;
  .app__search {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.5s;
  }

  &.movieSelected {
    height: 100vh;
    overflow-y: hidden;
    .app__search {
      width: 300px;
    }
  }

  .app__detail {
    display: flex;
    width: 100%;
    flex-shrink: 1;
    box-sizing: border-box;
  }
}
</style>
