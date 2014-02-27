module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [
				'Gruntfile.js',
				'js/**/*.js',
				'test/**/*.js',
				'!js/vendors/**/*.js'
			],
			options: {
				'node': true,
				'browser': true,
				'es5': false,
				'esnext': true,
				'bitwise': true,
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
				'smarttabs': false,
				'white': false,
				'laxcomma': true,
				'expr': true,

				'predef': [
					'define',
					'requirejs',
					'describe',
					'it',
					'assert',
					'expect',
					'beforeEach',
					'afterEach',
					'FB',
					'ga'
				]
			}
		}
	});
	
	// npm
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint']);
};
