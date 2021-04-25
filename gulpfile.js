// gulpプラグインの読み込み
const {src,dest,watch,lastRun,parallel} = require("gulp");
// コンパイルするプラグインの読み込み
const sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      glob = require("gulp-sass-glob"),
      ejs = require("gulp-ejs"),
      rename = require('gulp-rename'),
      browserSync = require("browser-sync"),
      plumber = require("gulp-plumber"),
      notify = require("gulp-notify");
      imagemin = require("gulp-imagemin"),
      pngquant = require("imagemin-pngquant"),
      mozjpeg = require("imagemin-mozjpeg");

//読み込むパスと出力するパスを指定
const srcPath = {
  html: {
    src: ["src/ejs/**/*.ejs", "!" + "src/ejs/**/_*.ejs"],
    dist: "dist/"
  },
  css: {
    src: "src/scss/**/*.scss",
    dist: "dist/css/"
  },
  js: {
    src: "src/js/**/*.js",
    dist: "dist/js/"
  },
  images: {
    src: "src/img/**/*.{jpg,jpeg,png,gif,svg}",
    dist: "dist/img/"
  }
};

/**
 * 画像圧縮の定義
 */
const imagesBase = [
  pngquant({
    quality: [0.7, 0.85]
  }),
  mozjpeg({
    quality: 85
  }),
  imagemin.gifsicle(),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo({
    plugins: [
      { removeViewBox: false },
      { removeMetadata: false },
      { removeUnknownsAndDefaults: false },
      { convertShapeToPath: false },
      { collapseGroups: false },
      { cleanupIDs: false }
    ]
  })
];

/**
 * 画像の処理自動化
 */
const compileImg = () => {
  return src(srcPath.images.src, { since: lastRun(compileImg) })
    .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
    .pipe(imagemin(imagesBase))
    .pipe(dest(srcPath.images.dist))
    .pipe(browserSync.reload({ stream: true }));
};

/**
 * Sassをコンパイルするタスク
 */
const compileSass = () =>
  src(srcPath.css.src)
  .pipe(
    plumber({
      errorHandler: notify.onError("Error: <%= error.message %>"),
      title: 'scss error'
    })
  )
  .pipe(glob())
  .pipe(sass({outputStyle:"expanded"})).on("error", sass.logError)
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(dest(srcPath.css.dist))
  .pipe(browserSync.reload({ stream: true }));

/**
 * EJSをコンパイルするタスク
 */
const compileEJS = () => 
  src(srcPath.html.src)
  .pipe(
    plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    })
  )
  .pipe(ejs())
  .pipe(rename({ extname: '.html' }))
  .pipe(dest(srcPath.html.dist) )
  .pipe(browserSync.reload({ stream: true }));

/**
 * 監視タスク
 * 変更があったら変換する
 */
const watchFiles = () => {
  watch(srcPath.css.src,compileSass);
  watch(srcPath.html.src,compileEJS);
  watch(srcPath.images.src, compileImg);
}

/**
 * ブラウザをホットリロード
 */
const browserSyncFunc = () => {
  browserSync({
    server: {
      baseDir: "./dist",
      index: "index.html"
    },
    reloadOnRestart: true
  });
};

// npx gulpコマンド実行時にwatchSassが実行されるようにする
exports.default = parallel(watchFiles, browserSyncFunc);