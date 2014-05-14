var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-debug'),
	 browserify = require('gulp-browserify'),
	jshint = require('gulp-jshint');


// build

gulp.task('build', function() {
    // Single entry point to browserify
    gulp.src('public/js/main.js')
        .pipe(browserify({
          insertGlobals : false,
          debug : true, //!gulp.env.production
          /*,
          shim: {
            libName: {
                path: '',
                exports: ''
            }
          }*/
        }).on('prebundle', function(bundler) {
        	// create aliases relative to the entry point js file
			bundler.require('./vendor/js-signals/dist/signals.js', { expose: 'signals' });
			bundler.require('./vendor/lodash/dist/lodash.js', { expose: 'lodash' });
			//bundler.require('./vendor/js-lib/js/.js', { expose: 'lodash' });
		}))
        .pipe(rename({suffix: '.min'}))
        //.pipe(strip())
        //.pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

// release

gulp.task('release', function() {
    gulp.src('public/js/main.js')
        .pipe(browserify({
          insertGlobals : false,
          debug : false,
          /*,
          shim: {
            libName: {
                path: '',
                exports: ''
            }
          }*/
        }).on('prebundle', function(bundler) {
        	// create aliases relative to the entry point js file
			bundler.require('./vendor/js-signals/dist/signals.js', { expose: 'signals' });
			bundler.require('./vendor/lodash/dist/lodash.js', { expose: 'lodash' });
		}))
        .pipe(rename({suffix: '.min'}))
        .pipe(strip())
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

// watch

gulp.task('watch', function() {
	gulp.watch('public/js/app/**/*.js', ['build']);
	gulp.watch('public/js/main.js', ['build']);
});

// jshint

gulp.task('jshint', function() {
  return gulp.src(['public/js/**/*.js', '!public/js/vendor/**/*.js', '!public/js/lib/**/*.js', '!public/js/main.min.js'])
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
	        'define',
	        'Modernizr',
	        'requirejs',
	        'ga'
	    ]
	}))
    .pipe(jshint.reporter('jshint-stylish'));
});

// default

gulp.task('default', ['connect', 'watch']);