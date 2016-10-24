var gulp = require('gulp');
var sass = require('gulp-sass');
var pump = require('pump');
var ugly = require('gulp-uglify');
var smap = require('gulp-sourcemaps');

paths = {
  sass: "./styles/scss/main.scss",
  scripts: "./scripts/main.js",
  styles: "./styles.css",
  output: "./app"
};

gulp.task('sass', function() {
  pump([
    gulp.src(paths.sass),
    smap.init(),
    sass({outputStyle: 'compressed'}).on('error', sass.logError),
    smap.write(),
    gulp.dest(paths.styles)
  ], cb );
});

gulp.task('scripts', function() {
   pump([
     gulp.src(paths.scripts),
     uglify(),
     gulp.dest(paths.output)
   ], cb);
});

gulp.task('default', function() {
  console.log("Gulp run");
});
