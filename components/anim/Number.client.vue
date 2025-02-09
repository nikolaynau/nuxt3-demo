<script setup lang="ts">
export interface Props {
  value?: number;
  animate?: boolean;
  duration?: number;
  format?: (value: number) => string;
  side?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  duration: undefined,
  format: undefined,
  side: 'right'
});

const { value, animate, duration, format, side } = toRefs(props);
const { ready, animatedValue, start, stop } = useTweenNumber(value, {
  duration: duration.value
});

const originFormattedValue = useValueFormat(value, format);
const animatedFormattedValue = useValueFormat(animatedValue, format);

const cssClasses = computed(() => ({
  'anim-number--animate': ready.value && animate.value,
  [`anim-number--${side.value}`]: true
}));

watch(
  [ready, animate, value],
  () => {
    if (!ready.value) {
      return;
    }

    if (animate.value) {
      stop();
      start();
    } else {
      stop();
    }
  },
  { immediate: true }
);
</script>

<template>
  <span class="anim-number" :class="cssClasses">
    <span class="anim-number--origin-value">
      {{ originFormattedValue }}
    </span>
    <span v-if="ready" class="anim-number--animated-value">
      {{ animatedFormattedValue }}
    </span>
  </span>
</template>

<style>
@import 'number';
</style>
