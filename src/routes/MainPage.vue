<script setup lang="ts">
import {
  MovieDetail,
  MovieList,
  SearchBar,
  ToolBar,
  LoadingMovie,
} from '../components';
import { useMovieStore } from '../store/movie';
import { ref, watch } from 'vue';
import { LocationQueryValue, useRoute } from 'vue-router';
const movieStore = useMovieStore();
const route = useRoute();
const searchQuery = ref(route.query.q);
const movieId = ref(route.query.movie);

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
  if (searchQuery.value !== q) {
    await handleQueryQ(q);
    searchQuery.value = q;
  }
  if (movieId.value != movie) {
    movieStore.scrollIntoMovie(movie);
    handleQueryMovie(movie);
    movieId.value = movie;
  }
});

handleQueryQ(searchQuery.value);
handleQueryMovie(movieId.value).then(() => {
  movieStore.scrollIntoMovie(movieId.value);
});
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
      :class="{ active: movieStore.isSelected }"
      class="app__detail">
      <MovieDetail />
    </div>
    <div
      v-if="movieStore.loading && (!movieStore.isSearched || movieId)"
      class="app__loading">
      <LoadingMovie />
    </div>
    <div class="app__tool-bar">
      <ToolBar />
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
    width: 0px;
    flex-shrink: 1;
    box-sizing: border-box;
    &.active {
      width: 100%;
    }
  }

  .app__loading {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .app__tool-bar {
    position: absolute;
    right: 40px;
    bottom: 30px;
    display: flex;
  }
}
</style>
