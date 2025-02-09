<script setup lang="ts">
export interface Source {
  srcSet: string;
  media?: string;
}

export interface Props {
  source?: Source | Source[];
}

const props = defineProps<Props>();
const sources = computed(() =>
  Array.isArray(props.source)
    ? props.source
    : props.source
      ? [props.source]
      : []
);
const srcSet = useReplaceThemeVar(
  computed(() => sources.value.map(item => item.srcSet))
) as ComputedRef<string[]>;
</script>

<template>
  <picture>
    <source
      v-for="(item, i) in sources"
      :key="i"
      :media="item.media"
      :srcset="srcSet[i]"
    />
    <slot></slot>
  </picture>
</template>
