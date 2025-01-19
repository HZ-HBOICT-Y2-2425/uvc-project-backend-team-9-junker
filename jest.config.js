module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/coverage/**"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  coverageReporters: ["text", "lcov"],
  moduleFileExtensions: ["js", "json"],
  setupFiles: ["<rootDir>/jest.setup.js"],
};