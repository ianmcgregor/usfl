'use strict';

var track = {
    init: function(gaAccount) {
        var url = document.location.hostname;
        console.log('Initialize Google Analytics with account Id:', gaAccount, 'on ', url);
        ga('create', gaAccount, url);
        ga('send', 'pageview');
    },
    page: function(value) {
        console.log('track.page:', value);
        ga('send', {
            'hitType': 'pageview',
            'page': value,
            'title': value
        });
    },
    event: function(category, action, label, value) {
        console.log('track.event:', category, action, label, value);
        if (label) {
            console.log('track with label:', category, action, label, value);
            ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label,
                'eventValue': value
            });
        } else {
            console.log('track without label:', category, action);
            ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action
            });
        }
    }
};
/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* jshint ignore:end */

if (typeof module === 'object' && module.exports) {
    module.exports = track;
}
