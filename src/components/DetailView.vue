<script setup lang="ts">
import { computed } from 'vue';
import { MovieInfo } from '../types';

const props = defineProps<{ info: Partial<MovieInfo> }>();
const ratings = computed(() => props.info.Ratings || []);
</script>

<template>
  <div class="detail">
    <div
      v-for="[title, content] in Object.entries(props.info)"
      :key="title"
      class="detail__item">
      <div class="detail__item__title">
        {{ title }}
      </div>
      <div class="detail__item__content">
        <template v-if="title === 'Ratings'">
          <div
            v-for="rating in ratings"
            :key="rating.Source"
            class="detail__item__content__ratings">
            {{ rating.Source }} : {{ rating.Value }}
          </div>
        </template>
        <template v-else>
          {{ content }}
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  &__item {
    border-bottom: 1px solid #ffffff;
    padding: 12px 0px;
    &__title {
      font-weight: 700;
      line-height: 30px;
      margin-bottom: 5px;
    }
    &__content {
      line-height: 20px;
      font-size: 14px;
    }
  }
}
</style>
