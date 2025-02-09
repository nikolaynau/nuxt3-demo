export interface UseTweenNumberOptions {
  initialValue?: number;
  duration?: number;
  onComplete?: () => void;
}

export function useTweenNumber(
  value: MaybeRefOrGetter<number>,
  options: UseTweenNumberOptions = {}
) {
  const { initialValue = 0, duration, onComplete } = options;

  const animatedValue = ref(initialValue);
  const _value = toRef(value);
  let playback: { stop(): void } | null = null;

  const { popmotion, ready } = usePopmotion();

  function start() {
    const pm = popmotion.value;
    if (!pm || playback) {
      return;
    }

    playback = pm.animate({
      from: initialValue,
      to: _value.value,
      ease: pm.easeInOut,
      duration,
      onUpdate,
      onComplete
    });
  }

  function stop() {
    playback?.stop();
    playback = null;
  }

  function onUpdate(latest: number) {
    animatedValue.value = latest;
  }

  onUnmounted(() => {
    stop();
  });

  return { animatedValue, ready, start, stop };
}
