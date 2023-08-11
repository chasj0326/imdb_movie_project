<script setup lang="ts">
import { useMovieStore } from '../store/movie';
const movieStore = useMovieStore();
</script>

<template>
  <div v-if="movieStore.isSelected">
    {{ movieStore.selectMovie }}
  </div>
</template>

<style lang="scss" scoped>
div {
  color: white;
}
</style>
