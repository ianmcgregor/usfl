'use strict';

var modern = (function() {

    var ios5 = (function() {
        return !!(navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i));
    }());

    var androidOld = (function() {
        var ua = navigator.userAgent;
        return !!(ua.match(/Android/i) && parseFloat(ua.slice(ua.indexOf('Android') + 8)) < 4);
    }());

    var androidStock = (function() {
        var ua = navigator.userAgent;
        var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
        var resultAppleWebKitRegEx = regExAppleWebKit.exec(ua);
        var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(ua)[1]));
        var isAndroidBrowser = ua.match(/Android/i) && appleWebKitVersion !== null && appleWebKitVersion < 537;
        return isAndroidBrowser;
    }());

    var ie9Down = (function() {
        var div = document.createElement('div');
        div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
        return (div.getElementsByTagName('i').length === 1);
    }());

    var es5 = (function() {
        try {
            Object.defineProperty({}, 'x', {});
            Object.create({});
        } catch (e) {
            return false;
        }
        return true;
    }());

    var canvas = (function() {
        var el = document.createElement('canvas');
        return !!(el.getContext && el.getContext('2d'));
    }());

    var smallViewport = (function() {
        return Math.max( window.screen.width, window.screen.height, window.outerWidth, window.outerHeight ) <= 480;
    }());

    return !!(canvas && es5 && !(ios5 || androidOld || androidStock || ie9Down || smallViewport));

}());

if (window.Modernizr) {
    window.Modernizr.addTest('modern', function() {
        return modern;
    });
} else if (typeof module === 'object' && module.exports) {
    module.exports = modern;
}
