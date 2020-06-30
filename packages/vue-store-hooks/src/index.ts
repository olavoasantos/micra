import { ValueState, State, Compare } from '@micra/store-hooks';
import { onMounted, onUnmounted, ref } from "@vue/composition-api";

export const useStore = <T = any, U = T>(
  store: ValueState<T>,
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
) => {
  const state = useStoreValue(store, selector, compare);

  return [state, store.set.bind(store)];
};

export const createStoreHook = <T = any>(store: ValueState) => <U = T>(
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
) => useStore(store);

export const useStoreValue = <T = any, U = T>(
  store: State<T>,
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
) => {
  let unsubscribe: () => void;
  const state = ref(store.value);

  onMounted(() => {
    unsubscribe = store.subscribe<U>(
      (newValue) => {
        state.value = newValue as any;
      },
      selector,
      compare,
    );
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return state;
};
