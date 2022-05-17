module.exports = {
    root: true,
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        '@react-native-community',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
    ],
    'rules': {
        'react/prop-types' : [0],
        'prettier/prettier': [0],
        'import/no-unresolved': [0],
        'import/extensions': [0],
    },
};
