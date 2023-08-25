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
    case 'guide':
      return 'ℹ️';
    default:
      return '';
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
  border-radius: 10px;
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.584);
  &.guide {
    border: 1px solid rgba(223, 243, 255, 0.5);
    color: rgb(223, 243, 255);
  }
  &.warn {
    border: 1px solid #ffeaa78c;
    color: #ffeaa7;
  }
  &.error {
    border: 1px solid #fe919177;
    color: #fe9191;
  }
  .icon {
    margin-right: 10px;
    margin-bottom: 2px;
    font-size: 16px;
  }
  &.error,
  &.warn,
  &.guide {
    .content {
      font-size: 16px;
    }
  }
  .content {
    font-size: 20px;
  }
}
</style>
