import {
  defaultWindow,
  type MaybeComputedElementRef,
  type UseElementVisibilityOptions
} from '@vueuse/core';

export interface UseOnceElementVisibilityOptions
  extends UseElementVisibilityOptions {
  threshold?: number;
}

export function useOnceElementVisibility(
  element: MaybeComputedElementRef,
  options: UseOnceElementVisibilityOptions = {}
) {
  const { window = defaultWindow, scrollTarget, threshold = 0 } = options;
  const elementIsVisible = ref(false);

  const { stop } = useIntersectionObserver(
    element,
    ([{ isIntersecting }]) => {
      elementIsVisible.value = isIntersecting;
      if (isIntersecting) {
        stop();
      }
    },
    {
      root: scrollTarget,
      window,
      threshold
    }
  );

  return elementIsVisible;
}
