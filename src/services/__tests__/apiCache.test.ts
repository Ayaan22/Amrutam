import {
  fetchWithCache,
  getCachedDoctors,
  getCachedProducts,
  getCachedHealthRecords,
  invalidateApiCache,
  API_CACHE_KEYS,
} from '../apiCache';
import { storage } from '../storage';

describe('API Cache Service Unit Tests', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('should fetch fresh data, store in cache, and return isFromCache: false when online', async () => {
    const fetcher = jest.fn().mockResolvedValue(['item1', 'item2']);
    const result = await fetchWithCache('test_key', fetcher, ['fallback'], 60000, true);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual(['item1', 'item2']);
    expect(result.isFromCache).toBe(false);

    // Verify MMKV has the serialized envelope
    const raw = storage.getString('test_key');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.data).toEqual(['item1', 'item2']);
  });

  it('should return cached data and NOT call fetcher when offline', async () => {
    // Prime the cache
    storage.set(
      'test_offline_key',
      JSON.stringify({ data: ['cached1'], timestamp: Date.now(), expiresAt: Date.now() + 60000 })
    );

    const fetcher = jest.fn().mockResolvedValue(['fresh1']);
    const result = await fetchWithCache(
      'test_offline_key',
      fetcher,
      ['fallback'],
      60000,
      false // offline
    );

    expect(fetcher).not.toHaveBeenCalled();
    expect(result.data).toEqual(['cached1']);
    expect(result.isFromCache).toBe(true);
  });

  it('should fallback to default seed data when offline and cache is empty', async () => {
    const fetcher = jest.fn();
    const result = await fetchWithCache(
      'empty_key',
      fetcher,
      ['fallback_seed'],
      60000,
      false // offline
    );

    expect(fetcher).not.toHaveBeenCalled();
    expect(result.data).toEqual(['fallback_seed']);
    expect(result.isFromCache).toBe(true);
  });

  it('should retrieve cached doctors successfully', async () => {
    const result = await getCachedDoctors(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.isFromCache).toBe(false);

    // Subsequent offline read
    const offlineResult = await getCachedDoctors(false);
    expect(offlineResult.data.length).toBe(result.data.length);
    expect(offlineResult.isFromCache).toBe(true);
  });

  it('should retrieve cached products successfully', async () => {
    const result = await getCachedProducts(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.isFromCache).toBe(false);
  });

  it('should retrieve cached health records successfully', async () => {
    const result = await getCachedHealthRecords(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.isFromCache).toBe(false);
  });

  it('should invalidate cache entries correctly', async () => {
    await getCachedDoctors(true);
    expect(storage.getString(API_CACHE_KEYS.DOCTORS)).not.toBeNull();

    invalidateApiCache(API_CACHE_KEYS.DOCTORS);
    expect(storage.getString(API_CACHE_KEYS.DOCTORS)).toBeNull();
  });
});
