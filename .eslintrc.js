// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2020: true,
        jest: true
    },
    parser: '@babel/eslint-parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'airbnb'
        // 'plugin:import/typescript'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            ecmaFeatures: {
                jsx: true,
                modules: true,
                experimentalObjectRestSpread: true
            }
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        'react',
        // 'react-hooks', // TODO
        'prettier'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'comma-dangle': [2, 'never'],
        semi: [2, 'never'],
        'max-len': ['error', 200, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'max-classes-per-file': ['error', 2], // TODO 1
        'max-depth': ['off', 4],
        'no-param-reassign': 'off',
        'global-require': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id', '__v', '__t', '_source'] }], // allow use of '_id' property
        'no-use-before-define': ['error', { functions: true, classes: false, variables: false }],
        'jsx-quotes': [2, 'prefer-single'],
        'newline-before-return': 2,
        'react/jsx-indent': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/no-access-state-in-setstate': 'off', // TODO remove
        'react/no-children-prop': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 'off', // TODO remove
        'react/state-in-constructor': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react/jsx-closing-bracket-location': [2, { selfClosing: 'after-props' }],
        'react/button-has-type': 'off',
        'object-curly-newline': ['error', {
            ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
            ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
            ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
            ExportDeclaration: { minProperties: 4, multiline: true, consistent: true }
        }],

        'react/prop-types': 'off', // TODO will open when use typescript
        'react/display-name': 'off',
        'prettier/prettier': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before'
                    },
                    {
                        pattern: '*.(png|webp|css)',
                        group: 'sibling',
                        patternOptions: { matchBase: true },
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },
        react: {
            version: 'detect'
        }
    }
}
