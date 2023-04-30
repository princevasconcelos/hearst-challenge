module.exports = {
    testEnvironment: "jsdom",
    preset: 'ts-jest',
    roots: ["<rootDir>/src"],
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/setupMockFiles.ts',
        '.css$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    coverageReporters: ['json-summary', 'html', 'text', 'text-summary', 'clover', 'lcov', 'cobertura'],
    reporters: ['default', 'jest-junit'],
    collectCoverageFrom: [
        'src/components/**',
        'src/features/**',
        'src/pages/**',
        'src/services/**',
    ],
    testPathIgnorePatterns: [
        '__tests__',
    ],
};
