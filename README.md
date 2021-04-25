# ボイラーテンプレート
scssとejsを使える開発環境のボイラーテンプレート。
ホットリロード対応。
画像圧縮対応。

## 今回やったこと
- package.json生成（`npm init -y`）
- 必要なパッケージのインストール
- gulpでタスクを作る

## 使用パッケージ
```
// @importをまとめる
npm i -D gulp-sass-glob
// コンパイル後のEJSの拡張子を任意のものに変更する
npm i -D gulp-rename
// ブラウザのホットリロード
npm i -D browser-sync
// エラーによる強制終了防止
npm i -D gulp-plumber
// エラー時にデスクトップ通知
npm i -D gulp-notify
```

## めも
- autoprefixerを使用する時は、package.jsonにbrowserlistの記入が必要
- gulp-ejsはあるバージョンからコンパイル後の拡張子が変換されなくなったのでgulp-renameと併用する
- エラー時に強制終了しないために、plumberを導入。notifyのデスクトップ通知でエラー検知しやすくなる


## 参考
- https://ics.media/entry/3290/
- https://qiita.com/tonkotsuboy_com/items/67d9fd4d054a45af9f34
- https://yumegori.com/gulp4-setting20191025#chapter-14