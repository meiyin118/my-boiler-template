module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
    },
    env: {
        browser: true, // document や console にエラーが出ないようにする
        es6: true, // es6から使える let や const にエラーがでないようにする
        jquery: true,
    },
    extends: ['plugin:prettier/recommended'],
};
