module.exports = {
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/tests/**',
      '!**/coverage/**',
      '!jest.config.js',
    ],
    testMatch: [
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/coverage/',
      '/lib/',
    ],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
};
