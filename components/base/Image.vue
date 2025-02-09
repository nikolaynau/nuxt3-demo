<script setup lang="ts">
export interface Props {
  src?: string | null;
  lazy?: boolean;
  alt?: string;
  loaded?: boolean;
}

export type Emits = {
  (e: 'update:loaded', value: boolean): void;
};

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: ''
});

const emit = defineEmits<Emits>();

const src = toRef(props, 'src');
const img = ref<HTMLImageElement | null>(null);
const loadedModel = useVModel(props, 'loaded', emit);
const resultSrc = useReplaceThemeVar(src) as ComputedRef<string | undefined>;
const { loaded: loadedState } = useLoadImageState(img, {
  watch: resultSrc,
  watchOptions: { flush: 'sync' }
});

syncRef(loadedState, loadedModel, { direction: 'ltr' });

const cssClasses = computed(() => ({
  'base-image--loading': !loadedState.value,
  'base-image--loaded': loadedState.value,
  'base-image--no-src': !src.value
}));
</script>

<template>
  <img
    ref="img"
    class="base-image"
    :class="cssClasses"
    :alt="alt"
    :loading="lazy ? 'lazy' : undefined"
    :src="resultSrc"
  />
</template>
