import { defaultWindow, type MaybeElementRef } from '@vueuse/core';

export interface Use3DEffectOptions {
  constrain?: MaybeRefOrGetter<number | null | undefined>;
}

export function use3DEffect(
  element?: MaybeElementRef,
  options: Use3DEffectOptions = {}
) {
  const { constrain } = options;

  const angleX = ref<string>(deg(0));
  const angleY = ref<string>(deg(0));

  if (typeof window === 'undefined') {
    return { angleX, angleY };
  }

  const isElement = computed(() => !!toValue(element));
  const _constrain = computed(() => {
    const val = toValue(constrain);
    if (typeof val === 'number' && val > 0) {
      return val;
    }
    return 1;
  });
  const mouseTarget = computed(() =>
    visible.value && isElement.value ? defaultWindow : undefined
  );

  const visible = useElementVisibility(element);
  const { elementX, elementY, elementHeight, elementWidth, isOutside } =
    useMouseInElement(element, {
      target: mouseTarget,
      touch: false,
      scroll: false
    });

  watch([elementX, elementY, _constrain], () => {
    if (visible.value && !isOutside.value) {
      const halfWidth = elementWidth.value / 2;
      const halfHeight = elementHeight.value / 2;
      angleX.value = deg(-(elementY.value - halfHeight) / _constrain.value);
      angleY.value = deg((elementX.value - halfWidth) / _constrain.value);
    }
  });

  watch(visible, () => {
    if (!visible.value) {
      angleX.value = deg(0);
      angleY.value = deg(0);
    }
  });

  function deg(value: number): string {
    return `${value}deg`;
  }

  return { angleX, angleY };
}
