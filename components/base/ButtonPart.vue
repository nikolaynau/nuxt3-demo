<script setup lang="ts">
export interface Props {
  text?: string;
}

defineProps<Props>();
</script>

<template>
  <span v-if="$slots.icon" class="base-button__icon theme-icon-gradient">
    <slot name="icon"></slot>
  </span>
  <span v-if="text || $slots.default" class="base-button__text">
    <template v-if="text">{{ text }}</template>
    <slot v-else></slot>
  </span>
</template>
