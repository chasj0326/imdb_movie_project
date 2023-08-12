<script setup lang="ts">
import { useMovieStore } from '../store/movie';
const movieStore = useMovieStore();
</script>

<template>
  <div
    v-if="movieStore.isSelected"
    class="movie__container"
    :style="`--background: url(${movieStore.movie.Poster})`">
    <div class="movie__item">
      <span
        class="movie__item__tag"
        :class="movieStore.movie.Type"
        >{{ movieStore.movie.Type }}</span
      >
      <div class="movie__item__main">
        <div class="title">
          <h1>
            {{ movieStore.movie.Title }}
            <span>{{ movieStore.movie.Year }}</span>
          </h1>
        </div>
        <div class="score">
          <span>★</span>
          {{ movieStore.movie.imdbRating }}
        </div>
      </div>
      <div class="movie__item__contents">
        <div class="contents__info">
          <div class="released">
            <span class="label">Released</span>
            {{ movieStore.movie.Released }}
          </div>
          <div class="genre">
            <span class="label">Genre</span>
            {{ movieStore.movie.Genre }}
          </div>
          <div class="country">
            <span class="label">Country</span>
            {{ movieStore.movie.Country }}
          </div>
          <div class="language">
            <span class="label">Language</span>
            {{ movieStore.movie.Language }}
          </div>
          <div class="runtime">
            <span class="label">Runtime</span>
            {{ movieStore.movie.Runtime }}
          </div>
        </div>
        <div class="contents__image">
          <img :src="movieStore.movie.Poster" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie__container {
  position: relative;
  width: 100%;
  height: 100%;
  color: white;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: var(--background);
    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(0.3) blur(20px);
  }

  .movie__item {
    position: absolute;
    z-index: 1;
    padding: 40px;
    width: calc(100% - 100px);
    .movie__item__tag {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      margin-left: 2px;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 400;
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
    .movie__item__main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .title {
        display: flex;
        align-items: flex-end;
        h1 {
          font-size: 42px;
          font-weight: 700;
          line-height: 60px;
        }
        span {
          font-size: 20px;
          font-weight: 400;
        }
      }
      .score {
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: 700;
        span {
          font-size: 20px;
          margin-right: 10px;
        }
      }

      padding-bottom: 12px;
      border-bottom: 1px solid white;
    }

    .movie__item__contents {
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contents__info {
        display: flex;
        flex-direction: column;
        gap: 16px;
        .label {
          display: inline-block;
          width: 100px;
          font-weight: 700;
        }
      }
      .contents__image {
        img {
          height: 100%;
          max-height: 240px;
        }
      }
    }
  }
}
</style>
