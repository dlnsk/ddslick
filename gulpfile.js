/* eslint-env node */

var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");
var cleanCSS = require('gulp-clean-css');

gulp.task("clean-css", function() {
    return gulp
        .src('src/*.css')
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist"));
});

gulp.task("uglify", ["lint:tdd"], function() {
    return gulp
        .src('src/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist"));
});

gulp.task("lint:tdd", function() {
    return gulp
        .src(__dirname + "/src/jquery.ddslick.js")
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task("lint", function() {
    return gulp
        .src(__dirname + "/src/jquery.ddslick.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("watch", function() {
    gulp.watch(__dirname + "/src/**/*.js", ["uglify"]);
    gulp.watch(__dirname + "/src/**/*.css", ["clean-css"]);
});

gulp.task("build", ["uglify", "clean-css"]);
gulp.task("test", ["lint"]);
gulp.task("default", ["watch"]);
