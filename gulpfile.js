'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

//log
function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

gulp.task('bundle', function() {
    return browserify({
            entries: './index.js',
            standalone: 'usfl',
            debug: true
        })
        .bundle()
        .on('error', logError)
        .pipe(source('usfl.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/'))
        .pipe(strip())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jshint', function() {
    return gulp.src([
            '**/*.js',
            '!dist/**/*.js',
            '!node_modules/**/*.js',
            '!tmp/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch([
            '**/*.js',
            '!dist/**/*.js',
            '!node_modules/**/*.js',
            '!tmp/**/*.js'
        ], ['jshint', 'bundle']);
});

gulp.task('default', ['jshint', 'watch']);
