'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var smap = require('gulp-sourcemaps');
var ugly = require('gulp-uglify');
var pump = require('pump');
var paths;

paths = {
  sass: 'development/sass/**/*.scss',
  scripts: 'development/js/app.js',
  html: 'development/index.html',
  images: 'build/images/*',
  buildStyles: 'build/css',
  buildScripts: 'build/js',
  buildHtml: 'build',
  buildImages: 'build/images'
}

gulp.task('sass', function() {
  pump([
    gulp.src(paths.sass),
    sass().on('error', sass.logError),
    gulp.dest(paths.buildStyles)
  ]);
});

gulp.task('uglifyjs', function() {
  pump([
    gulp.src(paths.scripts),
    ugly(),
    gulp.dest(paths.buildScripts)
  ]);
});

gulp.task('htmlify', function() {
  pump([
    gulp.src(paths.html),
    gulp.dest(paths.buildHtml)
  ]);
});

gulp.task('images', function() {
  pump([
    gulp.src(paths.images),
    gulp.dest(paths.buildImages)
  ]);
});

// Watch Tasks Setup

gulp.task('sass:watch', function() {
  pump([
    gulp.watch(paths.sass, ['sass'])
  ]);
});

gulp.task('js:watch', function() {
  pump([
    gulp.watch(paths.scripts, ['uglifyjs'])
  ]);
});

gulp.task('html:watch', function() {
  pump([
    gulp.watch(paths.html, ['htmlify'])
  ]);
});

gulp.task('images:watch', function() {
  pump([
    gulp.watch(paths.images, ['images'])
  ]);
});

// Default task groups

gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch', 'images:watch']);

gulp.task('default', ['sass', 'uglifyjs', 'htmlify', 'images']);
