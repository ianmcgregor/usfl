(function() {

    'use strict';

    var tests = [];
    for (var file in window.__karma__.files) {
      if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.spec\.js$/.test(file)) {
          tests.push(file);
        }
      }
    }

    console.log('num tests:', tests.length);

    requirejs.config({

        // Karma serves files from '/base'
        baseUrl: '/base/js',

        paths: {
            'signals': 'vendors/js-signals/dist/signals'
        },

        shim: {
            
        },

        // ask Require.js to load these files (all our tests)
        deps: tests,

        // start test run, once Require.js is done
        callback: window.__karma__.start
    });

}());