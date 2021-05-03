module.exports = {
  plugins: ['stylelint-scss', 'stylelint-order'], // stylelint-scss を使う
  extends: [
    'stylelint-config-standard', //ベースの設定ファイル
    'stylelint-prettier/recommended', // prettier-stylelintのconfigファイルを読み込み
  ],
  rules: {
    'order/properties-alphabetical-order': true, //ABC順に並べる
    'at-rule-no-unknown': null, //scssで使える @include などにエラーがでないようにする
    'scss/at-rule-no-unknown': true, //scssでもサポートしていない @ルール にはエラーを出す
    'block-no-empty': true // 空セレクタを禁止
    // .prettierrc.jsの内容を上書きしたい時は rules から可能
    //   'prettier/prettier': [true, { 'singleQuote': false, 'useTabs': true }],
  }
};