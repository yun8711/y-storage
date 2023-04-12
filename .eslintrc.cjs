module.exports = {
  "root": true,
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
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "rules": {
    // "no-console": "warn",
    // "@typescript-eslint/array-type": [
    //   "error",
    //   {
    //     "default": "generic"
    //   }
    // ]
  }
}