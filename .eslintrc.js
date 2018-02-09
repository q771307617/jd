module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // js语句结尾必须使用 ;
    'semi': ['error', 'always'],
    // 函数名后 不跟空格
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }
    ],
    // 代码中允许试用 debugger
    'no-debugger': 1
  },
  globals: {}
}
