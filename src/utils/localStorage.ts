export function loadState<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (raw) {
    try { return JSON.parse(raw) as T; } catch { return null; }
  }
  return null;
}

export function saveState<T>(key: string, state: T): void {
  localStorage.setItem(key, JSON.stringify(state));
}