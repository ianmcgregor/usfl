'use strict';

var track = {
    init: function(gaAccount) {
        console.log('Initialize Google Analytics with account Id:', gaAccount);

        /* eslint-disable */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /* eslint-enable */

        window.ga('create', gaAccount, 'auto');
        window.ga('send', 'pageview');
    },
    page: function(value) {
        console.log('track.page:', value);
        window.ga('send', {
            'hitType': 'pageview',
            'page': value,
            'title': value
        });
    },
    event: function(category, action, label, value) {
        console.log('track.event:', category, action, label, value);
        if (label) {
            console.log('track with label:', category, action, label, value);
            window.ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label,
                'eventValue': value
            });
        } else {
            console.log('track without label:', category, action);
            window.ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action
            });
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = track;
}
