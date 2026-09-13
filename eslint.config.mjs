import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'blob-report/', 'dist/'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      // Fixtures requested for their setup side effect (e.g. `_standardUser`)
      // stay in the destructuring pattern even when the value is unused.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
