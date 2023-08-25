<script setup lang="ts">
import {
  MovieDetail,
  MovieList,
  SearchBar,
  ToolBar,
  LoadingMovie,
} from '../components';
import { useMovieStore } from '../store/useMovieStore';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const movieStore = useMovieStore();
const route = useRoute();
const keywordRef = ref(route.query.keyword);
const movieRef = ref(route.query.movie);

const handleQueryKeyword = async (keyword: string) => {
  await movieStore.fetchMovies(keyword);
};

const handleQueryMovie = async (movie: string) => {
  await movieStore.fetchMovie(movie);
};

const scrollIntoMovie = (movie: string) => {
  const target = document.querySelector(`#${movie}`);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

watch(route, async () => {
  const { keyword, movie } = route.query;
  if (typeof keyword !== 'string' && typeof movie !== 'string') {
    movieStore.$reset();
    const myMovies = JSON.parse(localStorage.getItem('my-movies') || '[]');
    myMovies.length && (movieStore.movies = myMovies);
    return;
  }
  if (keywordRef.value !== keyword && typeof keyword === 'string') {
    movieStore.$reset();
    await handleQueryKeyword(keyword);
    keywordRef.value = keyword;
  }
  if (movieRef.value !== movie && typeof movie === 'string') {
    scrollIntoMovie(movie);
    await handleQueryMovie(movie);
    movieRef.value = movie;
  }
});

if (typeof keywordRef.value === 'string') {
  handleQueryKeyword(keywordRef.value);
}
if (typeof movieRef.value === 'string') {
  scrollIntoMovie(movieRef.value);
  handleQueryMovie(movieRef.value);
}
if (!keywordRef.value) {
  const myMovies = JSON.parse(localStorage.getItem('my-movies') || '[]');
  myMovies.length && (movieStore.movies = myMovies);
}
</script>

<template>
  <div
    class="app__inner"
    :class="{ movieSelected: movieStore.movie }">
    <div class="app__search">
      <SearchBar />
      <MovieList />
    </div>
    <div
      :class="{ active: movieStore.movie }"
      class="app__detail">
      <MovieDetail />
    </div>
    <div
      v-if="movieStore.loading"
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
      overflow-y: auto;
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
    z-index: 100;
  }

  .app__tool-bar {
    position: absolute;
    right: 40px;
    bottom: 30px;
    display: flex;
  }
}
</style>
