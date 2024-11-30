module.exports = {
  presets: ['react-native', 'module:metro-react-native-babel-preset'],

  transformIgnorePatterns: [
    'node_modules/(?!@react-native|@testing-library/react-native)/',
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  clearMocks: true,
  verbose: true,
};
