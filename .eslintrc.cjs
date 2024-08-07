/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    // parser: 'babel-eslint'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'space-before-function-paren': ['error', 'never'],
     //在rules中添加自定义规则
     //关闭组件命名规则
    "jsx": false, // 关闭JSX语法支持
    'vue/multi-word-component-names': 'off',
    "prefer-const": "off",
  }
}
