const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  ...expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules/*", ".expo/*", "dist/*", "web-build/*", ".idea/*"],
  },
  {
    rules: {
      "prettier/prettier": "warn",
    },
  },
];
