module.exports = function(config) {
    config.set({

        basePath: '',

        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],

        frameworks: [
            'mocha',
            'chai',
            'browserify'
        ],

        files: [
            'dist/usfl.js',
            'test/**/*.spec.js'
        ],

        exclude: [
            'test/bundle-nodejs.spec.js'
        ],

        preprocessors: {'test/**/*.js': ['browserify']},

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        /* possible values:
        config.LOG_DISABLE
        config.LOG_ERROR
        config.LOG_WARN
        config.LOG_INFO
        config.LOG_DEBUG*/
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: [
        //'iOS',
            'Chrome',
            'Firefox'
        //,'IE11 - Win7'
        //,'IE10 - Win7'
        ],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
