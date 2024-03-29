/*
 * Documentation for the Jest configuration (used by this file) at
 * https://jestjs.io/docs/en/configuration.html and
 * https://www.gatsbyjs.org/docs/unit-testing/
 */

/**
 * Configures all `.ts` files to be tested with the `ts-jest` library instead of
 * the regular `jest` library.
 */
const transform = {
  '^.+\\.ts$': 'ts-jest',
};

/**
 * Regular expression that instructs Jest to consider all files that end with
 * `.test.ts` as Jest tests:
 */
const testRegex = 'packages/.*\\.test\\.ts';

/**
 * Folders to ignore when running Jest
 */
const testPathIgnorePatterns = ['node_modules', '.history', '__snapshots__'];

/**
 * Configuration file to pass to Jest
 */
const config = {
  transform,
  testRegex,
  testPathIgnorePatterns,
};

module.exports = config;
