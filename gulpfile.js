const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const chalk = require('chalk');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const strip = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

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

gulp.task('lint', function() {
    return gulp.src([
        '**/*.js',
        '!dist/**/*.js',
        '!node_modules/**/*.js',
        '!karma.conf.js',
        '!tmp/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function() {
    gulp.watch([
        '**/*.js',
        '!dist/**/*.js',
        '!node_modules/**/*.js',
        '!tmp/**/*.js'
    ], ['jshint', 'bundle']);
});

gulp.task('default', ['lint', 'watch']);
