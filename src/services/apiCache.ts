import { storage } from './storage';
import { Doctor } from '../features/consultation/types';
import { Product } from '../features/shop/types';
import { HealthRecord } from '../features/health-records/types';
import { MOCK_DOCTORS } from '../utils/mockDoctors';
import { MOCK_PRODUCTS } from '../utils/mockProducts';
import { MOCK_HEALTH_RECORDS } from '../utils/mockHealthRecords';

export interface CacheEnvelope<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export const API_CACHE_KEYS = {
  DOCTORS: 'api_cache_doctors',
  PRODUCTS: 'api_cache_products',
  HEALTH_RECORDS: 'api_cache_health_records',
} as const;

const DEFAULT_TTL_MS = 1000 * 60 * 60; // 1 hour TTL

/**
 * Generic Cache Wrapper
 * 1. Checks if MMKV has a valid cache entry.
 * 2. If online, executes fetcher and refreshes cache.
 * 3. If offline or fetcher fails, gracefully returns cached data or fallback seed data.
 */
export const fetchWithCache = async <T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  fallbackData: T,
  ttlMs: number = DEFAULT_TTL_MS,
  isOnline: boolean = true
): Promise<{ data: T; isFromCache: boolean }> => {
  const cachedRaw = storage.getString(cacheKey);
  let cachedEnvelope: CacheEnvelope<T> | null = null;

  if (cachedRaw) {
    try {
      cachedEnvelope = JSON.parse(cachedRaw);
    } catch (e) {
      console.warn(`Failed to parse cache for key ${cacheKey}`, e);
    }
  }

  // If offline, immediately return cached data if available, otherwise fallback seed
  if (!isOnline) {
    if (cachedEnvelope?.data) {
      return { data: cachedEnvelope.data, isFromCache: true };
    }
    return { data: fallbackData, isFromCache: true };
  }

  try {
    const freshData = await fetcher();
    const now = Date.now();
    const newEnvelope: CacheEnvelope<T> = {
      data: freshData,
      timestamp: now,
      expiresAt: now + ttlMs,
    };
    storage.set(cacheKey, JSON.stringify(newEnvelope));
    return { data: freshData, isFromCache: false };
  } catch {
    // Network or server error -> fallback to cache seamlessly
    if (cachedEnvelope?.data) {
      return { data: cachedEnvelope.data, isFromCache: true };
    }
    return { data: fallbackData, isFromCache: true };
  }
};

/**
 * Cached API Call for Doctors
 */
export const getCachedDoctors = async (
  isOnline: boolean = true
): Promise<{ data: Doctor[]; isFromCache: boolean }> => {
  return fetchWithCache<Doctor[]>(
    API_CACHE_KEYS.DOCTORS,
    async () => {
      // Simulating API network latency in online mode
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 50));
      return MOCK_DOCTORS;
    },
    MOCK_DOCTORS,
    DEFAULT_TTL_MS,
    isOnline
  );
};

/**
 * Cached API Call for Ayurvedic Products
 */
export const getCachedProducts = async (
  isOnline: boolean = true
): Promise<{ data: Product[]; isFromCache: boolean }> => {
  return fetchWithCache<Product[]>(
    API_CACHE_KEYS.PRODUCTS,
    async () => {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 50));
      return MOCK_PRODUCTS;
    },
    MOCK_PRODUCTS,
    DEFAULT_TTL_MS,
    isOnline
  );
};

/**
 * Cached API Call for Patient Health Records
 */
export const getCachedHealthRecords = async (
  isOnline: boolean = true
): Promise<{ data: HealthRecord[]; isFromCache: boolean }> => {
  return fetchWithCache<HealthRecord[]>(
    API_CACHE_KEYS.HEALTH_RECORDS,
    async () => {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 50));
      return MOCK_HEALTH_RECORDS;
    },
    MOCK_HEALTH_RECORDS,
    DEFAULT_TTL_MS,
    isOnline
  );
};

/**
 * Invalidate Cache Helper
 */
export const invalidateApiCache = (key?: string): void => {
  if (key) {
    storage.remove(key);
  } else {
    storage.remove(API_CACHE_KEYS.DOCTORS);
    storage.remove(API_CACHE_KEYS.PRODUCTS);
    storage.remove(API_CACHE_KEYS.HEALTH_RECORDS);
  }
};
