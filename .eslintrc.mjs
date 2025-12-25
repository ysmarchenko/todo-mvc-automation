import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    { files: ['/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [
            '/node_modules',
            '/test-results/',
            'playwright-report/',
            'tests/sandbox.test.ts',
            'utils/gmailAuth.util.ts',
            'utils/slack-nnotification.util.ts',
            'test-data/marketplace/hoteliersData.ts',
            '/sandbox.test.ts',
            '**/.HARs',
        ],
    },
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'script',
        },
        rules: {
            // Disable the problematic rule
            '@typescript-eslint/no-unused-expressions': 'off',
            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true,
                },
            ],
            eqeqeq: 'error',
            'linebreak-style': 0,
            'max-len': [
                'error',
                {
                    code: 151,
                },
            ],
            'no-console': 'error',
            'no-debugger': 'error',
            'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
            'no-tabs': [
                'error',
                {
                    allowIndentationTabs: true,
                },
            ],
            'object-curly-spacing': ['error', 'always'],
            quotes: [
                2,
                'single',
                {
                    avoidEscape: true,
                },
            ],
            semi: ['error', 'always'],
        },
    },
];