<script setup lang="ts">
import { MovieDetail, MovieList, SearchBar } from '../components';
import { useMovieStore } from '../store/movie';
import { watch } from 'vue';
import { LocationQueryValue, useRoute } from 'vue-router';
const movieStore = useMovieStore();
const route = useRoute();

const handleQueryQ = async (q: LocationQueryValue | LocationQueryValue[]) => {
  q ? await movieStore.fetchMovies(q as string) : movieStore.initMovies();
};

const handleQueryMovie = async (
  movie: LocationQueryValue | LocationQueryValue[],
) => {
  movie
    ? await movieStore.fetchMovie(movie as string)
    : movieStore.initSelectMovie();
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
  <div class="app__inner">
    <div
      class="app__search"
      :class="{ narrow: movieStore.isSelected }">
      <SearchBar />
      <MovieList />
    </div>
    <div class="app__detail">
      <MovieDetail />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app__inner {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  background-color: black;
  min-height: 100vh;
  justify-content: center;
  overflow-x: hidden;
  .app__search {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    height: 100vw;
    width: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.5s;
    &.narrow {
      width: 300px;
    }
  }

  .app__detail {
    display: flex;
    width: 100%;
    flex-shrink: 1;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
