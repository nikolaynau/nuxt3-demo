<script setup lang="ts">
import type { GlowSize } from '~/components/effect/Glow.client.vue';

export type Variant =
  | 'default'
  | 'success'
  | 'danger'
  | 'info'
  | 'illum'
  | 'lucid'
  | 'accent';

export type Effect = 'glow';

export interface Props {
  variant?: Variant;
  light?: boolean;
  clip?: boolean;
  clipContent?: boolean;
  alt?: boolean;
  adaptiveAlt?: boolean;
  backdrop?: boolean;
  noPadding?: boolean;
  effect?: Effect;
  glowSize?: GlowSize;
  glowBorder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  backdrop: true,
  effect: undefined,
  glowSize: undefined
});

const isGlow = computed(() => props.effect === 'glow');

const cssClasses = computed(() => ({
  [`base-card--${props.variant}`]: true,
  'base-card--alt': props.alt,
  'base-card--adaptive-alt': props.adaptiveAlt,
  'base-card--clip': props.clip,
  'base-card--clip-content': props.clipContent,
  'base-card--backdrop': props.backdrop,
  'base-card--no-padding': props.noPadding,
  'base-card--glow': isGlow.value,
  'base-card--glow-border': isGlow.value && props.glowBorder
}));
</script>

<template>
  <div class="base-card" :class="cssClasses">
    <div class="base-card__wrap base-gradient-border">
      <slot></slot>
    </div>
    <div v-if="light" class="base-card__light"></div>
    <EffectGlow v-if="isGlow" :size="glowSize">
      <div class="base-card__overlay base-gradient-border"></div>
    </EffectGlow>
  </div>
</template>

<style>
@import 'card';
</style>
