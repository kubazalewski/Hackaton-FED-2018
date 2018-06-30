'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nunjacksRender = require('gulp-nunjucks-render');
// var sourcemaps = require('gulp-sourcemaps')

gulp.task('img', function () {
  gulp.src('./app/img/**/*')
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('sass', function () {
  gulp.src('./app/scss/styles.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
});


gulp.task('js', function(){
   gulp.src(['app/js/*'])
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('nunjucks', function() {
    return gulp.src(['app/components/*.html'])
    .pipe(nunjacksRender({
    path: ['app/components']
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['img', 'sass', 'nunjucks', 'js'], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("app/img/**/*", ['img']);
    // gulp.watch("app/fonts/**/*", ['fonts']);
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/components/**/*.html", ['nunjucks']);
    gulp.watch("app/js/*.js", ['js']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
    gulp.watch("dist/img/**/*").on('change', browserSync.reload);
    // gulp.watch("dist/fonts/**/*").on('change', browserSync.reload);
});

gulp.task('default', ['build']);