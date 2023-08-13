<script setup lang="ts">
import { useMovieStore } from '../store/movie';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { LoadingDots } from '../components';

const movieStore = useMovieStore();
const route = useRoute();
const observerTrigger = ref(null);
const page = ref(1);
const searchQuery = ref(route.query.q);

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      if (searchQuery.value === route.query.q) {
        page.value += 1;
      } else {
        page.value = 1;
        searchQuery.value = route.query.q;
      }
      if (page.value > 1 && searchQuery.value) {
        movieStore.fetchMovies(String(searchQuery.value), page.value);
      }
    }
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  },
);

onMounted(() => {
  if (observerTrigger.value) {
    observer.observe(observerTrigger.value);
  }
});
</script>

<template>
  <div class="movies">
    <router-link
      v-for="movie in movieStore.movies"
      :id="movie.imdbID"
      :key="movie.imdbID"
      :to="{
        name: 'Search',
        query: { ...$route.query, movie: movie.imdbID },
      }"
      :class="{ selected: movie.imdbID === movieStore.movie.imdbID }"
      class="movies__item">
      <img
        :src="movie.Poster"
        :alt="movie.Title" />
      <div class="movies__item__contents">
        <p>{{ movie.Year }}</p>
        <strong>{{ movie.Title }}</strong>
        <span :class="movie.Type">{{ movie.Type }}</span>
      </div>
    </router-link>
  </div>
  <div
    ref="observerTrigger"
    class="observer">
    <LoadingDots />
  </div>
</template>

<style lang="scss" scoped>
.movies {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  max-width: 1080px;
  .movies__item {
    text-decoration: none;
    position: relative;
    border-radius: 5px;
    padding: 10px;
    transition: 0.3s;
    height: fit-content;
    cursor: pointer;
    &.selected {
      background-color: rgba(255, 255, 255, 0.15);
      transform: scale(1.05);
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      transform: scale(1.05);
    }
    img {
      width: 100%;
    }
    .movies__item__contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      strong {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        margin-top: 2px;
      }
      p {
        text-align: end;
        padding: 4px;
        box-sizing: border-box;
        font-weight: 300;
        font-size: 14px;
        border-bottom: 1px solid white;
      }
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 1px 1px 0px 3px rgba(0, 0, 0, 1);
        &.movie {
          background-color: rgb(224, 17, 17);
        }
        &.series {
          background-color: rgb(98, 24, 203);
        }
        &.episode {
          background-color: rgb(17, 176, 174);
        }
      }
    }
  }
}
.observer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 200px;
}
</style>
