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
</script>

<template>
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
  margin-right: 5px;
  font-size: 18px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.02);
  }
}
</style>
