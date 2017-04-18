var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var concat = require('gulp-concat')
var source = require('vinyl-source-stream');
var bundle = require('gulp-bundle-assets');
var bulk = require('bulk-require');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');

var files = {
  css: {
    src: 'src/scss/*.scss',
    dist: 'dist/css/'
  },
  fonts: {
    src: 'src/fonts/*',
    dist: 'dist/fonts/'
  },
  images: {
    src: 'src/img/*',
    dist: 'dist/img/'
  },
  foundationJs: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/what-input/dist/what-input.js',
      'node_modules/foundation-sites/dist/js/foundation.min.js',
      'src/vendor/js/*.js'
    ],
    dist: 'dist/js/'
  },
  appJs: {
    src: 'src/js/app.js',
    dist: 'dist/js/'
  }
}

// Static Server + watching scss/html files
gulp.task('serve', ['fonts', 'images', 'sass', 'foundation-scripts', 'app-scripts'], () => {
    browserSync.init({
        server: './'
    });
    gulp.watch(files.css.src, ['sass']);
    gulp.watch(files.images.src, ['images']);
    gulp.watch(files.fonts.src, ['fonts']);
    gulp.watch('src/js/*.js', ['script-watch']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src(files.fonts.src)
    .pipe(gulp.dest(files.fonts.dist))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', () => {
  return gulp.src(files.images.src)
    .pipe(
      imagemin(
        {
            progressive: true,
            use: [pngquant(), jpegtran()]
        }
      )
    )
    .pipe(gulp.dest(files.images.dist))
    .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src(files.css.src)
    .pipe(sass())
    .pipe(gulp.dest(files.css.dist))
    .pipe(browserSync.stream());
});

gulp.task('foundation-scripts', () => {
  return gulp.src(files.foundationJs.src)
    .pipe(concat('foundation-scripts.js'))
    .pipe(gulp.dest(files.foundationJs.dist));
});

gulp.task('app-scripts', () => {
  return browserify(files.appJs.src)
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('app.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(files.appJs.dist));
});

gulp.task('script-watch', ['foundation-scripts', 'app-scripts'], (done) => {
  browserSync.reload();
  done();
});


gulp.task('default', ['serve']);
