<script setup lang="ts">
export interface Props {
  modelValue?: string;
  id?: string;
  backButton?: boolean;
  clearButton?: boolean;
}

export type Emits = {
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', value: string | undefined): void;
  (e: 'back'): void;
  (e: 'clear'): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  id: 'base-search-bar'
});

const emit = defineEmits<Emits>();

const focused = ref(false);
const model = useVModel(props, 'modelValue', emit);
const input = ref<HTMLInputElement | null>(null);

function onSubmit() {
  emit('submit', model.value);
}

function onBack() {
  emit('back');
}

function onClear() {
  model.value = '';
  emit('clear');
}

defineExpose({
  input
});
</script>

<template>
  <form
    class="base-search-bar base-gradient-border"
    :class="{ 'base-search-bar--focused': focused }"
    @submit.prevent="onSubmit"
  >
    <button
      v-if="backButton"
      class="base-search-bar__back-button"
      type="button"
      @click.prevent="onBack"
    >
      <IconBack class="base-icon-gradient" />
    </button>
    <label v-else :for="`${id}-input`" class="base-search-bar__icon">
      <IconSearch class="base-icon-gradient" />
    </label>
    <input
      :id="`${id}-input`"
      ref="input"
      v-model="model"
      class="base-search-bar__input"
      type="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      enterkeyhint="go"
      spellcheck="false"
      maxlength="64"
      v-bind="$attrs"
      @focusin="focused = true"
      @focusout="focused = false"
    />
    <button
      v-if="clearButton && model"
      class="base-search-bar__clear-button"
      type="button"
      @click.prevent="onClear"
    >
      <IconXmark class="base-icon-gradient" />
    </button>
  </form>
</template>

<style>
@import 'search-bar';
</style>
