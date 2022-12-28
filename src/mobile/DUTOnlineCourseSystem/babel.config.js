module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@services": "./src/services",
        },
      },
    ],
    // "react-native-reanimated/plugin",
  ],
};
