module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier', 'stylelint-config-recommended-vue'],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  overrides: [
    { files: ['*.html', '**/*.html'], customSyntax: 'postcss-html' },
    { files: ['**/*.{less,css}'], customSyntax: 'postcss-less' },
  ],
  rules: {
    'selector-class-pattern': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['plugin'] }],
    'rule-empty-line-before': ['always', { except: ['after-single-line-comment', 'first-nested'] }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep'] }],
  },
};
