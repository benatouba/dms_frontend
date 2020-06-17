module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 5,
        sourceType: "module",
        ecmaFeatures: {
            "jsx": false
        }
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        quotes: [ "warn", "single" ],
        semi: "off",
        strict: 'off',
    },
    overrides: [
        {
            // for testing with mocha
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                "mocha": true
            }
        }
    ]
}
