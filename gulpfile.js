'use strict';

var gulp = require('gulp');

var sass       = require('gulp-sass');
var watch      = require('gulp-watch');
var uglify     = require('gulp-uglify');
var rename     = require("gulp-rename");
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');



gulp.task('sass', function () {
  return gulp.src('./website/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('website/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch("website/sass/**", ['sass']);
});

gulp.task('compress:js', function(){
  return gulp.src('website/js/bundle.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min', basename: "bundle" }))
    .pipe(gulp.dest('website/js/'));
})

gulp.task('compress:css', function (){
  return gulp.src('website/css/main.css')
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min', basename: "main" }))
    .pipe(gulp.dest('website/css/'));
})

gulp.task('concat-js', function() {
  return gulp.src('website/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('website/js/'));
});

gulp.task('watch', function () {
  gulp.watch("website/js/**/*.js", ['concat-js']);
  gulp.watch("website/js/**/*.js", ['compress:js']);
});

gulp.task('watch-css', function () {
  gulp.watch("website/css/main.css", ['compress:css']);
});

gulp.task('default', ['watch', 'watch-css', "sass:watch"]);
