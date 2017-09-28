(function(fn) {
    if (typeof window === 'undefined') {
        return;
    }

    window.console = window.console || {};
    const methods = [
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
    methods.forEach((name) => {
        window.console[name] = window.console[name] || fn;
    });
}(function() {}));
