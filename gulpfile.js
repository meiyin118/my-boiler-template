// gulpプラグインの読み込み
const {src,dest,watch,lastRun,parallel} = require("gulp");
// コンパイルするプラグインの読み込み
const sass = require("gulp-sass"),
      Fiber = require("fibers"),
      autoprefixer = require("gulp-autoprefixer"),
      glob = require("gulp-sass-glob"),
      ejs = require("gulp-ejs"),
      rename = require('gulp-rename'),
      browserSync = require("browser-sync"),
      plumber = require("gulp-plumber"),
      notify = require("gulp-notify");
      imagemin = require("gulp-imagemin"),
      pngquant = require("imagemin-pngquant"),
      mozjpeg = require("imagemin-mozjpeg"),
      babel = require("gulp-babel"); 
      sass.compiler = require('sass');

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
    .pipe(notify({
      title: 'imagemin',
      message: 'image file compressed!'
    }))  
    .pipe(browserSync.reload({ stream: true }));
};

/**
 * Sassをコンパイルするタスク
 */
const compileSass = () =>
  src(srcPath.css.src)
  .pipe(
    plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    })
  )
  .pipe(glob())
  .pipe(sass({fiber:Fiber,outputStyle:"expanded"})).on("error", sass.logError)
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(dest(srcPath.css.dist))
  .pipe(notify({
    title: 'gulp-sass',
    message: 'sass file compiled!'
  }))
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
  .pipe(dest(srcPath.html.dist))
  .pipe(notify({
    title: 'gulp-ejs',
    message: 'EJS file compiled!'
  }))
  .pipe(browserSync.reload({ stream: true }));

/**
 * JSのトランスパイル
 */
const compileJS = () => {
  return (
    src(srcPath.js.src, { sourcemaps: true })
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(
        babel({
          presets: ["@babel/env"]
        })
      )
      .pipe(dest(srcPath.js.dist))
      .pipe(notify({
        title: 'babel',
        message: 'js file compiled!'
      }))    
      .pipe(browserSync.reload({ stream: true }))
  );
};

/**
 * 監視タスク
 * 変更があったら変換する
 */
const watchFiles = () => {
  watch(srcPath.css.src,compileSass);
  watch(srcPath.html.src,compileEJS);
  watch(srcPath.js.src, compileJS);
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