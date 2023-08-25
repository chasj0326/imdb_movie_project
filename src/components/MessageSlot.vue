<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.type) {
    case 'warn':
      return '⚠️';
    case 'error':
      return '🚨';
    default:
      return 'ℹ️';
  }
});
</script>

<template>
  <div
    class="message"
    :class="props.type">
    <div class="icon">{{ icon }}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  display: flex;
  align-items: center;
  padding: 10px 42px 10px 30px;
  width: fit-content;
  border: 1px solid #cccccc8c;
  border-radius: 10px;
  margin-top: 10px;
  color: rgb(223, 243, 255);
  &.warn {
    color: #ffeaa7;
  }
  &.error {
    color: #fe9191;
  }
  .icon {
    margin-right: 10px;
    margin-bottom: 2px;
    font-size: 16px;
  }
  .content {
    font-size: 16px;
  }
}
</style>
