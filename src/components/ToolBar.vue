<script setup lang="ts">
const scrollToTop = () => {
  const target = document.querySelector('.app__search');
  if (target) {
    target.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const clearMyMovies = () => {
  localStorage.setItem('my-movies', '[]');
  location.reload();
};
</script>

<template>
  <button @click="clearMyMovies">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button @click="$router.push('/')">
    <i class="fa-solid fa-house"></i>
  </button>
  <button @click="scrollToTop">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 20px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 18px;
  border: none;
  outline: none;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.02);
  }
}
</style>
