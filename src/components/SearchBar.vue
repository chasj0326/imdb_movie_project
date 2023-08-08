<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '../store/movie';

const search = ref('');
const movieStore = useMovieStore();
const handleSubmit = () => {
  movieStore.fetchMovies(search.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="search" />
    <button>
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
</template>
