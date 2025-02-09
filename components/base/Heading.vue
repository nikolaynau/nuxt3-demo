<script setup lang="ts">
export interface Props {
  level?: number;
  line?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1
});

const tag = computed(() => `h${props.level}`);

const cssClasses = computed(() => ({
  [`base-heading--l${props.level}`]: true,
  'base-heading--line': props.line
}));
</script>

<template>
  <div class="base-heading" :class="cssClasses">
    <component :is="tag" class="base-heading__text">
      <slot></slot>
    </component>
    <p v-if="$slots.subtext" class="base-heading__subtext">
      <slot name="subtext"></slot>
    </p>
  </div>
</template>

<style>
@import 'heading';
</style>
