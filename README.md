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
```

## メモ
- autoprefixerを使用する時は、package.jsonにbrowserlistの記入が必要
- gulp-ejsはあるバージョンからコンパイル後の拡張子が変換されなくなったのでgulp-renameと併用する
- エラー時に強制終了しないために、plumberを導入。notifyのデスクトップ通知でエラー検知しやすくなる
- dart-sassへの切り替えには、`sass`と`fibers`が必要

## 参考
- https://ics.media/entry/3290/
- https://qiita.com/tonkotsuboy_com/items/67d9fd4d054a45af9f34
- https://yumegori.com/gulp4-setting20191025#chapter-14
- https://labor.ewigleere.net/2020/11/09/scss_transfer_libsass_dartsass/