module.exports = {
  testEnvironment: 'jsdom',  
  // Simulates a browser environment for React

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  
  // Runs jest.setup.js before tests (loads testing helpers)

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },  
  //  Mocks CSS files (so tests don't break on imports)

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },  
  // ↑ Converts JSX to JavaScript before running tests
};