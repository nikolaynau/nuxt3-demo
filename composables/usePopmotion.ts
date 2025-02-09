import type * as Popmotion from 'popmotion';

export function usePopmotion() {
  const ready = ref(false);
  const popmotion = ref<typeof Popmotion | null>(null);

  async function load() {
    const result = await import('popmotion');
    popmotion.value = markRaw(result) as typeof Popmotion;
    ready.value = true;
  }

  load();

  return {
    ready,
    popmotion
  };
}
