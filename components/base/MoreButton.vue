<script setup lang="ts">
import { NuxtLinkLocale } from '#components';

export interface Props {
  link?: boolean;
  external?: boolean;
  to?: string | Record<string, unknown>;
  text?: string;
  variant?: 'normal' | 'light';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  text: undefined,
  variant: 'light'
});

const cssClasses = computed(() => ({
  [`base-more-button--${props.variant}`]: true,
  'base-more-button--disabled': props.disabled
}));

const iconClasses = computed(() => ({
  'theme-icon-gradient': props.variant === 'normal',
  'text-icon-gradient': props.variant === 'light'
}));

const textClasses = computed(() => ({
  'base-gradient-text': props.variant === 'normal',
  'theme-text-revert-gradient': props.variant === 'normal'
}));

const href = computed(() =>
  typeof props.to === 'string' ? props.to : undefined
);

const tag = computed(() => {
  if (props.link && props.external) return 'a';
  if (props.link) return NuxtLinkLocale;
  return 'button';
});
</script>

<template>
  <component
    :is="tag"
    :href="link && external ? href : undefined"
    :to="link && !external ? to : undefined"
    :type="!link && !external ? 'button' : undefined"
    :no-prefetch="link && !external ? true : undefined"
    class="base-more-button"
    :class="cssClasses"
  >
    <span class="base-more-button__icon" :class="iconClasses">
      <IconArrowRight />
    </span>
    <span
      v-if="text || $slots.default"
      class="base-more-button__text"
      :class="textClasses"
    >
      <template v-if="text">{{ text }}</template>
      <slot v-else></slot>
    </span>
  </component>
</template>

<style>
@import 'more-button';
</style>
