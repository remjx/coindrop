module.exports = {
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/tests/**',
      '!**/coverage/**',
      '!jest.config.js',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    moduleNameMapper: {
      '\\.(scss|css|less)$': '<rootDir>/__mocks__/styleMock.js',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFiles: [
      '<rootDir>/src/tests/setup.js',
    ],
    testMatch: [
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
      '/.next/',
      '/node_modules/',
      '/tests/',
      '/coverage/',
      'src/firebase/firestore/__tests/firestore-rules.test.ts',
    ],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
      '<rootDir>/src/tests/setupAfterEnv.js',
    ],
};
