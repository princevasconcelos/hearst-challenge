module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/setupMockFiles.ts',
        '.css$': 'identity-obj-proxy',
    }
};