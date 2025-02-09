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

const formattedValue = useValueFormat(props.value, props.format);

const cssClasses = computed(() => ({
  [`anim-number--${props.side}`]: true
}));
</script>

<template>
  <span class="anim-number" :class="cssClasses">
    <span class="anim-number--origin-value">
      {{ formattedValue }}
    </span>
  </span>
</template>

<style>
@import 'number';
</style>
