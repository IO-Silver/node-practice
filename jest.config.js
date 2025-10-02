module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./setupTests.js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};