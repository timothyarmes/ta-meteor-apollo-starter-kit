module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/tests/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  modulePaths: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/mocks/',
    '<rootDir>/node_modules/jest-meteor-stubs/lib/',
  ],
  roots: [
    '<rootDir>/app/',
    '<rootDir>/tests/',
  ],
  moduleNameMapper: {
    '^imports/(.*)': '<rootDir>/app/',
    '^(.*):(.*)$': '$1_$2',
  },
  unmockedModulePathPatterns: [
    '/^imports\\/.*\\.jsx?$/',
    '/^client\\/.*\\.jsx?$/',
    '/^server\\/.*\\.jsx?$/',
    '/^node_modules/',
  ],
};
