/* jshint strict: false */
var gulp = require('gulp'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    strip = require('gulp-strip-debug'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    chalk = require('chalk');

// paths and file names
var src = './src',
    dist = './dist',
    test = './test',
    jsSrc = src+'/',
    jsIndex = 'index.js',
    jsDist = dist,
    jsBundle = 'lib.js',
    vendors = './vendors/';

// alias libs to short names
var alias = {
  //signals: vendors+'js-signals/dist/signals.js'
};

//log
function logError(msg) {
  console.log(chalk.bold.red('[ERROR]'), msg);
}

// build bundled js using browserify
function buildJS(debug) {
  var bundler = browserify(jsSrc+jsIndex);
  // alias libs to short names
  for(var key in alias) {
    bundler.require(alias[key], { expose: key });
  }
  var bundleStream = bundler.bundle({ debug: debug, standalone: 'JSLib' });
  bundleStream
    .on('error', function(err){
      logError(err);
    })
    .pipe(source(jsSrc+jsIndex))
    .pipe(gulpIf(!debug, streamify(strip())))
    .pipe(gulpIf(!debug, streamify(uglify()))) 
    //.pipe(rename({suffix: '.min'}))
    .pipe(rename(jsBundle))
    .pipe(gulp.dest(jsDist));
}
gulp.task('bundle', function() {
  buildJS(true);
});
gulp.task('bundle-release', function() {
  buildJS(false);
});

// js hint - ignore libraries and bundled
gulp.task('jshint', function() {
  return gulp.src([
      './gulpfile.js',
      jsSrc+'/**/*.js',
      '!'+vendors+'**/*.js',
      '!'+jsDist+jsBundle
    ])
    .pipe(jshint({
      'node': true,
      'browser': true,
      'es5': false,
      'esnext': true,
      'bitwise': false,
      'camelcase': false,
      'curly': true,
      'eqeqeq': true,
      'immed': true,
      'latedef': true,
      'newcap': true,
      'noarg': true,
      'quotmark': 'single',
      'regexp': true,
      'undef': true,
      'unused': true,
      'strict': true,
      'trailing': true,

      'predef': [
          'Modernizr',
          'ga',
          'FB',
          'define'
      ]
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-tests', function() {
  return gulp.src([
      test+'/**/*.js'
    ])
    .pipe(jshint({
      'node': true,
      'browser': true,
      'es5': false,
      'esnext': true,
      'bitwise': false,
      'camelcase': false,
      'curly': true,
      'eqeqeq': true,
      'immed': true,
      'latedef': true,
      'newcap': true,
      'noarg': true,
      'quotmark': 'single',
      'regexp': true,
      'undef': true,
      'unused': true,
      'strict': true,
      'trailing': true,
      'expr':true, // stops complaints about 'to.be.true' etc

      'predef': [
          'Modernizr',
          'ga',
          'FB',
          'define',
          'expect',
          'it',
          'beforeEach',
          'afterEach',
          'describe'
      ]
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

// watch
gulp.task('watch', function() {
  gulp.watch(jsSrc+'**/*.js', ['jshint', 'bundle-tests']);
});

// default
gulp.task('default', ['watch']);
