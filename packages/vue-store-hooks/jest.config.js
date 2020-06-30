module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  testRegex: 'src(/tests/|/.*/tests/).*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./config/test/setup.ts'],
  coverageDirectory: './coverage/',
  collectCoverage: false,
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', 'src/tests/**/*.{js,ts,tsx}'],
};
