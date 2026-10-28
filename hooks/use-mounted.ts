import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns false during server render and hydration, then true once mounted on the client.
 * Safe replacement for the `useEffect(() => setMounted(true), [])` pattern.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
