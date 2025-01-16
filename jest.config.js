module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/coverage/**"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node"
};