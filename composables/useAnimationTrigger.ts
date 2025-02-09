export interface UseAnimationTriggerOptions {
  enabled?: MaybeRefOrGetter<boolean>;
  onceOnVisible?: MaybeRefOrGetter<boolean>;
  visibilityElement?: MaybeRefOrGetter<HTMLElement | null | undefined>;
  trigger?: MaybeRefOrGetter<boolean>;
}

export function useAnimationTrigger(options: UseAnimationTriggerOptions = {}) {
  const {
    enabled = false,
    onceOnVisible = false,
    visibilityElement,
    trigger = false
  } = options;

  const _enabled = toRef(enabled);
  const _onceOnVisible = toRef(onceOnVisible);
  const _visibilityElement = toRef(visibilityElement);
  const _trigger = toRef(trigger);

  const target = computed(() =>
    _enabled.value && _onceOnVisible.value ? _visibilityElement.value : null
  );
  const isVisible = useOnceElementVisibility(target);

  return computed(() => {
    if (!_enabled.value) {
      return false;
    }
    if (_onceOnVisible.value) {
      return isVisible.value;
    }
    return _trigger.value;
  });
}
