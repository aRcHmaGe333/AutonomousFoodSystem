module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: "latest"
  },
  ignorePatterns: ["node_modules/", "coverage/", ".jest-cache/"],
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off"
  }
};

