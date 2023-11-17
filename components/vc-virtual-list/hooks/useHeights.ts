import type { VNodeProps, Ref, ShallowRef } from 'vue';
import { watch, ref } from 'vue';
import type { GetKey } from '../interface';

export type CacheMap = Map<any, number>;

export default function useHeights<T>(
  mergedData: ShallowRef<any[]>,
  getKey: GetKey<T>,
  onItemAdd?: ((item: T) => void) | null,
  onItemRemove?: ((item: T) => void) | null,
): [(item: T, instance: HTMLElement) => void, () => void, CacheMap, Ref<symbol>] {
  const instance = new Map<VNodeProps['key'], HTMLElement>();
  const heights = new Map();
  const updatedMark = ref(Symbol('update'));
  watch(mergedData, () => {
    updatedMark.value = Symbol('update');
  });
  let heightUpdateId = 0;
  function collectHeight() {
    heightUpdateId += 1;
    const currentId = heightUpdateId;
    Promise.resolve().then(() => )
  }
}
