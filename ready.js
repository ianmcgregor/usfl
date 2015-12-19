'use strict';

var ready;
if (document.addEventListener) {
    ready = function(fn, context) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            fn.call(context);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                fn.call(context);
            });
        }
    };
} else {
    ready = function(fn, context) {
        if (document.readyState === 'interactive') {
            fn.call(context);
        }
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'interactive') {
                fn.call(context);
            }
        });
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ready;
}
