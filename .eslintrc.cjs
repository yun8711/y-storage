module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    sourceType: 'module',
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
  }
}