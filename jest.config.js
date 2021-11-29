module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/configs/jest/testing-library'
  ],
  testMatch: ['**/spec/**/*.spec.ts(x)?'],
  roots: [
    '<rootDir>/src/'
  ],
  modulePaths: [
    '<rootDir>',
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy'
  }
};
