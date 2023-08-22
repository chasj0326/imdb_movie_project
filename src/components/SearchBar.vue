<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const search = ref('');
const router = useRouter();

const handleSubmit = async () => {
  router.push({ name: 'Search', query: { keyword: search.value } });
  search.value = '';
};
</script>

<template>
  <div class="search">
    <form @submit.prevent="handleSubmit">
      <input
        v-model="search"
        placeholder="검색할 영화 제목을 입력하세요." />
      <button>
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  padding: 20px 30px;
  max-width: 1080px;
  box-sizing: border-box;
  form {
    display: flex;
    width: 100%;
    padding-bottom: 5px;
    &:focus {
      background-color: rgba(255, 255, 255, 0.1);
    }
    input {
      width: 100%;
      background: none;
      color: white;
      outline: none;
      border: none;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Noto Sans KR', sans-serif;
    }
    button {
      background: none;
      color: white;
      outline: none;
      border: none;
      font-size: 20px;
    }
  }
}
</style>
