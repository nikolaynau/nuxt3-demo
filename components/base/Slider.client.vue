<script setup lang="ts" generic="T">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SwiperOptions, Swiper as SwiperClass } from 'swiper/types';
import type { RoundButtonEffect } from './RoundButton.vue';

export interface Props<T> {
  caption?: string;
  navigation?: boolean;
  navButtonEffect?: RoundButtonEffect;
  items?: T[];
  clip?: boolean;
  spaceBetween?: number;
  slidesPerView?: 'auto' | number;
  spaceBetweenLg?: number;
  slidesPerViewLg?: 'auto' | number;
}

export type Emits = {
  (e: 'click', index: number): void;
};

const props = withDefaults(defineProps<Props<T>>(), {
  caption: undefined,
  navigation: true,
  navButtonEffect: undefined,
  items: () => [],
  spaceBetween: 24,
  slidesPerView: 'auto',
  spaceBetweenLg: 25,
  slidesPerViewLg: 3
});

const emit = defineEmits<Emits>();

const breakpoints = computed<SwiperOptions['breakpoints']>(() => ({
  [breakpointsTailwindEx['3xl']]: {
    spaceBetween: props.spaceBetweenLg,
    slidesPerView: props.slidesPerViewLg
  }
}));

const swiper = ref<SwiperClass | undefined>(undefined);

const cssClasses = computed(() => ({
  'base-slider--clip': props.clip
}));

function onSwiper(instance: SwiperClass) {
  swiper.value = instance;
}

function onClick(instance: SwiperClass) {
  emit('click', instance.clickedIndex);
}

onUnmounted(() => {
  swiper.value = undefined;
});
</script>

<template>
  <div class="base-slider" :class="cssClasses">
    <div class="base-slider__header">
      <BaseSliderHeader
        :caption="caption"
        :button-effect="navButtonEffect"
        :navigation="navigation"
        :swiper="swiper"
      />
    </div>
    <Swiper
      class="base-slider__slider"
      :initial-slide="0"
      :space-between="spaceBetween"
      :slides-per-view="slidesPerView"
      :breakpoints="breakpoints"
      round-lengths
      @swiper="onSwiper"
      @click="onClick"
    >
      <SwiperSlide v-for="(item, i) in items" :key="i">
        <slot :item="item" :index="i"></slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>
@import 'slider';
</style>
