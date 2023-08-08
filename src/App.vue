<script setup lang="ts">
import MovieList from './components/MovieList.vue';
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <div class="app__inner">
    <SearchBar />
    <MovieList />
  </div>
</template>

<style lang="scss" scoped>
.app__inner {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  min-height: 100vh;
}
</style>
