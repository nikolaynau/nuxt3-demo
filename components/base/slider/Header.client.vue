<script setup lang="ts">
import type { Swiper } from 'swiper/types';
import type { RoundButtonEffect } from '../RoundButton.vue';

export interface Props {
  swiper?: Swiper;
  caption?: string;
  navigation?: boolean;
  buttonEffect?: RoundButtonEffect;
}

const props = withDefaults(defineProps<Props>(), {
  swiper: undefined,
  caption: undefined,
  navigation: true,
  buttonEffect: undefined
});

const swiper = toRef(props, 'swiper');
const prevDisabled = ref(true);
const nextDisabled = ref(true);
const isLocked = ref(false);

const cssClasses = computed(() => ({
  'base-slider-header--locked': isLocked.value
}));

function update() {
  const instance = swiper.value;
  if (!instance) {
    return;
  }
  if (instance.params.loop) {
    prevDisabled.value = false;
    nextDisabled.value = false;
    return;
  }

  prevDisabled.value = instance.isBeginning && !instance.params.rewind;
  nextDisabled.value = instance.isEnd && !instance.params.rewind;

  if (instance.params.watchOverflow && (instance as any).enabled) {
    isLocked.value = instance.isLocked;
  }
}

function onPrevClick() {
  const instance = swiper.value;
  if (!instance) {
    return;
  }
  if (
    instance.isBeginning &&
    !instance.params.loop &&
    !instance.params.rewind
  ) {
    return;
  }
  instance.slidePrev();
}

function onNextClick() {
  const instance = swiper.value;
  if (!instance) {
    return;
  }
  if (instance.isEnd && !instance.params.loop && !instance.params.rewind) {
    return;
  }
  instance.slideNext();
}

function onSwiperDisable() {
  isLocked.value = true;
}

function bindEvents(swiper: Swiper) {
  swiper.on('toEdge', update);
  swiper.on('fromEdge', update);
  swiper.on('lock', update);
  swiper.on('unlock', update);
  (swiper as any).on('enable', update);
  (swiper as any).on('disable', onSwiperDisable);
}

function unbindEvents(swiper: Swiper) {
  swiper.off('toEdge', update);
  swiper.off('fromEdge', update);
  swiper.off('lock', update);
  swiper.off('unlock', update);
  (swiper as any).off('enable', update);
  (swiper as any).off('disable', onSwiperDisable);
}

watch(
  swiper,
  (newVal, oldVal) => {
    if (oldVal) {
      unbindEvents(oldVal);
    }
    if (newVal) {
      bindEvents(newVal);
      update();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (swiper.value) {
    unbindEvents(swiper.value);
  }
});
</script>

<template>
  <div class="base-slider-header" :class="cssClasses">
    <div class="base-slider-header__caption">
      {{ caption }}
    </div>
    <div v-if="navigation" class="base-slider-header__nav">
      <BaseRoundButton
        :effect="buttonEffect"
        :disabled="prevDisabled"
        @click.prevent="onPrevClick"
      >
        <IconArrowLeft />
      </BaseRoundButton>
      <BaseRoundButton
        :effect="buttonEffect"
        :disabled="nextDisabled"
        @click.prevent="onNextClick"
      >
        <IconArrowRight />
      </BaseRoundButton>
    </div>
  </div>
</template>

<style>
@import 'header';
</style>
