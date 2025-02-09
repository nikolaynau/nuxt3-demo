<script setup lang="ts">
import { defaultWindow } from '@vueuse/core';

export type GlowSize = 'md' | 'sm' | 'xs';

export interface Props {
  size?: GlowSize;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
});

const overlay = ref<HTMLElement | null>(null);
const visible = useElementVisibility(overlay);
const mouseTarget = computed(() => (visible.value ? defaultWindow : undefined));
const { elementX, elementY } = useMouseInElement(overlay, {
  target: mouseTarget,
  touch: false,
  scroll: false
});

const cssClasses = computed(() => ({
  [`effect-glow--${props.size}`]: true
}));

function update(x: number, y: number): void {
  const el = overlay.value;
  el?.style.setProperty('--vc-x', `${x}px`);
  el?.style.setProperty('--vc-y', `${y}px`);
}

function reset(): void {
  const el = overlay.value;
  el?.style.removeProperty('--vc-x');
  el?.style.removeProperty('--vc-y');
}

watch([elementX, elementY], () => {
  if (visible.value) {
    update(elementX.value, elementY.value);
  }
});

watch(visible, () => {
  if (!visible.value) {
    reset();
  }
});
</script>

<template>
  <div ref="overlay" class="effect-glow" :class="cssClasses">
    <slot></slot>
  </div>
</template>

<style>
@import 'glow';
</style>
