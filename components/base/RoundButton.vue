<script setup lang="ts">
export type RoundButtonEffect = 'hover' | 'fill' | 'glow' | 'none';

export interface Props {
  size?: 'sm' | 'md' | 'lg';
  effect?: RoundButtonEffect;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  effect: 'hover'
});

const isGlow = computed(() => !props.disabled && props.effect === 'glow');
const isHover = computed(() => !props.disabled && props.effect === 'hover');

const cssClasses = computed(() => ({
  [`base-round-button--${props.size}`]: true,
  'base-round-button--disabled': props.disabled,
  'base-round-button--glow': isGlow.value,
  'base-hover': isHover.value || props.effect === 'fill',
  'base-hover--active': !props.disabled && props.effect === 'fill'
}));

const overlayClasses = computed(() => ({
  [`base-round-button--${props.size}`]: true
}));
</script>

<template>
  <button
    type="button"
    class="base-round-button base-gradient-border"
    :disabled="disabled"
    :class="cssClasses"
  >
    <BaseRoundButtonPart>
      <template v-if="$slots.default" #default>
        <slot></slot>
      </template>
    </BaseRoundButtonPart>
    <EffectGlow v-if="isGlow" size="xs">
      <div
        class="base-round-button base-hover base-hover--active"
        :class="overlayClasses"
      >
        <BaseRoundButtonPart>
          <template v-if="$slots.default" #default>
            <slot></slot>
          </template>
        </BaseRoundButtonPart>
      </div>
    </EffectGlow>
  </button>
</template>

<style>
@import 'round-button';
</style>
