import { createMMKV, MMKV } from 'react-native-mmkv';

export const storage: MMKV = createMMKV();

export const StorageKeys = {
  SEARCH_HISTORY: 'search_history',
  CART: 'cart_items',
};

export const getSearchHistory = (): string[] => {
  try {
    const raw = storage.getString(StorageKeys.SEARCH_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const addSearchHistoryItem = (query: string): string[] => {
  const trimmed = query.trim();
  if (!trimmed) return getSearchHistory();
  const current = getSearchHistory().filter(
    (item) => item.toLowerCase() !== trimmed.toLowerCase()
  );
  const updated = [trimmed, ...current].slice(0, 8);
  try {
    storage.set(StorageKeys.SEARCH_HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.warn('MMKV save error', e);
  }
  return updated;
};

export const removeSearchHistoryItem = (query: string): string[] => {
  const current = getSearchHistory().filter(
    (item) => item.toLowerCase() !== query.toLowerCase()
  );
  try {
    storage.set(StorageKeys.SEARCH_HISTORY, JSON.stringify(current));
  } catch (e) {
    console.warn('MMKV save error', e);
  }
  return current;
};

export const clearSearchHistory = (): void => {
  try {
    storage.remove(StorageKeys.SEARCH_HISTORY);
  } catch (e) {
    console.warn('MMKV clear error', e);
  }
};
