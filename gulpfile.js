/* jshint strict: false */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    strip = require('gulp-strip-debug'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    glob = require('glob');

// paths and file names
var src = './src',
    dist = './dist',
    test = './test',
    jsSrc = src+'/',
    jsIndex = 'index.js',
    jsDist = dist,
    jsBundle = 'bundle.js',
    vendors = './vendors/';

// alias libs to short names
var alias = {
  //signals: vendors+'js-signals/dist/signals.js'
};

// build test bundle
gulp.task('bundle-tests', function() {
    var testFiles = glob.sync(test+'/**/*.js');
    var bundleStream = browserify(testFiles).bundle({debug: true});
    return bundleStream
        .pipe(clean())
        //.pipe(source('bundle-tests.js'))
        .pipe(rename('bundle-tests.js'))
        .pipe(gulp.dest(test));
});

// build bundled js using browserify
function buildJS(debug) {
  var bundler = browserify(jsSrc+jsIndex);
  // alias libs to short names
  for(var key in alias) {
    bundler.require(alias[key], { expose: key });
  }
  var bundleStream = bundler.bundle({ debug: debug });
  bundleStream
    .pipe(source(jsSrc+jsIndex))
    .pipe(gulpIf(!debug, streamify(strip())))
    .pipe(streamify(uglify())) 
    //.pipe(rename({suffix: '.min'}))
    .pipe(rename(jsBundle))
    .pipe(gulp.dest(jsDist));
}
gulp.task('js-bundle', function() {
  buildJS(true);
});
gulp.task('js-bundle-release', function() {
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
          'FB'
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
