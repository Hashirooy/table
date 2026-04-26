import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      boundaries,
    },

    settings: {
      'import/resolver': {
        typescript: { project: ['./tsconfig.app.json', './tsconfig.node.json'] },
        node: true,
      },
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'app', pattern: 'src/app/**' },
      ],
    },

    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared', 'entities'] },
            { from: 'features', allow: ['shared', 'entities', 'features'] },
            { from: 'widgets', allow: ['shared', 'entities', 'features', 'widgets'] },
            { from: 'pages', allow: ['shared', 'entities', 'features', 'widgets', 'pages'] },
            { from: 'app', allow: ['*'] },
          ],
        },
      ],
    },
  },
]
