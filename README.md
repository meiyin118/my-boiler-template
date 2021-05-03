# ボイラーテンプレート
scssとejsを使える開発環境のボイラーテンプレート。
- dart-sass対応
- ホットリロード対応
- 画像圧縮対応
- JSのトランスパイル対応

## テンプレート使用方法
```
# 起動
npx gulp
もしくは
npm run start
```

## 今回やったこと
- package.json生成（`npm init -y`）
- 必要なパッケージのインストール
- gulpでタスクを作る

## 他に設定すること
### ESLint
  - プラグインをインストール
  - 設定の`ESLint:Enable`をチェックする
  - 設定の`JavaScript › Format: Enable`のチェックを外す
    - `ESLint` + `Prettier`を使用するため`VSCode`の標準フォーマッターをオフにする
  - `setting.json`に以下を設定
  ```
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  }
  ```
  - `.eslintrc.js`に設定を記入
### stylelint
  - `stylelint-plus`プラグインをインストール
  - 設定の`stylelint:Enable`にチェックを入れる
  - 設定の`Stylelint: Auto Fix On Save`にチェックを入れる
  - `.stylelintrc.js`に設定を記入


## 使用パッケージ
```
# scssを使う
npm i -D gulp-sass
# lib-sassからdart-sassにするために必要
npm i -D sass fibers
# @importをまとめる
npm i -D gulp-sass-glob
# Autoprefix
npm i -D autoprefixer

# EJSを使う
npm i -D gulp-ejs
# コンパイル後のEJSの拡張子を任意のものに変更する
npm i -D gulp-rename

# JavaScriptのトランスパイル用
npm i -D gulp-babel @babel/core @babel/preset-env

# 画像圧縮
npm i -D gulp-imagemin imagemin-mozjpeg imagemin-pngquant

# ブラウザのホットリロード
npm i -D browser-sync

# エラーによる強制終了防止
npm i -D gulp-plumber
# エラー時にデスクトップ通知
npm i -D gulp-notify

# コードフォーマッター
npm i -D prettier
# 構文チェック（JS）
npm i -D eslint
# ESLintとPrettierを連携させる
npm i -D eslint-plugin-prettier eslint-config-prettier
# 構文チェック（css）
npm i -D stylelint
# stylelintとPrettierを連携させる
npm i -D stylelint-prettier stylelint-config-prettier
# StylelintをSCSSに対応させる
npm i -D stylelint-scss
# スタンダードな設定を使う
npm i -D stylelint-config-standard
# プロパティの並び順を揃える
npm i -D stylelint-order
```

## メモ
- `autoprefixer`を使用する時は、`package.json`に`browserlist`の記入が必要
- `gulp-ejs`はあるバージョンからコンパイル後の拡張子が変換されなくなったので`gulp-rename`と併用する
- エラー時に強制終了しないよう、`plumber`を導入。`notify`のデスクトップ通知でエラー検知しやすくなる
- `dart-sass`への切り替えには、`sass`と`fibers`が必要
- `eslint-plugin-prettier`は`ESLint`上で`Prettier`を動かすためのプラグイン。
- `eslint-config-prettier`は`ESLint`と`Prettier`で競合するルールを無効にするための構成ファイル。
- 通常の`Stylelint`だけでは`SCSS`に対応していないので、`@include`などにエラーが出てしまう。これを回避するには、`stylelint-scss`というパッケージを使う。

## 参考
- https://ics.media/entry/3290/
- https://qiita.com/tonkotsuboy_com/items/67d9fd4d054a45af9f34
- https://yumegori.com/gulp4-setting20191025#chapter-14
- https://labor.ewigleere.net/2020/11/09/scss_transfer_libsass_dartsass/
- https://wemo.tech/3307