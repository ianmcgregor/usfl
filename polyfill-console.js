'use strict';

(function(fn) {
    window.console = window.console || {};
    var methods = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'memory',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'timeline',
        'timelineEnd',
        'trace',
        'warn'
    ];
    var methodName;
    for (var i = 0; i < methods.length; i++) {
        methodName = methods[i];
        window.console[methodName] = window.console[methodName] || fn;
    }
}(function() {}));
