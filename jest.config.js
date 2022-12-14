module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ["js", "json"],
  coverageReporters: ["json-summary", "text", "lcov"],
  testSequencer: "./jest.sequencer.js",
  testMatch: ["**/__tests__/**/*.(spec|test).js?(x)"],
};
