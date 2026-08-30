/* eslint-env jest */

// Mock react-native-bootsplash
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

// Mock react-native-mmkv
const mockStorageMap = new Map();

const mockMMKVInstance = {
  getString: jest.fn((key) => mockStorageMap.get(key) || null),
  set: jest.fn((key, value) => mockStorageMap.set(key, value)),
  remove: jest.fn((key) => mockStorageMap.delete(key)),
  delete: jest.fn((key) => mockStorageMap.delete(key)),
  clearAll: jest.fn(() => mockStorageMap.clear()),
};

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => mockMMKVInstance),
  MMKV: jest.fn().mockImplementation(() => mockMMKVInstance),
}));

// Mock @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn((callback) => {
    callback({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });
    return jest.fn();
  }),
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi',
  }),
  useNetInfo: jest.fn().mockReturnValue({
    isConnected: true,
    isInternetReachable: true,
  }),
}));
