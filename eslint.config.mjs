import { fixupConfigRules } from '@eslint/compat'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'eslint-config-prettier',
    ),
  ),
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/prettierrc.cjs',
      '**/.eslintrc.js',
      '**/vite.config.ts',
      '**/env.d.ts',
    ],
  },

  {
    plugins: {
      tanstackQuery,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      'import/no-unresolved': [
        'error',
        {
          ignore: ['^geojson'],
        },
      ],
    },
  },
]
