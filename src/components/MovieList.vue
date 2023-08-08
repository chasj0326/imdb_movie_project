<script setup lang="ts">
import { useMovieStore } from '../store/movie';
const movieStore = useMovieStore();
</script>

<template>
  <div class="movies">
    <div
      v-for="movie in movieStore.movies"
      :key="movie.imdbID"
      class="movies__item">
      <img
        :src="movie.Poster"
        :alt="movie.Title" />
      <div class="movies__item__contents">
        <p>{{ movie.Year }}</p>
        <strong>{{ movie.Title }}</strong>
        <span :class="movie.Type">{{ movie.Type }}</span>
      </div>
    </div>
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
    position: relative;
    border-radius: 5px;
    padding: 10px;
    transition: 0.3s;
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
</style>
