<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '../store/movie';
import DetailView from './DetailView.vue';
const movieStore = useMovieStore();
const category = ref('');
const changeCategory = (title: string) => {
  if (title === category.value) {
    category.value = '';
  } else {
    category.value = title;
  }
};
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
      <div class="movie__item__detail">
        <div class="nav">
          <button
            v-for="title in ['Detail', 'Product', 'Archive']"
            :key="title"
            :class="{ selected: category === title }"
            @click="changeCategory(title)">
            {{ title }}
            <i
              v-if="category === title"
              class="fa-solid fa-caret-up"></i>
            <i
              v-else
              class="fa-solid fa-caret-down"></i>
          </button>
        </div>
        <div>
          <DetailView
            v-if="category === 'Product'"
            :info="{
              Writer: movieStore.movie.Writer,
              Director: movieStore.movie.Director,
              Actors: movieStore.movie.Actors,
              Production: movieStore.movie.Production,
            }" />
          <DetailView
            v-if="category === 'Detail'"
            :info="{
              Plot: movieStore.movie.Plot,
            }" />
          <DetailView
            v-if="category === 'Archive'"
            :info="{
              Awards: movieStore.movie.Awards,
              Ratings: movieStore.movie.Ratings,
              BoxOffice: movieStore.movie.BoxOffice,
            }" />
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
    &__tag {
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
    &__main {
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
          @media (max-width: 1000px) {
            font-size: 30px;
            line-height: 40px;
          }
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

    &__contents {
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
          @media (max-width: 1000px) {
            max-height: 180px;
          }
        }
      }
    }
    &__detail {
      .nav {
        display: flex;
        align-items: center;
        margin-top: 10px;
        gap: 10px;
        button {
          display: flex;
          justify-self: center;
          font-family: 'Noto Sans KR', sans-serif;
          outline: none;
          border: none;
          cursor: pointer;
          height: 24px;
          border-radius: 12px;
          padding: 2px 10px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          transition: 0.5s;
          &.selected {
            background-color: rgba(255, 255, 255, 0.5);
            color: black;
          }
          i {
            font-size: 16px;
            margin-left: 8px;
            margin-top: 2px;
          }
        }
      }
    }
  }
}
</style>
