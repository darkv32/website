import { useMemo, useSyncExternalStore } from 'react';

/* The steps a visitor has ticked off live in localStorage, read through a tiny external store so the server render (nothing ticked) matches the first client render. */
const KEY = 'card-holder-steps-v1';
const listeners = new Set<() => void>();
let memory = '';

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) onChange();
  };
  addEventListener('storage', onStorage);
  return () => {
    listeners.delete(onChange);
    removeEventListener('storage', onStorage);
  };
}

function read() {
  try {
    return memory || localStorage.getItem(KEY) || '';
  } catch {
    return memory;
  }
}

function write(steps: number[]) {
  memory = JSON.stringify(steps);
  try {
    localStorage.setItem(KEY, memory);
  } catch {
    /* private window: the ticks last until the page closes */
  }
  listeners.forEach((fn) => fn());
}

function parse(raw: string): Set<number> {
  if (!raw) return new Set();
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) return new Set(value.filter((n): n is number => Number.isInteger(n)));
  } catch {
    /* fall through to nothing ticked */
  }
  return new Set();
}

export function useDoneSteps(): ReadonlySet<number> {
  const raw = useSyncExternalStore(subscribe, read, () => '');
  return useMemo(() => parse(raw), [raw]);
}

export function toggleStep(n: number) {
  const current = parse(read());
  if (!current.delete(n)) current.add(n);
  write([...current].sort((a, b) => a - b));
}

export function clearSteps() {
  write([]);
}
