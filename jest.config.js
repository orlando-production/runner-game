module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/configs/jest/testing-library',
    'jest-canvas-mock'
  ],
  testMatch: ['**/spec/**/*.spec.ts(x)?'],
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.css$': 'identity-obj-proxy'
  }
};
