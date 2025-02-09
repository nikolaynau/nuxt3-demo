<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';

export interface Props {
  visible?: boolean;
  closeOnClick?: boolean;
  variant?: 'light' | 'medium';
}

export type Emits = {
  (e: 'update:visible', value: boolean): void;
  (e: 'click', value: MouseEvent): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  closeOnClick: true,
  variant: undefined
});

const emit = defineEmits<Emits>();

const model = useVModel(props, 'visible', emit);
const isScrollLock = useScrollLock(document.body, false);
const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndLarger = breakpoints.greaterOrEqual('md');

const cssClasses = computed(() => ({
  'backdrop--light': props.variant === 'light',
  'backdrop--medium': props.variant === 'medium'
}));

function onClick(e: MouseEvent) {
  if (props.closeOnClick) {
    model.value = false;
  }

  emit('click', e);
}

watch(
  [model, mdAndLarger],
  () => {
    isScrollLock.value = model.value && !mdAndLarger.value;
  },
  { immediate: true }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop-fade">
      <div
        v-if="model"
        class="backdrop"
        :class="cssClasses"
        v-bind="$attrs"
        @click="onClick"
      ></div>
    </Transition>
  </Teleport>
</template>

<style>
@import 'backdrop';
</style>
