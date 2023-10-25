// /** @type {import('prettier').Config */

module.exports = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
  ],
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
