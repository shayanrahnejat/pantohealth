module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
