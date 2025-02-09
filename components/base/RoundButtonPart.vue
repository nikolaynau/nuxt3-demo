<template>
  <span
    v-if="$slots.default"
    class="theme-icon-gradient base-round-button__icon"
  >
    <slot></slot>
  </span>
</template>
