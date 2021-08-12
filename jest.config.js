module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ["regenerator-runtime/runtime"],
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
