'use strict';

var ready;
if (document.addEventListener) {
    ready = function(fn, context) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            fn.call(context || this);
        }
        else {
            document.addEventListener('DOMContentLoaded', function() {
                fn.call(context || this);
            });
        }
    };
}
else {
    ready = function(fn, context) {
        if (document.readyState === 'interactive') {
            fn.call(context || this);
        }
        document.attachEvent('onreadystatechange', function(){
            if (document.readyState === 'interactive') {
                fn.call(context || this);
            }
        });
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ready;
}
