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
    '^(.*):(.*)$': '$1_$2',
  },
};
