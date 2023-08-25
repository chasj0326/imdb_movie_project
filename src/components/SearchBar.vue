<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MessageSlot from './MessageSlot.vue';

const input = ref<HTMLInputElement | null>(null);
const search = ref('');
const router = useRouter();

const handleSubmit = async () => {
  router.push({ name: 'Search', query: { keyword: search.value } });
  search.value = '';
};

const defaultMsg = {
  type: 'default',
  content: '모두 영문자로, 3글자 이상의 단어를 입력해주세요.',
};
const warningEng = {
  type: 'warn',
  content: '모두 영문자로 입력해주세요.',
};
const errorLength = {
  type: 'error',
  content: '3글자 이상 입력해주세요.',
};

const message = computed(() => {
  if (!search.value) {
    return defaultMsg;
  }
  if (!/^[a-zA-Z]+$/.test(search.value)) {
    return warningEng;
  }
  if (search.value.length < 3) {
    return errorLength;
  }
  return null;
});

const submitDisabled = computed(() => {
  return search.value.length < 3 || !/^[a-zA-Z]+$/.test(search.value);
});

onMounted(() => {
  input.value?.focus();
});
</script>

<template>
  <div class="search">
    <form @submit.prevent="handleSubmit">
      <input
        ref="input"
        v-model="search"
        placeholder="검색할 영화 제목을 입력하세요." />
      <button :disabled="submitDisabled">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
    <MessageSlot
      v-if="message"
      :type="message.type">
      {{ message.content }}
    </MessageSlot>
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
      cursor: pointer;
      &:disabled {
        opacity: 0.2;
      }
    }
  }
}
</style>
