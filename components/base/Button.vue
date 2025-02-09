<script setup lang="ts">
import { NuxtLinkLocale } from '#components';

export type ButtonEffect = 'hover' | 'fill' | 'glow' | 'none';

export interface Props {
  tag?: string;
  link?: boolean;
  external?: boolean;
  to?: string | Record<string, unknown>;
  text?: string;
  textSize?: 'sm';
  variant?: 'normal' | 'light' | 'secondary';
  disabled?: boolean;
  effect?: ButtonEffect;
}

const props = withDefaults(defineProps<Props>(), {
  tag: undefined,
  to: undefined,
  href: undefined,
  text: undefined,
  textSize: undefined,
  variant: 'normal',
  effect: 'hover'
});

const href = computed(() =>
  typeof props.to === 'string' ? props.to : undefined
);

const tag = computed(() => {
  if (props.tag) return props.tag;
  if (props.link && props.external) return 'a';
  if (props.link) return NuxtLinkLocale;
  return 'button';
});

const isGlow = computed(() => !props.disabled && props.effect === 'glow');

const cssClasses = computed(() => ({
  [`base-button--${props.variant}`]: true,
  'base-hover':
    !props.disabled && (props.effect === 'hover' || props.effect === 'fill'),
  'base-hover--active': !props.disabled && props.effect === 'fill',
  'base-button--glow': isGlow.value,
  'base-button--text-sm': props.textSize === 'sm',
  'base-button--disabled': props.disabled
}));

const overlayClasses = computed(() => ({
  [`base-button--${props.variant}`]: true
}));
</script>

<template>
  <component
    :is="tag"
    :href="link && external ? href : undefined"
    :to="link && !external ? to : undefined"
    :type="!link && !external ? 'button' : undefined"
    :no-prefetch="link && !external ? true : undefined"
    class="base-button base-gradient-border"
    :class="cssClasses"
  >
    <BaseButtonPart :text="text">
      <template v-if="$slots.icon" #icon>
        <slot name="icon"></slot>
      </template>
      <template v-if="$slots.default" #default>
        <slot></slot>
      </template>
    </BaseButtonPart>
    <EffectGlow v-if="isGlow">
      <div
        class="base-button base-hover base-hover--active"
        :class="overlayClasses"
      >
        <BaseButtonPart :text="text">
          <template v-if="$slots.icon" #icon>
            <slot name="icon"></slot>
          </template>
          <template v-if="$slots.default" #default>
            <slot></slot>
          </template>
        </BaseButtonPart>
      </div>
    </EffectGlow>
  </component>
</template>

<style>
@import 'button';
</style>
