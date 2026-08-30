module.exports = {
  preset: '@react-native/jest-preset',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@shopify/flash-list|react-native-size-matters|react-native-vector-icons|react-native-mmkv)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
