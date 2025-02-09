<script setup lang="ts">
export interface Props {
  adaptive?: boolean;
}

const props = defineProps<Props>();

const cssClasses = computed(() => ({
  'base-divider--adaptive': props.adaptive
}));
</script>

<template>
  <div class="base-divider" :class="cssClasses"></div>
</template>

<style>
@import 'divider';
</style>
