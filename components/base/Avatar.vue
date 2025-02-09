<script setup lang="ts">
export interface Props {
  src?: string;
  srcset?: string;
  alt?: string;
  lazy?: boolean;
  size?: 'sm';
  adaptive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  src: undefined,
  srcset: undefined,
  alt: undefined,
  size: undefined
});

const error = ref(false);

const cssClasses = computed(() => ({
  'base-avatar--adaptive': props.adaptive,
  'base-avatar--error': error.value,
  'base-avatar--sm': props.size === 'sm'
}));

function onError() {
  error.value = true;
}

watch(
  () => [toValue(props.src), toValue(props.srcset)],
  () => {
    error.value = false;
  }
);
</script>

<template>
  <div class="base-avatar base-gradient-border" :class="cssClasses">
    <div class="base-avatar__wrap">
      <img
        v-if="src || srcset"
        class="base-avatar__img"
        :alt="alt"
        :src="src"
        :srcset="srcset"
        :loading="lazy ? 'lazy' : undefined"
        @error="onError"
      />
    </div>
  </div>
</template>

<style>
@import 'avatar';
</style>
